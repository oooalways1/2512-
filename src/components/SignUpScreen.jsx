import { useState } from 'react'
import { signUp } from '../lib/supabase'

function SignUpScreen({ onSuccess, onSwitchToLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('이름을 입력해주세요.')
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    try {
      // 사용자명을 기반으로 자동 이메일 생성 (Supabase는 이메일이 필요)
      // 이름을 기반으로 간단한 이메일 생성 (타임스탬프 없이)
      const cleanName = name.trim().replace(/\s+/g, '')
      const autoEmail = `${cleanName}@temp.local`
      
      try {
        await signUp(autoEmail, password, name)
        setError('')
        alert(`회원가입이 완료되었습니다!\n\n로그인 정보:\n이메일: ${autoEmail}\n비밀번호: 입력하신 비밀번호\n\n이 정보로 로그인하실 수 있습니다!`)
        onSuccess?.()
      } catch (err) {
        // 이메일이 이미 존재하는 경우, 타임스탬프 추가해서 재시도
        if (err.message && err.message.includes('already registered')) {
          const uniqueEmail = `${cleanName}_${Date.now()}@temp.local`
          await signUp(uniqueEmail, password, name)
          setError('')
          alert(`회원가입이 완료되었습니다!\n\n로그인 정보:\n이메일: ${uniqueEmail}\n비밀번호: 입력하신 비밀번호\n\n이 정보로 로그인하실 수 있습니다!`)
          onSuccess?.()
        } else {
          throw err
        }
      }
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-primary-blue mb-6 text-center">회원가입</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-pink text-lg"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-pink text-lg"
            placeholder="비밀번호를 입력하세요 (최소 6자)"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-pink text-lg"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-pink to-pink-500 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-primary-blue hover:text-primary-pink font-bold underline"
        >
          이미 계정이 있으신가요? 로그인하기
        </button>
      </div>
    </div>
  )
}

export default SignUpScreen

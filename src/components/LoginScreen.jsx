import { useState } from 'react'
import { signIn } from '../lib/supabase'

function LoginScreen({ onSuccess, onSwitchToSignUp }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 이름 또는 이메일로 입력 가능
      let email = name
      
      if (!name.includes('@')) {
        // 이름만 입력된 경우, 회원가입 시 생성된 이메일 형식으로 변환
        const cleanName = name.trim().replace(/\s+/g, '')
        email = `${cleanName}@temp.local`
      }
      
      await signIn(email, password)
      onSuccess?.()
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-primary-blue mb-6 text-center">로그인</h2>
      
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
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-pink text-lg"
            placeholder="비밀번호를 입력하세요"
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
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToSignUp}
          className="text-primary-blue hover:text-primary-pink font-bold underline"
        >
          회원가입하러 가기
        </button>
      </div>
    </div>
  )
}

export default LoginScreen

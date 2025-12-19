import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { signOut } from '../lib/supabase'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'

function MainScreen({ onStart, onAdmin }) {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('로그아웃 에러:', error)
    }
  }

  if (showLogin) {
    return (
      <LoginScreen
        onSuccess={() => setShowLogin(false)}
        onSwitchToSignUp={() => {
          setShowLogin(false)
          setShowSignUp(true)
        }}
      />
    )
  }

  if (showSignUp) {
    return (
      <SignUpScreen
        onSuccess={() => {
          setShowSignUp(false)
          setShowLogin(true)
        }}
        onSwitchToLogin={() => {
          setShowSignUp(false)
          setShowLogin(true)
        }}
      />
    )
  }

  return (
    <div className="text-center">
      {/* 로그인/로그아웃 버튼 */}
      <div className="flex justify-end mb-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-bold">
              안녕하세요, {user.user_metadata?.name || user.email}님! 👋
            </span>
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-bold transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-primary-blue hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
            >
              로그인
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-primary-pink hover:bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
            >
              회원가입
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        {/* 분수 캐릭터 */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            {/* 메인 분수 캐릭터 */}
            <div className="w-40 h-40 bg-gradient-to-br from-primary-pink to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <div className="text-5xl font-bold text-white">3/4</div>
            </div>
            {/* 작은 분수 친구들 */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
              <div className="text-xl font-bold text-white">1/2</div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md animate-pulse delay-300">
              <div className="text-xl font-bold text-white">2/3</div>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-primary-blue mb-4 drop-shadow-lg">
          바이브코딩으로 함께하는
        </h1>
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-pink mb-6 drop-shadow-lg">
          3학년 분수 마스터하기!
        </h1>
      </div>
      
      <p className="text-xl text-gray-600 mb-10">
        초등학교 3학년 분수 단원을 재미있게 배워봐요! 🎉
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <button
          onClick={() => {
            if (!user) {
              alert('게임을 시작하려면 먼저 로그인해주세요!')
              setShowLogin(true)
              return
            }
            onStart()
          }}
          className="bg-gradient-to-r from-primary-pink to-pink-500 text-white text-2xl font-bold px-12 py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-1"
        >
          게임 시작하기 🚀
        </button>
        <button
          onClick={onAdmin}
          className="bg-gradient-to-r from-primary-blue to-blue-500 text-white text-xl font-bold px-8 py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-1"
        >
          관리자 페이지 👨‍💼
        </button>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-gray-500 text-sm">made by 케이티조아</p>
      </div>
    </div>
  )
}

export default MainScreen


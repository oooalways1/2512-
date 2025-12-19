import { useEffect } from 'react'
import { saveLearningData } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

function ResultScreen({ gameData, onReview, onRestart }) {
  const { user } = useAuth()
  const totalScore = Math.round(gameData.classifyScore * 0.5 + gameData.compareScore * 0.5)

  useEffect(() => {
    // 게임 데이터를 Supabase에 저장
    const saveData = async () => {
      const studentName = user?.user_metadata?.name || user?.email?.split('@')[0] || '익명'
      
      const dataToSave = {
        studentName: studentName,
        classifyScore: Math.round(gameData.classifyScore),
        compareScore: Math.round(gameData.compareScore),
        totalScore: totalScore,
        classificationResponses: gameData.classificationResponses,
        comparisonResponses: gameData.comparisonResponses,
      }

      try {
        await saveLearningData(dataToSave)
      } catch (error) {
        console.error('데이터 저장 실패:', error)
        // 에러가 발생해도 게임 결과는 표시
      }
    }

    saveData()
  }, [user])

  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-primary-blue mb-8">
        🎉 탐험 완료! 🎉
      </h2>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 mb-8 shadow-lg">
        <div className="text-3xl font-bold text-primary-blue mb-4">총점: {totalScore}점</div>
        <div className="text-xl text-gray-600 space-y-2">
          <div>분류 게임: {Math.round(gameData.classifyScore)}점</div>
          <div>비교 게임: {Math.round(gameData.compareScore)}점</div>
        </div>
      </div>

      <p className="text-2xl text-gray-600 mb-10">
        분수 탐험을 멋지게 완료했어요! 👏
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={onReview}
          className="bg-gradient-to-r from-primary-blue to-blue-500 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-1"
        >
          응답 내용 확인하기 📝
        </button>
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-primary-pink to-pink-500 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-1"
        >
          다시 시작하기 🔄
        </button>
      </div>
    </div>
  )
}

export default ResultScreen


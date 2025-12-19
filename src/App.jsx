import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import MainScreen from './components/MainScreen'
import ClassifyScreen from './components/ClassifyScreen'
import CompareScreen from './components/CompareScreen'
import ResultScreen from './components/ResultScreen'
import ResponseReviewScreen from './components/ResponseReviewScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('main')
  const [gameData, setGameData] = useState({
    classifyScore: 0,
    compareScore: 0,
    classificationResponses: [],
    comparisonResponses: [],
  })

  const navigateTo = (screen) => {
    setCurrentScreen(screen)
  }

  const updateGameData = (data) => {
    setGameData(prev => ({ ...prev, ...data }))
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-pastel-pink to-pastel-blue flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-5xl w-full">
          {currentScreen === 'main' && (
            <MainScreen onStart={() => navigateTo('classify')} />
          )}
          {currentScreen === 'classify' && (
            <ClassifyScreen
              onComplete={(data) => {
                updateGameData(data)
                navigateTo('compare')
              }}
            />
          )}
          {currentScreen === 'compare' && (
            <CompareScreen
              onComplete={(data) => {
                updateGameData(data)
                navigateTo('result')
              }}
            />
          )}
          {currentScreen === 'result' && (
            <ResultScreen
              gameData={gameData}
              onReview={() => navigateTo('review')}
              onRestart={() => {
                setGameData({
                  classifyScore: 0,
                  compareScore: 0,
                  classificationResponses: [],
                  comparisonResponses: [],
                })
                navigateTo('main')
              }}
            />
          )}
          {currentScreen === 'review' && (
            <ResponseReviewScreen
              gameData={gameData}
              onBack={() => navigateTo('result')}
            />
          )}
        </div>
      </div>
    </AuthProvider>
  )
}

export default App


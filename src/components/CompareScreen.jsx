import { useState, useEffect } from 'react'

const compareQuestions = [
  {
    id: 1,
    frac1: { num: 3, den: 5, display: '3/5' },
    frac2: { num: 4, den: 5, display: '4/5' },
    answer: '<',
    explanation: '분모가 같을 때 분자가 큰 분수가 더 커요.',
  },
  {
    id: 2,
    frac1: { num: 1, den: 3, display: '1/3' },
    frac2: { num: 1, den: 5, display: '1/5' },
    answer: '>',
    explanation: '분자가 같을 때 분모가 작은 분수가 더 커요. 단위분수는 분모가 커질수록 작아져요.',
  },
  {
    id: 3,
    frac1: { num: 2, den: 7, display: '2/7' },
    frac2: { num: 2, den: 7, display: '2/7' },
    answer: '=',
    explanation: '분자와 분모가 모두 같으면 두 분수는 같아요.',
  },
]

function CompareScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [explanation, setExplanation] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [responses, setResponses] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const question = compareQuestions[currentQuestion]

  const checkKeywords = (text) => {
    const keywords = ['분자', '분모', '조각', '단위분수', '크기', '작다', '크다', '같다', '큰', '작은']
    return keywords.some(keyword => text.includes(keyword))
  }

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert('먼저 크기 비교를 선택해주세요!')
      return
    }

    const isCorrect = selectedAnswer === question.answer
    const hasKeywords = checkKeywords(explanation)
    const score = isCorrect ? (hasKeywords ? 10 : 8) : 0

    const response = {
      questionId: question.id,
      frac1: question.frac1.display,
      frac2: question.frac2.display,
      userAnswer: selectedAnswer,
      correctAnswer: question.answer,
      isCorrect,
      explanation: explanation,
      hasKeywords,
      score,
    }

    setResponses([...responses, response])

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: hasKeywords
          ? '🎉 정답이에요! 멋진 설명이에요! 키워드를 잘 사용했어요!'
          : '🎉 정답이에요! 멋진 설명이에요!',
      })
    } else {
      setFeedback({
        type: 'partial',
        message: `아쉽네요. 정답은 '${question.answer === '<' ? '<' : question.answer === '>' ? '>' : '='}'입니다. ${question.explanation}`,
      })
    }

    setIsSubmitted(true)

    setTimeout(() => {
      if (currentQuestion < compareQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setExplanation('')
        setFeedback(null)
        setIsSubmitted(false)
      } else {
        const totalScore = responses.reduce((sum, r) => sum + r.score, 0) + score
        onComplete({
          compareScore: totalScore,
          comparisonResponses: [...responses, response],
        })
      }
    }, 3000)
  }

  const createVisual = (fraction) => {
    const { num, den } = fraction
    return (
      <div className="flex gap-2">
        {Array.from({ length: den }).map((_, i) => {
          const isFilled = i < num
          const angle = (360 / den) * i
          return (
            <div
              key={i}
              className="w-16 h-16 rounded-full border-4 border-gray-800 flex items-center justify-center font-bold text-sm"
              style={{
                background: isFilled
                  ? `conic-gradient(from ${angle}deg, #ff6b9d 0deg ${360 / den}deg, #e0e0e0 ${360 / den}deg 360deg)`
                  : '#f5f5f5',
              }}
            >
              {isFilled ? '✓' : ''}
            </div>
          )
        })}
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / compareQuestions.length) * 100

  return (
    <div>
      <h2 className="text-4xl font-bold text-primary-blue mb-6 text-center">
        2단계: 분수 크기 비교하기
      </h2>
      <p className="text-xl text-gray-600 mb-6 text-center">
        두 분수의 크기를 비교해주세요!
      </p>

      {/* 진행률 바 */}
      <div className="w-full h-8 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-blue to-blue-500 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 분수 비교 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-bold text-primary-blue px-10 py-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg">
            {question.frac1.display}
          </div>
          {createVisual(question.frac1)}
        </div>

        <div className="flex gap-4">
          {['<', '=', '>'].map((op) => (
            <button
              key={op}
              onClick={() => !isSubmitted && setSelectedAnswer(op)}
              disabled={isSubmitted}
              className={`text-4xl font-bold px-8 py-6 rounded-2xl border-4 transition-all duration-200 ${
                selectedAnswer === op
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-600 scale-110 shadow-xl'
                  : 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400 hover:scale-105 shadow-md'
              } ${isSubmitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {op}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-bold text-primary-blue px-10 py-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg">
            {question.frac2.display}
          </div>
          {createVisual(question.frac2)}
        </div>
      </div>

      {/* 서술형 설명 */}
      <div className="mb-6">
        <label className="block text-2xl font-bold text-primary-blue mb-3">
          💭 왜 그렇게 생각하나요? (자신의 생각을 적어주세요)
        </label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          disabled={isSubmitted}
          placeholder="예: 분모가 같을 때는 분자가 큰 분수가 더 커요. 또는 분자가 같을 때는 분모가 작은 분수가 더 커요."
          className="w-full min-h-[150px] p-5 text-lg border-4 border-yellow-400 rounded-2xl resize-y focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:opacity-50"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitted}
          className={`bg-gradient-to-r from-primary-pink to-pink-500 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg transition-all duration-200 ${
            isSubmitted
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-xl hover:scale-105 hover:-translate-y-1'
          }`}
        >
          답변 제출하기
        </button>
      </div>

      {/* 피드백 */}
      {feedback && (
        <div
          className={`mt-6 p-5 rounded-2xl text-xl font-bold text-center animate-pop-in ${
            feedback.type === 'success'
              ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-4 border-green-500'
              : 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800 border-4 border-yellow-500'
          }`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  )
}

export default CompareScreen


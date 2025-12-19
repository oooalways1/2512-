function ResponseReviewScreen({ gameData, onBack }) {
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary-blue mb-8 text-center">
        📝 응답 내용 확인
      </h2>

      {/* 분류 게임 응답 */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">1단계: 분수 분류하기</h3>
        <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
          {gameData.classificationResponses?.map((response, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-4 ${
                response.correct
                  ? 'bg-green-50 border-green-400'
                  : 'bg-red-50 border-red-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{response.fraction}</span>
                <span className={`text-lg font-bold ${response.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {response.correct ? '✓ 정답' : '✗ 오답'}
                </span>
              </div>
              {!response.correct && (
                <div className="mt-2 text-gray-600">
                  정답: {response.type === 'proper' ? '진분수' : response.type === 'improper' ? '가분수' : '대분수'}
                  {response.userAnswer && ` / 입력한 답: ${response.userAnswer === 'proper' ? '진분수' : response.userAnswer === 'improper' ? '가분수' : response.userAnswer === 'mixed' ? '대분수' : response.userAnswer}`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 비교 게임 응답 */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">2단계: 분수 크기 비교하기</h3>
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
          {gameData.comparisonResponses?.map((response, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-4 ${
                response.isCorrect
                  ? 'bg-green-50 border-green-400'
                  : 'bg-red-50 border-red-400'
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">
                    {response.frac1} ? {response.frac2}
                  </span>
                  <span className={`text-lg font-bold ${response.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {response.isCorrect ? '✓ 정답' : '✗ 오답'}
                  </span>
                </div>
                <div className="text-lg text-gray-700">
                  입력한 답: <span className="font-bold">{response.userAnswer}</span> / 
                  정답: <span className="font-bold">{response.correctAnswer}</span>
                </div>
                {response.hasKeywords && (
                  <div className="text-sm text-green-600 font-bold mt-1">
                    ✓ 키워드를 잘 사용했어요!
                  </div>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <div className="text-sm text-gray-600 mb-1">서술형 답변:</div>
                <div className="text-lg">{response.explanation || '(답변 없음)'}</div>
              </div>
              <div className="mt-2 text-right text-gray-600">
                점수: {response.score}점
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 요약 정보 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-blue">
              {gameData.classificationResponses?.filter(r => r.correct).length || 0}
            </div>
            <div className="text-gray-600">분류 정답 수</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-pink">
              {gameData.comparisonResponses?.filter(r => r.isCorrect).length || 0}
            </div>
            <div className="text-gray-600">비교 정답 수</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {gameData.comparisonResponses?.filter(r => r.hasKeywords).length || 0}
            </div>
            <div className="text-gray-600">키워드 사용 횟수</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-primary-blue to-blue-500 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-1"
        >
          돌아가기 ←
        </button>
      </div>
    </div>
  )
}

export default ResponseReviewScreen


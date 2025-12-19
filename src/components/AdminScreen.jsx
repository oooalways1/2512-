import { useState, useEffect } from 'react'
import { getLearningData } from '../lib/supabase'

function AdminScreen({ onBack }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await getLearningData()
      setRecords(data || [])
    } catch (error) {
      console.error('데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-2xl text-gray-600">데이터를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-primary-blue">관리자 페이지</h2>
        <div className="flex gap-4">
          <button
            onClick={loadData}
            className="bg-primary-blue hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
          >
            새로고침
          </button>
          <button
            onClick={onBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-bold transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-2xl text-gray-600">아직 저장된 기록이 없습니다.</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="text-lg font-bold text-gray-700">
              총 {records.length}개의 학습 기록
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary-blue to-blue-500 text-white">
                  <th className="px-4 py-3 text-left border border-gray-300">번호</th>
                  <th className="px-4 py-3 text-left border border-gray-300">학생 이름</th>
                  <th className="px-4 py-3 text-left border border-gray-300">분류 점수</th>
                  <th className="px-4 py-3 text-left border border-gray-300">비교 점수</th>
                  <th className="px-4 py-3 text-left border border-gray-300">총점</th>
                  <th className="px-4 py-3 text-left border border-gray-300">날짜</th>
                  <th className="px-4 py-3 text-left border border-gray-300">상세보기</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 border border-gray-300">{index + 1}</td>
                    <td className="px-4 py-3 border border-gray-300 font-bold">
                      {record.student_name || '익명'}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {Math.round(record.classify_score || 0)}점
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {Math.round(record.compare_score || 0)}점
                    </td>
                    <td className="px-4 py-3 border border-gray-300 font-bold text-primary-blue">
                      {Math.round(record.total_score || 0)}점
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-sm">
                      {formatDate(record.created_at)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="bg-primary-pink hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 상세보기 모달 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-primary-blue">
                상세 응답 내용 - {selectedRecord.student_name || '익명'}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* 점수 정보 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4">점수 정보</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-gray-600">분류 점수</div>
                    <div className="text-2xl font-bold">{Math.round(selectedRecord.classify_score || 0)}점</div>
                  </div>
                  <div>
                    <div className="text-gray-600">비교 점수</div>
                    <div className="text-2xl font-bold">{Math.round(selectedRecord.compare_score || 0)}점</div>
                  </div>
                  <div>
                    <div className="text-gray-600">총점</div>
                    <div className="text-2xl font-bold text-primary-blue">
                      {Math.round(selectedRecord.total_score || 0)}점
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-gray-600">
                  날짜: {formatDate(selectedRecord.created_at)}
                </div>
              </div>

              {/* 분류 게임 응답 */}
              {selectedRecord.classification_responses && (
                <div>
                  <h4 className="text-xl font-bold mb-4">1단계: 분수 분류하기</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    {Array.isArray(selectedRecord.classification_responses) &&
                      selectedRecord.classification_responses.map((response, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 ${
                            response.correct
                              ? 'bg-green-50 border-green-400'
                              : 'bg-red-50 border-red-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold">{response.fraction}</span>
                            <span className={response.correct ? 'text-green-600' : 'text-red-600'}>
                              {response.correct ? '✓ 정답' : '✗ 오답'}
                            </span>
                          </div>
                          {!response.correct && response.userAnswer && (
                            <div className="text-sm text-gray-600 mt-1">
                              입력한 답: {response.userAnswer}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 비교 게임 응답 */}
              {selectedRecord.comparison_responses && (
                <div>
                  <h4 className="text-xl font-bold mb-4">2단계: 분수 크기 비교하기</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                    {Array.isArray(selectedRecord.comparison_responses) &&
                      selectedRecord.comparison_responses.map((response, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 ${
                            response.isCorrect
                              ? 'bg-green-50 border-green-400'
                              : 'bg-red-50 border-red-400'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold">
                              {response.frac1} {response.userAnswer} {response.frac2}
                            </span>
                            <span className={response.isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {response.isCorrect ? '✓ 정답' : '✗ 오답'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            정답: {response.correctAnswer} / 입력: {response.userAnswer} / 점수: {response.score}점
                          </div>
                          {response.explanation && (
                            <div className="bg-white p-3 rounded-lg mt-2">
                              <div className="text-sm text-gray-600 mb-1">서술형 답변:</div>
                              <div>{response.explanation}</div>
                              {response.hasKeywords && (
                                <div className="text-sm text-green-600 font-bold mt-1">
                                  ✓ 키워드 사용됨
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminScreen

import { useState, useEffect } from 'react'

const classifyFractions = [
  { value: '1/3', type: 'proper', display: '1/3' },
  { value: '5/4', type: 'improper', display: '5/4' },
  { value: '2/5', type: 'proper', display: '2/5' },
  { value: '1 2/3', type: 'mixed', display: '1과 2/3' },
  { value: '3/3', type: 'improper', display: '3/3' },
  { value: '1/7', type: 'proper', display: '1/7' },
  { value: '2 1/4', type: 'mixed', display: '2과 1/4' },
  { value: '7/6', type: 'improper', display: '7/6' },
  { value: '4/9', type: 'proper', display: '4/9' },
]

function ClassifyScreen({ onComplete }) {
  const [fractions, setFractions] = useState([...classifyFractions])
  const [zones, setZones] = useState({
    proper: [],
    improper: [],
    mixed: [],
  })
  const [draggedItem, setDraggedItem] = useState(null)

  useEffect(() => {
    const totalDropped = zones.proper.length + zones.improper.length + zones.mixed.length
    if (totalDropped === classifyFractions.length) {
      calculateScore()
    }
  }, [zones])

  const calculateScore = () => {
    let correct = 0
    const responses = []

    classifyFractions.forEach((frac) => {
      const foundInZone = Object.entries(zones).find(([_, items]) =>
        items.some(item => item.value === frac.value)
      )
      
      if (foundInZone && foundInZone[0] === frac.type) {
        correct++
        responses.push({ fraction: frac.display, correct: true, type: frac.type })
      } else {
        responses.push({ 
          fraction: frac.display, 
          correct: false, 
          type: frac.type,
          userAnswer: foundInZone ? foundInZone[0] : '미분류'
        })
      }
    })

    const score = (correct / classifyFractions.length) * 100

    setTimeout(() => {
      onComplete({
        classifyScore: score,
        classificationResponses: responses,
      })
    }, 1000)
  }

  const handleDragStart = (e, fraction) => {
    setDraggedItem(fraction)
    e.dataTransfer.effectAllowed = 'move'
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50')
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    e.currentTarget.classList.add('scale-105', 'bg-green-200')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('scale-105', 'bg-green-200')
  }

  const handleDrop = (e, zoneType) => {
    e.preventDefault()
    e.currentTarget.classList.remove('scale-105', 'bg-green-200')

    if (!draggedItem) return

    // 이미 다른 존에 있는지 확인
    const isAlreadyPlaced = Object.values(zones).some(zoneItems =>
      zoneItems.some(item => item.value === draggedItem.value)
    )

    if (isAlreadyPlaced) return

    setZones(prev => ({
      ...prev,
      [zoneType]: [...prev[zoneType], draggedItem],
    }))

    setFractions(prev => prev.filter(f => f.value !== draggedItem.value))
    setDraggedItem(null)
  }

  const progress = ((zones.proper.length + zones.improper.length + zones.mixed.length) / classifyFractions.length) * 100

  return (
    <div>
      <h2 className="text-4xl font-bold text-primary-blue mb-6 text-center">
        1단계: 분수 분류하기
      </h2>
      <p className="text-xl text-gray-600 mb-6 text-center">
        아래 분수들을 드래그해서 알맞은 주머니에 넣어주세요!
      </p>

      {/* 진행률 바 */}
      <div className="w-full h-8 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-pink to-pink-500 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 분수 카드들 */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {fractions.map((frac, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, frac)}
            onDragEnd={handleDragEnd}
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 px-8 py-4 rounded-2xl text-3xl font-bold text-gray-800 cursor-grab active:cursor-grabbing shadow-md hover:scale-105 transition-transform border-4 border-yellow-400"
          >
            {frac.display}
          </div>
        ))}
      </div>

      {/* 드롭 존들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { type: 'proper', title: '진분수', desc: '(분자 < 분모)', color: 'from-green-100 to-green-200', border: 'border-green-500' },
          { type: 'improper', title: '가분수', desc: '(분자 ≥ 분모)', color: 'from-blue-100 to-blue-200', border: 'border-blue-500' },
          { type: 'mixed', title: '대분수', desc: '(자연수 + 진분수)', color: 'from-purple-100 to-purple-200', border: 'border-purple-500' },
        ].map((zone) => (
          <div
            key={zone.type}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, zone.type)}
            className={`bg-gradient-to-br ${zone.color} border-4 ${zone.border} border-dashed rounded-3xl p-6 min-h-[200px] transition-all duration-200`}
          >
            <div className="text-2xl font-bold mb-2 text-center">{zone.title}</div>
            <div className="text-sm text-gray-600 mb-4 text-center">{zone.desc}</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {zones[zone.type].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white px-4 py-2 rounded-xl text-2xl font-bold shadow-md"
                >
                  {item.display}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassifyScreen


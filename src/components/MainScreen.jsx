function MainScreen({ onStart }) {
  return (
    <div className="text-center">
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
      
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-primary-pink to-pink-500 text-white text-2xl font-bold px-12 py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-1"
      >
        게임 시작하기 🚀
      </button>
    </div>
  )
}

export default MainScreen


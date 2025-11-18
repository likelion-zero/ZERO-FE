
const Album = ({title, genre}) => {

  return(
    <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center">
      <div className="w-75 h-90 rounded-3xl flex flex-col p-4 bg-[#3b3b3b]/80 backdrop-blur-xs">
        <div className="relative flex-1 bg-[#d9d9d9] rounded-xl p-3">

          <div className="relative mt-2  text-4xl font-normal">
            apple
          </div>
  
          {/* banana - 좌측 중앙, 큰 텍스트 */}
          <div className="relative mt-2  text-5xl font-bold">
            banana
          </div>
          
          {/* orange - 좌측, banana 아래 */}
          <div className="relative mt-2  text-2xl font-normal">
            orange
          </div>
          
          {/* pineapple - 우측 세로 텍스트 */}
          <div className="absolute top-8 right-8 text-4xl font-bold -rotate-180 [writing-mode:vertical-lr]">
            pineapple
          </div>
          
          {/* cherry - 우측 하단 큰 텍스트 */}
          <div className="absolute bottom-3 right-8 text-3xl font-bold">
            cherry
          </div>
          
          {/* 작은 텍스트들 - 하단 좌측 */}
          <div className="absolute bottom-12 mb-1 flex gap-2 text-base">
            <span>grape</span>
            <span>kiwi</span>
            <span>lemon</span>
          </div>
          
          {/* strawberry - 하단 좌측 */}
          <div className="absolute bottom-2 text-base">
            strawberry
          </div>
        </div>
        <p className="text-white font-inter text-base mt-2">{title}</p>
        <p className="text-white font-inter text-xs">{genre}</p>

      </div>
    </div>
  );
};

export default Album;
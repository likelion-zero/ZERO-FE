import AlbumStack from "@/features/MusicChart/components/AlbumStack";
import Footer from "@/shared/components/Footer/Footer";
import ReloadIcon from "@/shared/components/icons/Reload.svg"
const ChartPage = () => {
  return (
    <div className=" h-screen flex flex-col bg-[#111111]">
      {/* 헤더 영역 - 고정 높이 */}
      <header className="flex-shrink-0 h-28">
        <div className="pt-16 flex gap-22 justify-center items-center">
          <p className="ml-7 font-medium text-4xl text-white">Music Chart</p>
          <button className="mr-8">
            <img src={ReloadIcon} alt="새로고침" />
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 - 남은 공간 모두 차지 */}
      <main className="flex-1 flex items-center justify-center pb-38">
        <AlbumStack />
      </main>

      {/* 푸터 - 고정 높이 */}
      <Footer className="shrink-0"/>
    </div>
  );
}

export default ChartPage;
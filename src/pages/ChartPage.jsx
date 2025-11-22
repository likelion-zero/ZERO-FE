import AlbumStack from "@/features/MusicChart/components/AlbumStack";
import Footer from "@/shared/components/Footer/Footer";
import Reload from "@/shared/components/icons/Reload"
import { useEffect, useState } from "react";
import { get } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

const ChartPage = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 'jena';

  const fetchChart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await get(ENDPOINTS.GET_CHART(userId));
      setSongs(data.songs || []);
    } catch (error) {
      console.error("차트 데이터를 불러오는데 실패했습니다.", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchChart();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-white text-sm">
          Loading chart...
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-full items-center justify-center text-red-400 text-sm">
          {error}
        </div>
      );
    }

    if (songs.length === 0) {
      return (
        <div className="flex h-full items-center justify-center text-gray-400 text-sm">
          No songs available.
        </div>
      );
    }

    return <AlbumStack songs={songs} />;
  };

  return (
    <div className=" h-screen flex flex-col bg-[#111111]">
      <header className="shrink-0 h-28">
        <div className="pt-16 flex gap-22 justify-center items-center">
          <p className="ml-7 font-medium text-4xl text-white">Music Chart</p>
          <button className="mr-8" onClick={fetchChart}>
            <Reload />
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 - 남은 공간 모두 차지 */}
      <main className="flex-1 flex items-center justify-center pb-38">
        {renderContent()}
      </main>

      {/* 푸터 - 고정 높이 */}
      <Footer className="shrink-0"/>
    </div>
  );
}

export default ChartPage;
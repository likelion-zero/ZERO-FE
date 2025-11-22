import { deleteSong, getPlaylist } from "@/features/Playlist/api";
import MusicCard from "@/features/Playlist/components/MusicCard"
import Footer from "@/shared/components/Footer/Footer";
import { useEffect, useState } from "react";

// 언어 옵션 정의
const LANGUAGES = [
  { value: "english", label: "ENG" },
  { value: "chinese", label: "中國語" },
  { value: "japanese", label: "日本語" },
];

const PlayListPage = () => {
  const [allSongs, setAllSongs] = useState([]);   // 원본 데이터
  const [songs, setSongs] = useState([]);          // 필터된 데이터
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [languageIndex, setLanguageIndex] = useState(0);  // 현재 언어 인덱스

  const userId = 'jena';

  useEffect(() => {
    const fetchPlaylist = async () => {
      try{
        setIsLoading(true);
        const data = await getPlaylist(userId);
        setAllSongs(data.songs);
        // 초기 필터 적용 (첫번째 언어로)
        const initialFiltered = data.songs.filter(
          song => song.language.value === LANGUAGES[0].value
        );
        setSongs(initialFiltered);
        setError(null);
      } catch(error){
        setError(error.message);
      } finally{
        setIsLoading(false);
      }
    };

    fetchPlaylist();

  }, [userId]);

  const handleDelete = async (songId) => {
    try{
      // 원본과 필터된 데이터 모두에서 삭제
      setAllSongs(prev => prev.filter(song => song.song_id !== songId));
      setSongs(prev => prev.filter(song => song.song_id !== songId));

      await deleteSong(userId, songId);
    }catch(error){
      alert('삭제에 실패했습니다.', error.message);
      const data = await getPlaylist(userId);
      setAllSongs(data.songs);
      setSongs(data.songs.filter(
        song => song.language.value === LANGUAGES[languageIndex].value
      ));
    }
  }

  // 언어 순환 + 필터링
  const handleLanguageToggle = () => {
    const nextIndex = (languageIndex + 1) % LANGUAGES.length;
    setLanguageIndex(nextIndex);

    const selectedLanguage = LANGUAGES[nextIndex].value;
    setSongs(allSongs.filter(song => song.language.value === selectedLanguage));
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-white text-sm">
          Loading playlist...
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
          No songs available for the selected language.
        </div>
      );
    }

    return (
      <div className="flex-1 divide-y divide-white/10 overflow-y-auto">
        {songs.map((song) => (
          <MusicCard 
            key={song.song_id}
            songId={song.song_id}
            title={song.title}
            language={song.language}
            genre={song.genre}
            mood={song.mood}
            runtime={song.runtime}
            createdBy={song.create_by}
            isFromChart={song.is_from_chart}
            historyCount={song.history_count}
            imageWords={song.image_words}
            onDelete={() => handleDelete(song.song_id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#111] w-full h-screen flex flex-col">
      <header className="shrink-0 h-50">
        <div className="pt-16 flex gap-22 justify-between items-center">
          <p className="ml-7 font-medium text-4xl text-white">PlayList</p>
          <button
            className="py-2 px-5 bg-orange-100 rounded-3xl text-2xl text-white mr-8"
            onClick={handleLanguageToggle}
          >
            * {LANGUAGES[languageIndex].label}
          </button>
        </div>
        <div className="mt-5 text-orange-100 w-full flex items-center justify-end pr-7 border-b border-white">
          <span className="text-xl">
            Total 
            <span className="pl-4 text-xl">{500} </span>
            <span className="text-xs">Words</span>
          </span>
        </div>
      </header>

      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default PlayListPage;

import { deleteSong, getPlaylist } from "@/features/Playlist/api";
import MusicCard from "@/features/Playlist/components/MusicCard"
import Footer from "@/shared/components/Footer/Footer";
import { useEffect, useState } from "react";

const PlayListPage = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 'jena';

  useEffect(() => {
    const fetchPlaylist = async () => {
      try{
        setIsLoading(true);
        const data = await getPlaylist(userId);
        setSongs(data.songs);
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
      setSongs(prev => prev.filter(song => song.songId !== songId));

      await deleteSong(userId, songId);
    }catch(error){
      alert('삭제에 실패했습니다.', error.message);
      const data = await getPlaylist(userId);
      setSongs(data.songs);
    }
  }

  return (
    <div className="bg-[#111] w-full h-screen flex flex-col">
      <header className="shrink-0 h-50">
        <div className="pt-16 flex gap-22 justify-between items-center">
          <p className="ml-7 font-medium text-4xl text-white">PlayList</p>
          <button className="text-white mr-8">
            Eng
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
      
      {songs.map((song) => {
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
      })}
      
      <Footer />
    </div>
  );
}

export default PlayListPage;
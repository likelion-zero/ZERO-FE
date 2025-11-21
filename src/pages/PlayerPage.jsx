import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ControlBar from '@/features/Playercontrol/components/ControlBar';
import Lyrics from '@/features/Lyrics/components/Lyrics';
import TIcon from '@/shared/components/icons/T';          
import TFullIcon from '@/shared/components/icons/T_full'; 

import { get } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

const PlayerPage = () => {
    const navigate = useNavigate();
    const { songId } = useParams(); 

    const [isLyricsMode, setIsLyricsMode] = useState(false);
    const [songData, setSongData] = useState(null); 

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientY);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY);
    const handleTouchEnd = () => {
        if (touchStart - touchEnd < -100) navigate(-1);
    };

    useEffect(() => {
        if (!songId) return; 

        const loadData = async () => {
            try {
                const data = await get(ENDPOINTS.GET_SONG_INFO(songId));
                const parsedLyrics = data.lyrics ? data.lyrics.split('\n') : ["가사 정보가 없습니다."];

                setSongData({
                    ...data,
                    lyricsArray: parsedLyrics 
                });

            } catch (error) {
                console.error("곡 정보를 불러오는데 실패했습니다.", error);
                navigate(-1); 
            } 
        };

        loadData();
    }, [songId, navigate]);
    
    if (!songData) {
        return null;
    }

    return (
        <div 
            className="min-h-screen bg-[#F2F4F6] flex flex-col items-center relative font-inter overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full pt-4 pb-2 flex justify-center z-50">
                <div className="w-10 h-1.5 bg-[#D9D9D9] rounded-full" />
            </div>

            <div className="w-full max-w-[390px] flex-1 flex flex-col px-6 pb-10 transition-all duration-500">
                
                {!isLyricsMode ? (
                    <div className="flex-1 flex flex-col justify-center items-center gap-8 animate-fade-in">
                        <div className="w-[320px] h-[320px] bg-white rounded-[20px] shadow-lg flex items-center justify-center text-gray-300 text-xl">
                            Album Art
                        </div>

                        <div className="w-full flex items-center justify-between px-2 relative z-10">
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-[#262626]">{songData.title}</h2>
                                <p className="text-sm text-[#757575] mt-1">{songData.genre} | {songData.mood}</p>
                            </div>
                            
                            <button 
                                onClick={() => setIsLyricsMode(true)}
                                className="hover:opacity-80 transition-opacity p-1"
                            >
                                <img src={TIcon} alt="Lyrics Mode Off" className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col pt-4 gap-6 animate-fade-in">
                        <div className="flex items-center justify-between w-full relative z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-[10px] shadow-sm flex items-center justify-center text-xs text-gray-300">
                                    Album
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-[#262626]">{songData.title}</h2>
                                    <p className="text-xs text-[#757575] mt-1">{songData.genre} | {songData.mood}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsLyricsMode(false)}
                                className="hover:opacity-80 transition-opacity p-1 cursor-pointer"
                            >
                                <img src={TFullIcon} alt="Lyrics Mode On" className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative z-10">
                            <Lyrics lyrics={songData.lyricsArray} />
                        </div>
                    </div>
                )}

                <div className="mt-auto pt-6 w-full relative z-30">
                    <ControlBar 
                        audioUrl={songData.audio_url} 
                        runtime={songData.runtime}
                        onPrev={() => console.log("Prev")}
                        onNext={() => console.log("Next")}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;
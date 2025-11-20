import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ControlBar from '@/features/Playercontrol/components/ControlBar';
import Lyrics from '@/features/Lyrics/components/Lyrics';
import TIcon from '@/assets/T.svg';        
import TFullIcon from '@/assets/T_full.svg'; 

const PlayerPage = () => {
    const navigate = useNavigate();
    const [isLyricsMode, setIsLyricsMode] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd < -100) {
            navigate(-1);
        }
    };

    // 더미 데이터
    const DUMMY_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    const DUMMY_RUNTIME = 372;
    const DUMMY_LYRICS = [
        "grape kiwi lemon", "strawberry cherry", "apple은 사과", "banana는 바나나",
        "동글동글 orange", "포포도 포도 grape", "kiwi kiwi 키위 yeah",
        "너무 셔 lemon 레몬", "수박은 watermelon", "참외는 oriental melon",
        "망고는 mango", "맛있는 과일들", "끝입니다 end"
    ];

    return (
        <div className="min-h-screen bg-[#F1F2F1] flex flex-col items-center relative font-inter overflow-hidden">
            <div 
                className="w-full pt-25 pb-1 flex justify-center cursor-grab active:cursor-grabbing z-50"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="w-13 h-1.5 bg-[#D9D9D9] rounded-full" />
            </div>

            <div className="w-full max-w-[390px] flex-1 flex flex-col px-5 pb-15 transition-all duration-500">
                
                {!isLyricsMode ? (
                    <div className="flex-1 flex flex-col justify-center items-center gap-10 animate-fade-in">
                        <div className="w-[351px] h-[351px] bg-white rounded-[12px] flex items-center justify-center text-gray-300 text-xl">
                            Album Art
                        </div>
                        <div className="w-full flex items-center justify-between px-2">

                            <div className="text-left">
                                <h2 className="text-[25px] font-regular text-black">fruits song</h2>
                                <p className="text-[12px] font-regular text-black mt-1">동요 | 신나는</p>
                            </div>
                        
                            <button onClick={() => setIsLyricsMode(true)}>
                                <img src={TIcon} alt="LyricsOff" className="w-10 h-10" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col pt-4 gap-3 animate-fade-in">
                        <div className="flex items-center justify-between w-full relative z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-white rounded-[12px] shadow-sm flex items-center justify-center text-xs text-gray-300">
                                    Album
                                </div>
                                <div className="text-left">
                                    <h2 className="text-[25px] font-regular text-black">fruits song</h2>
                                    <p className="text-[12px] font-regular text-black mt-1">동요 | 신나는</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    setIsLyricsMode(false);
                                }}
                            >
                                <img src={TFullIcon} alt="LyricsOn" className="w-10 h-10" />
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <Lyrics lyrics={DUMMY_LYRICS} />
                        </div>
                    </div>
                )}
                <div className="mt-auto pt-1 w-full">
                    <ControlBar 
                        audioUrl={DUMMY_AUDIO_URL} 
                        runtime={DUMMY_RUNTIME}
                        onPrev={() => console.log("Prev")}
                        onNext={() => console.log("Next")}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;
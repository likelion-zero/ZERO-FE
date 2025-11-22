// src/features/PlayerControl/components/ControlBar.jsx
import React, { useState, useRef } from 'react'; // useEffect 삭제

import PrevIcon from '@/shared/components/icons/prev.svg';
import NextIcon from '@/shared/components/icons/next.svg';
import PlayIcon from '@/shared/components/icons/play.svg';
import PauseIcon from '@/shared/components/icons/stop.svg'; 
import SoundLowIcon from '@/shared/components/icons/soundlow.svg';
import SoundHighIcon from '@/shared/components/icons/soundhigh.svg';

const ControlBar = ({ audioUrl, runtime }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(runtime || 0);
    const [volume, setVolume] = useState(50);

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRewind = () => {
        if (audioRef.current) {
            const newTime = Math.max(audioRef.current.currentTime - 5, 0);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            const maxDuration = duration || audioRef.current.duration || 0;
            const newTime = Math.min(audioRef.current.currentTime + 5, maxDuration);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = Number(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "00:00";
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m} : ${s}`;
    };

    return (
        <div className='w-full max-w-[351px] bg-transparent mx-auto p-4 flex flex-col gap-6'>
            <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            <div className='w-full flex flex-col gap-2'>
                <input 
                    type="range" 
                    min="0" 
                    max={duration} 
                    value={currentTime} 
                    onChange={handleProgressChange}
                    className="w-full h-1.5 bg-[#D9D9D9] rounded-full appearance-none cursor-pointer accent-[#EF521F]"
                    style={{
                        background: `linear-gradient(to right, #EF521F ${(currentTime / duration) * 100}%, #D9D9D9 ${(currentTime / duration) * 100}%)`
                    }}
                />
                <div className='flex justify-between text-[12px] font-regular text-black font-inter'>
                    <span>{formatTime(currentTime)}</span>
                    <span>- {formatTime(duration - currentTime)}</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-15">
                <button onClick={handleRewind} className="hover:opacity-70 transition-opacity active:scale-95">
                    <img src={PrevIcon} alt="-5s" className="w-9 h-9" />
                </button>

                <button onClick={togglePlay} className="hover:scale-105 transition-transform">
                    <img 
                        src={isPlaying ? PauseIcon : PlayIcon} 
                        alt={isPlaying ? "Pause" : "Play"} 
                        className="w-9 h-9" 
                    />
                </button>

                <button onClick={handleForward} className="hover:opacity-70 transition-opacity active:scale-95">
                    <img src={NextIcon} alt="+5s" className="w-9 h-9" />
                </button>
            </div>

            <div className="flex items-center justify-between gap-3 px-2">
                <button onClick={() => { setVolume(0); audioRef.current.volume = 0; }}>
                    <img src={SoundLowIcon} alt="Volume Low" className="w-5 h-5" />
                </button>
                
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="flex-grow h-1.5 bg-[#D9D9D9] rounded-full appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #111111 ${volume}%, #D9D9D9 ${volume}%)`
                    }}
                />

                <button onClick={() => { setVolume(100); audioRef.current.volume = 1; }}>
                    <img src={SoundHighIcon} alt="Volume High" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ControlBar;
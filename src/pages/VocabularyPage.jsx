import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import InputDone from "@/features/Input/components/InputDone";
import InputIng from "@/features/Input/components/InputIng";
import WordInput from "@/features/Input/components/WordInput";
import Footer from "@/shared/components/Footer/Footer";

import { post } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

const GENRE_MAP = {
    '클래식': 'classical',
    '재즈': 'jazz',
    '발라드': 'ballad',
    '팝': 'pop',
    '힙합': 'hiphop',
    '댄스': 'dance',
    '록': 'rock'
};

const MOOD_MAP = {
    '신나는': 'exciting',
    '슬픈': 'sad',
    '재밌는': 'fun',
    '편안한': 'calm',
    '박진감 넘치는': 'dynamic',
    '잔잔한': 'gentle'
};

const LANGUAGE_MAP = {
    'English': 'english',
    '中國語': 'chinese',
    '日本語': 'japanese'
};

const VocabularyPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [language, setLanguage] = useState("English");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedMood, setSelectedMood] = useState("");

    const [words, setWords] = useState(Array(10).fill(""));
    const [isScrolled, setIsScrolled] = useState(false);
    
    const isFormComplete = name.trim() !== "" && selectedGenre !== "" && selectedMood !== "";
    const hasValidWords = words.some(word => word.trim() !== "");

    const SCROLL_THRESHOLD = 10;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > SCROLL_THRESHOLD) setIsScrolled(true);
            else setIsScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isFormComplete) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isFormComplete]);

    const handleGenerate = async () => {
        const validWords = words.filter(word => word.trim() !== "");

        const requestBody = {
            title: name,
            language: LANGUAGE_MAP[language] || language.toLowerCase(), 
            genre: GENRE_MAP[selectedGenre], 
            mood: MOOD_MAP[selectedMood],
            created_by: "jena", 
            words: validWords,
            meaning: validWords.map(() => "") 
        };

        try {
            console.log("전송 데이터:", requestBody);
            const response = await post(ENDPOINTS.CREATE_WORDLY(), requestBody);

            if (response && response.success) {
                navigate('/loading', { state: { songId: response.song_id } });
            } else {
                navigate('/loading');
            }

        } catch (error) {
            console.error("곡 생성 중 오류가 발생했습니다:", error);
            alert("곡 생성 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="min-h-screen bg-[#F1F2F1] flex flex-col items-center pt-30 pb-96 px-4 font-inter relative">
            <h1 className="w-full max-w-[351px] text-[36px] font-medium text-[#111111] mb-3 text-left">
                Create
            </h1>

            <div className="w-full flex flex-col items-center justify-center z-10 mb-6 transition-all duration-300">
                {isFormComplete && isScrolled ? (
                    <div className="animate-fade-in-down w-full flex justify-center">
                        <InputDone
                            name={name}
                            language={language}
                            genre={selectedGenre}
                            mood={selectedMood}
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <InputIng
                            name={name} setName={setName}
                            language={language} setLanguage={setLanguage}
                            selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}
                            selectedMood={selectedMood} setSelectedMood={setSelectedMood}
                        />
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col items-center gap-6">
                <WordInput words={words} setWords={setWords}/>
            </div>

            {isFormComplete && isScrolled && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] flex justify-center z-40 pb-10 pointer-events-none transition-opacity duration-300">
                    <div className="w-full px-4 pointer-events-auto mb-24">
                        <button 
                            onClick={handleGenerate}
                            disabled={!hasValidWords}
                            className={`w-full py-4 rounded-[10px] text-[15px] font-regular shadow-md transition-colors
                                ${hasValidWords 
                                    ? 'bg-[#EF521F] text-white hover:bg-[#d64518] cursor-pointer' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }
                            `}
                        >
                            생성하기 
                        </button>
                    </div>
                </div>
            )}
            
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50">
                <Footer />
            </div>
            
        </div>
    );
};

export default VocabularyPage;
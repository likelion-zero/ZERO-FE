import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import InputDone from "@/features/Input/components/InputDone";
import InputIng from "@/features/Input/components/InputIng";
import WordInput from "@/features/Input/components/WordInput";

const VocabularyPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [language, setLanguage] = useState("English");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedMood, setSelectedMood] = useState("");

    const [words, setWords] = useState(Array(10).fill(""));
    const [isScrolled, setIsScrolled] =useState(false);
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

    const handleGenerate = () => {
        navigate('/loading');
    }

    return (
        <div className="min-h-screen bg-[#F1F2F1] flex flex-col items-center pt-30 pb-55 px-4 font-inter">
            <h1 className="w-full max-w-[351px] text-[36px] font-medium text-[#111111] mb-3 text-left">
                Create
            </h1>

            <div className="w-full flex justify-center z-10 mb-6 transition-all duration-300">
                {isFormComplete && isScrolled ? (
                    <div className="animate-fade-in-down w-full">
                        <InputDone
                            name = {name}
                            language={language}
                            genre={selectedGenre}
                            mood={selectedMood}
                        />
                    </div>
                ) : (
                    <div className="w-full">
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
                <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 pb-10 pointer-events-none transition-opacity duration-300">
                    <div className="w-full max-w-[351px] px-4 pointer-events-auto mb-24">
                        <button 
                            onClick={handleGenerate}
                            disabled={!hasValidWords}
                            className="w-full bg-[#EF521F] text-white py-4 rounded-[10px] text-[15px] font-regular shadow-md"
                        >
                            생성하기 
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VocabularyPage;

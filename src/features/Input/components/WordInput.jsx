import React, { useState, useEffect, useRef } from "react";

// 1. 테스트용 더미 데이터
const DUMMY_DB = {
    "apple": ["사과", "뉴욕의 별명", "IT 기업"],
    "banana": ["바나나", "열대 과일", "노란색"],
    "love": ["사랑", "애정", "좋아하다"],
    "music": ["음악", "노래", "뮤직"]
};

const SingleWordInput = ({ index, value, onChange }) => {
    const [meanings, setMeanings] = useState([]); 
    const [showDropdown, setShowDropdown] = useState(false);
    
    const wrapperRef = useRef(null);

    const handleSearch = () => {
        if (!value.trim()) return; 

        const foundMeanings = DUMMY_DB[value.toLowerCase()];

        if (foundMeanings) {
            setMeanings(foundMeanings);
        } else {
            setMeanings(["검색 결과가 없습니다."]);
        }
        setShowDropdown(true); 
    };

    const handleChange = (e) => {
        onChange(index, e.target.value);
        setShowDropdown(false); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div 
            ref={wrapperRef}
            className={`w-full flex items-start gap-2 relative ${showDropdown ? "z-20" : "z-0"}`}
        >
            <span className="w-6 text-[15px] font-light text-[#262626] text-center shrink-0 mt-2">
                {index + 1}
            </span>
            
            <div className="relative flex-grow">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="w-full p-3 h-9 bg-[#F5F5F5] rounded-xl text-sm text-[#262626] focus:outline-none transition-all duration-150"
                />
                {showDropdown && (
                    <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-1">
                        {meanings.map((meaning, i) => (
                            <div 
                                key={i}
                                className="p-2 text-sm text-gray-600 hover:bg-orange-50 rounded-md cursor-pointer"
                                onClick={() => {
                                    setShowDropdown(false); 
                                }}
                            >
                                {meaning}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button 
                onClick={handleSearch}
                className="w-15 h-9 bg-white border border-[#EF521F] text-black text-[13px] font-medium rounded-xl"
            >
                검색
            </button>
        </div>
    );
};

const WordInput = ({ words, setWords }) => {
    const handleChange = (index, value) => {
        const newInputs = [...words];
        newInputs[index] = value;

        if (index === words.length - 1 && value !== "") {
            newInputs.push("");
        }

        setWords(newInputs);
    };

    return (
        <div className="w-full max-w-[351px] bg-white rounded-[12px] p-6 shadow-sm font-inter mx-auto flex flex-col justify-center">
            <label className="text-[15px] font-light text-[#262626] block mb-3">
                단어 
            </label>

            <div className="flex flex-col gap-3">
                {words.map((text, index) => (
                    <SingleWordInput 
                        key={index} 
                        index={index} 
                        value={text} 
                        onChange={handleChange} 
                    />
                ))}
            </div>
        </div>
    );
};

export default WordInput;
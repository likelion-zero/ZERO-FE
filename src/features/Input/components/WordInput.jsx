import React, { useState, useEffect, useRef } from "react";

import { get } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';


const SingleWordInput = ({ index, value, onChange }) => {
    const [meanings, setMeanings] = useState([]); 
    const [showDropdown, setShowDropdown] = useState(false);
    
    const wrapperRef = useRef(null);

    const handleSearch = async () => {
        if (!value.trim()) return; 

        try {
            const response = await get(ENDPOINTS.GET_MEANING(value));
            
            if (response && response.meanings && response.meanings.length > 0) {
                setMeanings(response.meanings);
            } else {
                setMeanings(["검색 결과가 없습니다."]);
            }
            setShowDropdown(true); 

        } catch (error) {
            setMeanings(["오류가 발생했습니다."]);
            setShowDropdown(true);
        }
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
                    <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-1 z-50 max-h-40 overflow-y-auto">
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
                className="w-15 h-9 bg-white border border-[#EF521F] text-black text-[13px] font-medium rounded-xl px-3 hover:bg-orange-50 transition-colors shrink-0"
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

        const isLastBox = index === words.length - 1;
        const isNotEmpty = value !== "";
        const isUnderLimit = words.length < 20;

        if (isLastBox && isNotEmpty && isUnderLimit) {
            newInputs.push("");
        }

        setWords(newInputs);
    };

    return (
        <div className="w-full max-w-[351px] bg-white rounded-[12px] p-6 shadow-sm font-inter mx-auto flex flex-col justify-center">
            <label className="text-[15px] font-light text-[#262626] block mb-3">
                단어 
                <span className="text-xs text-gray-400 ml-2">({words.length}/20)</span>
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
import React from 'react';
import dropIcon from '@/assets/drop.svg';

// 더미데이터
const GENRES = ['클래식', '재즈', '발라드', '팝', '힙합', '댄스', '록'];
const MOODS = ['신나는', '슬픈', '재밌는', '편안한', '박진감 넘치는', '잔잔한'];

const Tag = ({ children, isSelected, onClick }) => {
    // 기본 스타일
    const baseStyle = 'px-4 py-0.5 text-sm font-light text-[#262626] rounded-full border transition-colors duration-200 cursor-pointer whitespace-nowrap';
    // 선택 시 
    const selectedStyle = 'bg-[#EF521F]/20 text-[#EF521F] border-[#EF521F] font-medium shadow-sm';
    
    return (
        <button 
            className={`${baseStyle} ${isSelected ? selectedStyle : 'bg-white text-gray-700 border-[#D9D9D9] hover:bg-gray-50'}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}; 

const InputIng = ({
    name, setName, 
    language, setLanguage,
    selectedGenre, setSelectedGenre,
    selectedMood, setSelectedMood
}) => {

    return (
        <div className="w-full max-w-[351px] bg-white rounded-[12px] p-6 shadow-sm font-inter mx-auto flex flex-col justify-center">
            <div className="mb-6">
                <label className="text-[15px] font-light text-[#262626] block mb-3">이름</label>

                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-[34px] p-4 bg-[#F5F5F5] text-black font-light rounded-xl focus:outline-none transition-all duration-150"  
                    />
                    <div className="relative w-full">
                        <button
                            className="w-full h-[34px] bg-[#F5F5F5] text-black font-light rounded-xl flex items-center justify-center relative transition-all duration-150 hover:bg-gray-200"
                            onClick={() => setLanguage(language === "English" ? "korean" : "English")}
                        >
                            {language}
                            <img 
                                src={dropIcon} 
                                alt="Dropdown Icon" 
                                className={`absolute right-4 w-3 h-3 transition-transform duration-200 ${language === "korean" ? 'rotate-180' : ''}`} 
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="text-[15px] font-light text-[#262626] block mb-3">장르</label>
                <div className='flex flex-wrap gap-2'>
                    {GENRES.map((genre) => (
                        <Tag
                            key={genre}
                            isSelected={selectedGenre === genre}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </Tag>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-[15px] font-light text-[#262626] block mb-3">분위기</label>
                <div className='flex flex-wrap gap-2'>
                    {MOODS.map((mood) => (
                        <Tag
                            key={mood}
                            isSelected={selectedMood === mood}
                            onClick={() => setSelectedMood(mood)}
                        >
                            {mood}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InputIng;
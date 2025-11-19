import React from 'react';

const InputDone = ({ 
    name = "나의 첫 노래", 
    language = "English", 
    genre = "댄스", 
    mood = "재밌는" 
}) => {
    const labelStyle = "text-[15px] font-light text-[#262626] w-10 shrink-0";
    const valueBoxStyle = "flex-grow bg-[#F5F5F5] rounded-xl py-1 px-4 text-sm text-[#262626] font-regular text-center truncate flex items-center justify-center";

    return (
        <div className="w-full max-w-[351px] bg-white rounded-[12px] p-5 shadow-sm font-inter mx-auto flex flex-col justify-center">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className={labelStyle}>이름</span>
                    <div className="flex-grow bg-[#F5F5F5] rounded-xl flex items-center py-1">
                        <div className="flex-1 text-center text-sm text-[#262626] font-regular truncate px-1">
                            {name}
                        </div>
                        <div className="w-[1px] h-4 bg-[#D9D9D9]"></div>
                        <div className="w-24 text-center text-sm text-[#262626] font-regular">
                            {language}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={labelStyle}>장르</span>
                    <div className={valueBoxStyle}>
                        {genre}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={labelStyle}>분위기</span>
                    <div className={valueBoxStyle}>
                        {mood}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InputDone;
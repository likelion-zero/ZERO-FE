import React, { useState } from "react";

const WordInput = () => {
    const [inputs, setInputs] = useState(Array(10).fill(""));

    const handleChange = (index,value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        // 마지막 입력시 자동 생성
        if (index === inputs.length-1 && value !== ""){
            setInputs([...newInputs, ""])
        }
    };

    return (
        <div className="w-full max-w-[351px] bg-white rounded-[12px] p-6 shadow-sm font-inter mx-auto flex flex-col justify-center">
            <label className="text-[15px] font-light text-[#262626] block mb-3">
                단어 
            </label>

            <div className="flex flex-col gap-3">
                {inputs.map((text, index) => (
                    <div key={index} className="flex items-center">
                        <span className="w-6 text-[15px] font-light text-[#262626] text-center mr-4 shrink-0">
                            {index+1}
                        </span>

                        <input
                            type = "text"
                            value = {text}
                            onChange = {(e) => handleChange(index, e.target.value)}
                            className="flex-grow p-3 h-9 bg-[#F5F5F5] rounded-xl text-sm text-[#262626] focus:outline-none duration-150" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordInput;
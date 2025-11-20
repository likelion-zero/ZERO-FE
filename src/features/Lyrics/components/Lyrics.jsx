import React, { useRef, useEffect } from "react";

const Lyrics = ({ lyrics, activeIndex }) => {
    const scrollRef = useRef(null);

    // 가사 재생 스탙일
    const getLineStyle = (index) => {
        const baseStyle = "trainsition-all duration-500 ease-in-out block";
        // 현재 재생 가사 
        if (index === activeIndex) {
            return `${baseStyle} text-[#EF521F] font-bold text-[30px] opacity-90 blur-none leading-relaxed`;
        }
        // 재생되는 가사의 위, 아래 가사 
        else if (index === activeIndex - 1 || index === activeIndex + 1){
            return `${baseStyle} text-white text-[25px] font-medium opacity-100`;
        }
        // 나머지 블러 처리 가사 
        else {
            return `${baseStyle} text-[#F5F5F5] text-[25px] font-regular opacity-40 leading-relaxed`;
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.children[0].children[activeIndex];
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [activeIndex]);

    return (
        <div
            ref={scrollRef}
            className="w-full max-w-[350px] h-[326px] rounded-[12px] bg-[#D9D9D9] p-6 overflow-auto scrollbar-hide mx-auto relative"
            style = {{ 
                scrollbarWidth: 'none', 
                msOverflowStyle:'none',
            }}
        >
            <div className="flex flex-col gap-3 items-start text-left py-[50%]">
                {lyrics.map((line, index) => (
                    <p
                        key={index}
                        className={getLineStyle(index)}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Lyrics;

import React, { useRef, useState } from "react";

const Lyrics = ({ lyrics }) => {
    const scrollRef = useRef(null);
    const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        const containerCenter = container.scrollTop + container.clientHeight / 2;
        const children = container.children[0].children; 

        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(children).forEach((child, index) => {
            const childCenter = child.offsetTop + child.offsetHeight / 2;
            const distance = Math.abs(containerCenter - childCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        setCurrentActiveIndex(closestIndex);
    };

    const getLineStyle = (index) => {
        const baseStyle = "transition-all duration-500 ease-in-out block";
        // 내부 state인 currentActiveIndex를 사용
        if (index === currentActiveIndex) {
            return `${baseStyle} text-[#EF521F] font-bold text-[30px] opacity-90 blur-none leading-relaxed`;
        }
        else if (index === currentActiveIndex - 1 || index === currentActiveIndex + 1){
            return `${baseStyle} text-white text-[25px] font-medium opacity-100`;
        }
        else {
            return `${baseStyle} text-[#F5F5F5] text-[25px] font-regular opacity-40 leading-relaxed`;
        }
    };

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll} 
            className="w-full max-w-[350px] h-[326px] rounded-[12px] bg-[#D9D9D9] p-6 overflow-auto scrollbar-hide mx-auto relative snap-y snap-mandatory"
            style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle:'none',
            }}
        >
            <div className="flex flex-col gap-3 items-start text-left py-[50%]">
                {lyrics.map((line, index) => (
                    <p
                        key={index}
                        className={`snap-center ${getLineStyle(index)}`}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Lyrics;
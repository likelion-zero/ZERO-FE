import { motion } from 'framer-motion';

const MovingCircles = () => {
    // 확대, 축소 효과 
    const dotVariants = {
        small: { scale: 0.8, opacity: 0.6 },
        large: { scale: 1.2, opacity: 1 },
    };

    // 무한 반복 
    const transition = {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
    };

    return (
        <div className="flex flex-row justify-center items-center w-auto">
            <motion.div
                className="w-5 h-5 md:w-7 md:h-7 bg-[#F5F5F5] rounded-full mx-7 md:mx-14"
                variants={dotVariants}
                initial="small"
                animate="large"
                transition={{...transition, delay: 0}}
            />

            <motion.div
                className="w-5 h-5 md:w-7 md:h-7 bg-[#F5F5F5] rounded-full mx-7 md:mx-14"
                variants={dotVariants}
                initial="small"
                animate="large"
                transition={{...transition, delay: 0.3}}
            />

            <motion.div
                className="w-5 h-5 md:w-7 md:h-7 bg-[#F5F5F5] rounded-full mx-7 md:mx-14"
                variants={dotVariants}
                initial="small"
                animate="large"
                transition={{...transition, delay: 0.6}}
            />
        </div>
    );
};

export default MovingCircles;


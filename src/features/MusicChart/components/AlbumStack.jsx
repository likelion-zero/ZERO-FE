import { useState } from 'react';
import Album from '@/features/MusicChart/components/Album';
// ToDo: motion lint error 수정
import { motion, AnimatePresence } from 'framer-motion';

const AlbumStack = () => {
  const albums = [
    { id: 1, title: 'fruits song', genre: '동요 | 신나는' },
    { id: 2, title: 'summer vibes', genre: '팝 | 경쾌한' },
    { id: 3, title: 'night jazz', genre: '재즈 | 차분한' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event, info) => {
    const threshold = 50;

    if (info.offset.y < -threshold){
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % albums.length);
    } else if (info.offset.y > threshold) {
      // 아래로 스와이프
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
    }
  };

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 100: -100,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      y: direction > 0 ? -100: 100,
      opacity: 0,
      scale: 0.8,
    }),
  };
  
  
  return(
    <div className="relative w-full h-auto flex justify-center items-center">
      <motion.div
        className="absolute w-70 h-70 bg-orange-100 rounded-2xl translate-y-24 z-0"
        animate = {{
          filter: isDragging ? 'blur(4px)' : 'blur(0px)',
          ease: "easeIn"
        }}
      >
        <motion.p 
          className='absolute bottom-2 left-1/2 -translate-x-1/2 font-extralight text-4xl text-center text-white'
          animate = {{
            opacity: isDragging ? 0 : 1,
            y: isDragging ? 0 : [0,-10,0],
          }}
          transition={{
            operation: {duration : 0.2},
            y:{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          >
            ↑
          </motion.p>
      </motion.div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: {type: 'spring', stiffness: 300, damping: 30},
            opacity: {duration: 0.4},
            scale: {duration: 0.3},
            ease: 'easeOut'
          }}
          drag="y"
          dragConstraints={{top:0, bottom:0}}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(event,info) =>{
            setIsDragging(false);
            handleDragEnd(event, info)
          }}
          className='absolute inset-0 flex justify-center items-center z-10'
        >
          <Album {...albums[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
};

export default AlbumStack;
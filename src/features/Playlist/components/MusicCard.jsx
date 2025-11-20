import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import TrashIcon from "@/shared/components/icons/Trash_light.svg"
import AlbumImage from "@/shared/components/Album/AlbumImage";

const MusicCard = ({
  songId,
  title,
  language,
  genre,
  mood,
  runtime,
  createdBy,
  isFromChart,
  historyCount,
  imageWords,
  onDelete
}) => {
  const dummy = {
    songId,
    title: "fruit Song",
    language,
    genre: "동요 | 신나는",
    mood,
    runtime: 90,
    createdBy,
    isFromChart,
    historyCount,
    imageWords: ["s", "t", "t", "t", "t", "t"],
    onDelete
  };

  const [isRevealed, setIsRevealed] = useState(false);
  const x = useMotionValue(0);

  const deleteButtonOpacity = useTransform(x, [-100, 0], [1,0]);
  
  const handleDragEnd = (event, info) => {
    const threshold = -80;

    if (info.offset.x < threshold) {
      setIsRevealed(true);
    }else {
      setIsRevealed(false);
    }

  };

  const handleDelete = () => {
    if(onDelete){
      onDelete();
    }
  }



  return (
    <div className="relative w-full h-30 border-b  border-white">
      <motion.div
        className="absolute right-0 top-0 h-full w-30 bg-orange-100"
        style={{ opacity: deleteButtonOpacity}}
      >
        <button 
          onClick={handleDelete}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <img src={TrashIcon} alt="삭제" />
        </button>
      </motion.div>

      {/* 음악 카드 (드래그 가능) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#111] px-5 py-3 flex items-center"
        drag='x'
        dragConstraints={{left:-120, right:0}}
        dragElastic={0.1}
        onDrageEnd = {handleDragEnd}
        animate={{
          x: isRevealed ? -100 : 0
        }}
        transition={{
          typs: 'spring',
          stiffness:300,
          damping: 30
        }}
        style={{x}}
      >
        <AlbumImage size="30" />
        
        <div className="ml-5 flex-1 flex flex-col justify-center gap-2">
          <h3 className="text-white text-base ">
            {dummy.title}
          </h3>

          <p className="text-xs text-white">
            {Math.floor(dummy.runtime /60)}: {dummy.runtime % 60}
          </p>
          <div className="flex justify-between">
            <p className="text-xs text-white">
              {dummy.genre}
            </p>
            <p className="text-white text-xs">
              {dummy.imageWords.length} Words
            </p>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
}

export default MusicCard;
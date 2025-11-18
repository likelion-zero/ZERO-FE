import { useState } from 'react';
import Album from './Album';
const AlbumStack = () => {
  const albums = [
    { id: 1, title: 'fruits song', genre: '동요 | 신나는' },
    { id: 2, title: 'summer vibes', genre: '팝 | 경쾌한' },
    { id: 3, title: 'night jazz', genre: '재즈 | 차분한' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev+1) % albums.length);
  };
  
  return(
    <div className="relative w-full h-screen flex justify-center items-center">
      <Album {...albums[currentIndex]} />    
      
      <div className="relative w-70 h-70 bg-orange-100 rounded-2xl translate-y-30 " />
    </div>
  )
};

export default AlbumStack;
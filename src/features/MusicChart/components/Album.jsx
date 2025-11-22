
import { useNavigate } from 'react-router-dom';
import AlbumImage from '../../../shared/components/Album/AlbumImage';

const Album = ({songId, title, genre, imageWords}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/player/${songId}`);
  };

  return(
    <div className="flex flex-col justify-center items-center z-10 cursor-pointer" onClick={handleClick}>
      <div className="w-75 h-90 rounded-3xl flex flex-col p-4 bg-[#3b3b3b]/80 backdrop-blur-xs">
        <AlbumImage words={imageWords}/>
        <p className="text-white font-inter text-base mt-2">{title}</p>
        <p className="text-white font-inter text-xs">{genre}</p>
      </div>
    </div>
  );
};

export default Album;
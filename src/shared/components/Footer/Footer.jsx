import AddIcon from "@/shared/components/icons/Add.svg"
import MusicIcon from "@/shared/components/icons/Music.svg"
import SearchIcon from "@/shared/components/icons/Search.svg"
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return(
    <div className="fixed bottom-0 w-full h-22 z-999">
      <div className="absolute inset-0 bg-[#262626]/95 backdrop-blur-sm"/>
      <div className="relative flex justify-around h-full items-center">
        <button
          onClick={() => navigate('/playlist')}
          className="cursor-pointer"
        >
          <img src={MusicIcon} alt="" />
        </button>
        <button
          onClick={() => navigate('/vocabulary')}
          className="cursor-pointer"
        >
          <img src={AddIcon} alt="" />
        </button>
        <button
          onClick={() => navigate('/chart')}
          className="cursor-pointer"
        >
          <img src={SearchIcon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Footer;
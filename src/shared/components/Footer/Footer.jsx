import AddIcon from "@/shared/components/icons/Add.svg"
import MusicIcon from "@/shared/components/icons/Music.svg"
import SearchIcon from "@/shared/components/icons/Search.svg"
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return(
    <div className="fixed bottom-0 w-full h-22 flex justify-around bg-[#262626]/95 z-999">
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
  );
}

export default Footer;
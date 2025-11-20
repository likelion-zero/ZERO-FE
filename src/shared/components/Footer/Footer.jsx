import AddIcon from "@/shared/components/icons/Add.svg"
import MusicIcon from "@/shared/components/icons/Music.svg"
import SearchIcon from "@/shared/components/icons/Search.svg"
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return(
    <div className="fixed bottom-0 w-full h-23 flex justify-around bg-[#262626]/95">
      <button
        onClick={() => navigate('/playlist')}
      >
        <img src={MusicIcon} alt="" />
      </button>
      <button
        onClick={() => navigate('/vocabulary')}
      >
        <img src={AddIcon} alt="" />
      </button>
      <button
        onClick={() => navigate('/chart')}
      >
        <img src={SearchIcon} alt="" />
      </button>

    </div>
  );
}

export default Footer;
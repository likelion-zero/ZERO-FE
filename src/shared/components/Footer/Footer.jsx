import Add from "@/shared/components/icons/Add";
import Music from "@/shared/components/icons/Music";
import Search from "@/shared/components/icons/Search";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return(
    <div className="fixed bottom-0 w-full h-22 z-999">
      <div className="absolute inset-0 bg-[#262626]/95 backdrop-blur-[1px]"/>
      <div className="relative flex justify-around h-full items-center">
        <NavLink
          to='/playlist'
          className="cursor-pointer"
        >
          {({ isActive }) => (
            <Music color={isActive ? '#EF521F' : '#D9D9D9'}/>
          )}
        </NavLink>

        <NavLink
          to='/'
          className="cursor-pointer"
        >
          {({ isActive }) => (
            <Add color={isActive ? '#EF521F' : '#D9D9D9'}/>
          )}
        </NavLink>

        <NavLink
          to='/chart'
          className="cursor-pointer"
        >
          {({ isActive }) => (
            <Search color={isActive ? '#EF521F' : '#D9D9D9'}/>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
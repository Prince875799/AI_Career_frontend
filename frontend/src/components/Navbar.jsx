
import React, { useState, useContext } from "react";
import Logo from "../assets/react.svg";
import { FaRegUserCircle, FaHome } from "react-icons/fa";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { MdDashboardCustomize } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { MdTipsAndUpdates } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { MdAppRegistration } from "react-icons/md";
import axios from "axios";
import { LuView } from "react-icons/lu";

const Navbar = () => {
  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[20px] shadow-md shadow-black">

      <div className="flex items-center gap-[10px] ml-[20px] cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-[30px] h-[30px]" src={Logo} alt="logo" />
        <h1 className="font-serif text-[25px] text-black">AI Career Coach</h1>
      </div>

      <div className="hidden md:flex">
        <ul className="flex items-center gap-[19px] text-white">
          
          {userData && (
            <>
            <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[16px] rounded-2xl"
            onClick={() => navigate("/builder")}
          >
            Resume Builder
          </li>
              <li
                className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[16px] rounded-2xl"
                onClick={() => navigate("/c")}
              >
                Career Roadmap
              </li>
              <li
                className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[16px] rounded-2xl"
                onClick={() => navigate("/q")}
              >
                Mock Interview
              </li>
             
            </>
          )}
        
        </ul>
      </div>

      <div className="flex items-center gap-[10px] relative">
        {!userData && (
          <FaRegUserCircle
            className="w-[28px] h-[28px] text-[#000000] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        )}
        {userData && (
          <div
            className="w-[28px] h-[28px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}
      </div> 

      {showProfile && (
        <div className="w-[180px] bg-[#000000d7] absolute top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="flex flex-col text-[16px] py-[10px] text-white">
            {!userData && (
              <li
                className="hover:bg-[#2f2f2f] px-[15px] py-[8px] cursor-pointer text-center"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="hover:bg-[#2f2f2f] px-[15px] py-[8px] cursor-pointer text-center"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                LogOut
              </li>
            )}
          </ul>
        </div>
      )}

      
    </div>
  );
};

export default Navbar
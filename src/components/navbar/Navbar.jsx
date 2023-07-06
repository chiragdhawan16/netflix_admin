import React from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ListIcon from "@mui/icons-material/List";
import { useAuth } from "../../context/auth";


const Navbar = () => {
  const[auth,setAuth]=useAuth();
 
  const logout=(e)=>{
      e.preventDefault()
      setAuth({
        ...auth,
        user:null,
        token:''
    })
    localStorage.removeItem('netflixauthadmin')
  
    }
 
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageIcon  className="icon"/>
            English
          </div>
          <div className="item">
            <DarkModeIcon  className="icon"/>
          </div>
          <div className="item">
            <FullscreenIcon className="icon"/>
          </div>
          <div className="item">
            <NotificationsIcon className="icon"/>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineIcon className="icon"/>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListIcon className="icon"/>
          </div>
          <div className="item">
            <img src={auth?.user?.profilePic? auth?.user?.profilePic:"https://www.allianceplast.com/wp-content/uploads/no-image-1024x1024.png" }  className="avatar" onClick={e=>(logout(e))}/>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;

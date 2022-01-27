import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { logout } from "../../context/AuthActions";

const PF=process.env.REACT_APP_PUBLIC_FOLDER;

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [profileDown, setProfileDown] = useState(false);
  
  const renderProfile = () => {
    if (profileDown) {
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
    } else {
      setProfileDown(true);
      document.getElementsByClassName('dropdown-content')[0].classList.add('block');
    }
  }
  
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">E-Reunion</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to ="/messenger" style={{ textDecoration: "none", color: "white" }}>
            <Chat />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="arrowIconArea" onClick={renderProfile}>
            <ArrowDropDownCircleIcon className="topbarIconItem" />
          <div className="dropdown-content">
            <a href={`/profile/${user.username}`}>
              <div className="optionDrop">
                <div className="sideinfoDropAvatar">
                  <img src={
                    user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="topbarImg"
                />
                <h1>{user?.username}</h1>
                </div>
                <p>See your profile ...</p>
              </div>
            </a>
            <div className="hr" />

            {/* <a href=""> */}
              <div className="optionDrop">
                <div className="iconDrop">
                  <i className="settings" />
                </div>
                <h1>Settings & Privacy</h1>
              </div>
            {/* </a> */}
            {/* <a href=""> */}
              <div className="optionDrop">
                <div className="iconDrop">
                  <i className="helpAndSupport" />
                </div>
                <h1>Help & Support</h1>
              </div>
            {/* </a> */}
            
              <div className="optionDrop">
                <div className="iconDrop">
                  <i className="darkMode" />
                </div>
                <h1>Dark Mode</h1>
              </div>
            
            <a href="/login">
              <div onClick={() => dispatch(logout())} className="optionDrop">
                <div className="iconDrop">
                  <i className="logout" />
                </div>
                <h1>Log out</h1>
              </div>
            </a>
          </div>
            
        </div>
      </div>
    </div>
  );
}

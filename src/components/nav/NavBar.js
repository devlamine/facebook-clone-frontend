import React, { useEffect, useState } from "react";
import Logo from "../../Images/logo.png";
import { Menu, Switch, Avatar, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import { isAuthenticated, signOut } from "../../functions/auth";
import Notification from "../../pages/Notification";

const { SubMenu, Item } = Menu;

const NavBar = () => {
  const history = useHistory();
  const [current, setCurrent] = useState("Home");
  const [modeType, setModeType] = useState("light");
  const [modeInfo, setModeInfo] = useState("Enable Dark Mode");
  const [popUpVisible, setPopUpVisible] = useState(false);
  const dispatch = useDispatch();
  const { mode, userRequest } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated()) {
      if (localStorage.getItem("mode")) {
        let appliedMode = localStorage.getItem("mode");
        setModeType(appliedMode);
      }
    } else {
      history.push("/login");
    }
  }, []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleMode = () => {
    if (modeType === "light") {
      setModeType("dark");
      localStorage.setItem("mode", "dark");
      dispatch({
        type: "SET_MODE",
        payload: "dark",
      });
      setModeInfo("Enable Light Mode");
    } else {
      setModeType("light");
      localStorage.setItem("mode", "light");
      dispatch({
        type: "SET_MODE",
        payload: "light",
      });
      setModeInfo("Enable Dark Mode");
    }
  };

  const handlePopUp = () => {
    setPopUpVisible(!popUpVisible);
  };

  const firstName = isAuthenticated() && isAuthenticated().user.firstName;
  const profilePhoto = isAuthenticated() && isAuthenticated().user.profilePhoto;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const profilePhotoLength = profilePhoto?.length;

  return (
    <div className="sticky-top" style={{ zIndex: "50" }}>
      <Menu
        selectedKeys={[current]}
        onClick={handleClick}
        mode="horizontal"
        style={
          mode === "dark"
            ? { backgroundColor: "#18191a", color: "white" }
            : { backgroundColor: "#rgb(241, 239, 239)", color: "black" }
        }
      >
        <Item key="logo">
          <Link to="/">
            <img src={Logo} alt="FBLogo" width="55px" />
          </Link>
        </Item>

        <Item
          key="home"
          className="nav-main"
          key="Home"
          icon={<HomeIcon style={{ fontSize: "30px" }} />}
        >
          <Link to="/" />
        </Item>
        <Item
          key="Friends"
          icon={<SupervisedUserCircleIcon style={{ fontSize: "30px" }} />}
        >
          <Link to={`/friends/home/${userId}`} />
        </Item>
        <Item key="Chat" icon={<ChatIcon style={{ fontSize: "30px" }} />}>
          <Link to="/chat-room" />
        </Item>

        <Item
          key="watch"
          icon={<OndemandVideoIcon style={{ fontSize: "30px" }} />}
        ></Item>
        <Item
          key="store"
          icon={<StorefrontOutlinedIcon style={{ fontSize: "30px" }} />}
        ></Item>
        <Item
          key="Notifications"
          icon={
            <span onClick={handlePopUp}>
              <Badge count={userRequest.length}>
                <NotificationsIcon
                  style={
                    mode === "light"
                      ? { fontSize: "30px", color: "black" }
                      : { fontSize: "30px", color: "white" }
                  }
                />
              </Badge>
            </span>
          }
        ></Item>
        <SubMenu
          className="nav-setting"
          key="SubMenu"
          title={
            isAuthenticated()
              ? isAuthenticated()?.user?.firstName + "'s profile"
              : "Settings"
          }
          icon={
            isAuthenticated() &&
            isAuthenticated().user.profilePhoto.length >= 1 ? (
              <Avatar
                src={
                  isAuthenticated().user.profilePhoto[profilePhotoLength - 1]
                    .url
                }
                size={46}
              />
            ) : (
              <Avatar style={{ backgroundColor: "blue" }}>
                {firstName && firstName.slice(0, 1)}
              </Avatar>
            )
          }
        >
          {isAuthenticated() && (
            <>
              <Item key="Timeline">
                <Link to={`/timeline/${userId}`}>Timeline</Link>
              </Item>
              <Item key="Logout">
                <p onClick={() => signOut(() => history.push("/login"))}>
                  Log Out
                </p>
              </Item>
            </>
          )}

          {!isAuthenticated() && (
            <>
              <Item key="Login">
                <Link to="/login">Log In</Link>
              </Item>
            </>
          )}

          <Item>
            {modeInfo}{" "}
            <Switch
              checked={modeType === "dark"}
              unCheckedChildren={modeType === "dark" ? "light" : "dark"}
              checkedChildren={modeType === "dark" ? "light" : "dark"}
              onChange={handleMode}
            />
          </Item>
        </SubMenu>
      </Menu>
      {popUpVisible && <Notification />}
    </div>
  );
};

export default NavBar;

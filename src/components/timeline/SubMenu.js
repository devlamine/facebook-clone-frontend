import {
  CheckOutlined,
  CloseOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../functions/auth";
import { fetchPostsByuser } from "../../functions/post";
import {
  addToFriendList,
  confirmFriendRst,
  getUser,
  removeFriendRequest,
  unFriend,
} from "../../functions/user";
import "./submenu.css";
import UserPhotos from "./UserPhotos";
import UserPost from "./UserPost";
import "antd/dist/antd.css";
import UserFriends from "./UserFriends";
import chatLog from "../../Images/messenger-logo.png";
import ChatPopUp from "../chats/ChatPopUp";
import { useDispatch, useSelector } from "react-redux";

const { Item } = Menu;

const SubMenu = ({ userData, userIdParams, mode, setRunUseEffect }) => {
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;
  const dispatch = useDispatch();

  const { chatPopUpRedux } = useSelector((state) => ({ ...state }));

  const [linkActive, setLinkActive] = useState({
    post: true,
    about: false,
    friends: false,
    photos: false,
  });
  const [visible, setVisible] = useState(false);
  const [runUseEffectInSub, setRunUseEffectInSub] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({});
  const [AddedFriend, setAddedFriend] = useState(false);
  const [chatPopUp, setChatPopUp] = useState(false);
  const loggedInUserName =
    loggedInUserInfo?.firstName + " " + loggedInUserInfo?.lastName;

  const userName = userData.firstName + " " + userData.lastName;

  const loadPosts = () => {
    fetchPostsByuser(token, userIdParams)
      .then((res) => {
        setPosts(res.data.timeline);
        setSelectedUserId(res.data._id);
      })
      .catch((e) => console.log(e));
  };
  //load all posts of the user
  useEffect(() => {
    loadPosts();
  }, [visible]);

  //get the user info of the logged in user
  useEffect(() => {
    getUser(token, userId).then((res) => setLoggedInUserInfo(res.data));
  }, [runUseEffectInSub]);

  //to check whether the user has sent friend request to user or not
  const checkFriend = (f) => {
    const match = f?.friendRequests?.find((friend) => {
      return friend._id === userId;
    });
    // console.log("this is match-->", userData);
    return match;
  };

  useEffect(() => {
    getUser(token, userIdParams).then((res) => {
      let addedToFrndList = checkFriend(res.data);
      setAddedFriend(addedToFrndList);
    });
  }, []);

  const handleAddFriend = () => {
    addToFriendList(token, loggedInUserInfo._id, userIdParams).then((res) => {
      setAddedFriend(!AddedFriend);
    });
  };

  // to show confirm and delete friend request alert

  const checkFriendRequest = () => {
    let match;
    loggedInUserInfo?.friendRequests?.filter((friendId) => {
      if (friendId._id === userIdParams) {
        match = true;
      } else {
        match = false;
      }
    });
    return match;
  };

  const handleConfirmFriendRequest = () => {
    confirmFriendRst(
      token,
      userId,
      userIdParams,
      userName,
      loggedInUserName
    ).then((res) => setRunUseEffectInSub(true));
  };

  //whether to show add to friend or not

  const isFriendVisible = (id) => {
    let match;
    match = loggedInUserInfo?.friends?.find((frnId) => frnId._id === id);
    if (userId === id) match = true; //remove add friend if users goes to their own page

    return match;
  };

  //cancel friend request
  const handleCancelRequest = () => {
    removeFriendRequest(token, userId, userData._id).then((res) => {
      if (res.data.success) {
        setAddedFriend(!AddedFriend);
      }
    });
  };

  const handlePost = (type) => {
    if (type === "post") {
      setLinkActive({
        ...linkActive,
        post: true,
        about: false,
        friends: false,
        photos: false,
      });
      loadPosts();
    } else if (type === "about") {
      setLinkActive({
        ...linkActive,
        post: false,
        about: true,
        friends: false,
        photos: false,
      });
    } else if (type === "friends") {
      setLinkActive({
        ...linkActive,
        post: false,
        about: false,
        friends: true,
        photos: false,
      });
    } else {
      setLinkActive({
        ...linkActive,
        post: false,
        about: false,
        friends: false,
        photos: true,
      });
    }
  };

  const handleUnfriend = () => {
    unFriend(token, userId, userIdParams).then((res) =>
      setRunUseEffectInSub(true)
    );
  };

  const openChatPopUp = () => {
    setChatPopUp(!chatPopUp);
    dispatch({
      type: "SET_CHAT_POP_UP",
      payload: !chatPopUp,
    });
  };

  const friendPopUp = (
    <Menu
      style={
        mode === "dark"
          ? { backgroundColor: "#012243" }
          : { backgroundColor: "white" }
      }
    >
      <Item
        style={mode === "dark" ? { color: "gray" } : { color: "black" }}
        key="friendName"
      >
        <p>
          <UserOutlined className="mx-1" />
          <CheckOutlined style={{ fontSize: "8px", marginRight: "2px" }} />
          {userData.firstName} is your friend
        </p>
      </Item>
      <Item
        style={mode === "dark" ? { color: "gray" } : { color: "black" }}
        key="unfirend"
      >
        <p onClick={handleUnfriend}>
          <UserOutlined></UserOutlined>{" "}
          <CloseOutlined style={{ fontSize: "8px", marginRight: "2px" }} />
          Unfriend
        </p>
      </Item>
    </Menu>
  );
  return (
    <>
      <div
        style={
          mode === "dark"
            ? { backgroundColor: "#012243" }
            : { backgroundColor: "white" }
        }
        className="sticky-menu"
      >
        <ul className="sub-menu">
          <li
            onClick={() => handlePost("post")}
            style={
              (linkActive.post && { color: "blue" }) ||
              (mode === "dark" && linkActive.post && { color: "blue" }) ||
              (!linkActive.post && mode === "dark" && { color: "white" }) ||
              (!linkActive.post && mode === "light" && { color: "black" })
            }
          >
            Posts
          </li>

          <li
            style={
              (linkActive.about && { color: "blue" }) ||
              (mode === "dark" && linkActive.about && { color: "blue" }) ||
              (!linkActive.about && mode === "dark" && { color: "white" }) ||
              (!linkActive.about && mode === "light" && { color: "black" })
            }
            onClick={() => handlePost("about")}
          >
            About
          </li>
          <li
            style={
              (linkActive.friends && { color: "blue" }) ||
              (mode === "dark" && linkActive.friends && { color: "blue" }) ||
              (!linkActive.friends && mode === "dark" && { color: "white" }) ||
              (!linkActive.friends && mode === "light" && { color: "black" })
            }
            onClick={() => handlePost("friends")}
          >
            Friends
          </li>
          <li
            style={
              (linkActive.photos && { color: "blue" }) ||
              (mode === "dark" && linkActive.photos && { color: "blue" }) ||
              (!linkActive.photos && mode === "dark" && { color: "white" }) ||
              (!linkActive.photos && mode === "light" && { color: "black" })
            }
            onClick={() => handlePost("photos")}
          >
            Photos
          </li>

          {isFriendVisible(userIdParams) && (
            <span>
              <Dropdown
                trigger={["click"]}
                arrow
                placement="bottomLeft"
                overlay={friendPopUp}
              >
                <UserOutlined style={{ fontSize: "30px" }} />
              </Dropdown>
            </span>
          )}

          {userData._id !== loggedInUserInfo._id && (
            <div onClick={openChatPopUp} className="messenger-btn">
              <img
                style={{ filter: "invert(100%)" }}
                width="20px"
                src={chatLog}
                alt="messenger-icon"
              />{" "}
              <span style={{ padding: "10px" }}> Message</span>
            </div>
          )}
        </ul>
      </div>
      <div
        style={
          mode === "dark"
            ? { backgroundColor: "rgb(0, 48, 94)" }
            : { backgroundColor: "#f0f2f5" }
        }
        className="row main-page-timeline"
      >
        {!isFriendVisible(userIdParams) &&
        !AddedFriend &&
        !checkFriendRequest() ? (
          <span className="text-center my-4">
            <p className="alert alert-secondary d-inline">
              Do you know <b>{userData.firstName + " " + userData.lastName}</b>
              ?, add to your friend list to checkout their post regularly
              <button
                onClick={handleAddFriend}
                className="btn btn-primary btn-sm mx-2"
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UserAddOutlined className="mx-1" />
                  Add friend
                </span>
              </button>
            </p>
          </span>
        ) : (
          !isFriendVisible(userIdParams) &&
          AddedFriend && (
            <>
              <span className="text-center my-4">
                <p className="alert alert-secondary d-inline">
                  Your friend request has been sent to{" "}
                  <b>{userData.firstName + " " + userData.lastName}</b>
                  <CheckOutlined style={{ fontSize: "30px" }} />
                  <button
                    onClick={handleCancelRequest}
                    className="btn btn-secondary btn-sm my-2 mx-2"
                  >
                    Cancel
                  </button>
                </p>
              </span>
            </>
          )
        )}
        {checkFriendRequest() && (
          <span className="text-center my-4">
            <p className="alert alert-secondary d-inline">
              {userData.firstName + " " + userData.lastName} has sent you friend
              request
              <button
                onClick={handleConfirmFriendRequest}
                className="btn btn-primary btn-sm mx-2"
              >
                Confirm
              </button>
              <button className="btn btn-secondary btn-sm">Delete</button>
            </p>
          </span>
        )}

        {/* posts */}
        <UserPost
          mode={mode}
          setVisible={setVisible}
          visible={visible}
          linkActive={linkActive}
          posts={posts}
          userData={userData}
          selectedUserId={selectedUserId}
        />
        {/* photos */}
        <UserPhotos userData={userData} linkActive={linkActive} mode={mode} />
        <UserFriends
          userData={userData}
          linkActive={linkActive}
          mode={mode}
          setRunUseEffect={setRunUseEffect}
        />
      </div>
      {chatPopUpRedux && (
        <ChatPopUp
          userData={userData}
          loggedInUserInfo={setLoggedInUserInfo}
          setChatPopUp={setChatPopUp}
          chatPopUp={chatPopUp}
        />
      )}
    </>
  );
};

export default SubMenu;

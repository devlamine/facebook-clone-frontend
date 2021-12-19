import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "antd";
import CloseIcon from "@material-ui/icons/Close";
import Message from "./Message";
import { getChatForPopUpView } from "../../functions/chat";
import { isAuthenticated } from "../../functions/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import DisplaySize from "../../customHooks/DisplaySize";
import CloseFullScreenIcon from "@material-ui/icons/FullscreenExit";

const ChatPopUp = ({ loggedInUserInfo, userData, setChatPopUp, chatPopUp }) => {
  const { token } = isAuthenticated();
  const userId = isAuthenticated().user._id;
  const ref = useRef(null);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const dispatch = useDispatch();
  const { chats, chatPopUpMinimized, mode } = useSelector((state) => ({
    ...state,
  }));
  const newChat = [];

  useEffect(() => {
    setLoading(true);

    getChatForPopUpView(token, userId, userData._id).then((response) => {
      setChatData(response.data);
      console.log(response.data, "chat data");
      newChat.push(response.data);
      dispatch({
        type: "ADD_CHAT",
        payload: newChat,
      });
      dispatch({
        type: "SET_CHAT_POP_UP",
        payload: true,
      });

      setLoading(false);
      ref.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [chatPopUp]);

  const displaySize = DisplaySize();

  const handleChatPopUp = () => {
    // setChatPopUp(false);
    dispatch({
      type: "SET_CHAT_POP_UP",
      payload: false,
    });

    dispatch({
      type: "SET_SELECTED_USER_DATA",
      payload: {},
    });
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
    dispatch({
      type: "SET_CHAT_MINIMIZED",
      payload: true,
    });

    // dispatch({
    //   type: "SET_CHAT_POP_UP",
    //   payload: false,
    // });
  };

  const openMinimizedChat = () => {
    dispatch({
      type: "SET_CHAT_POP_UP",
      payload: true,
    });
    ref.current?.scrollIntoView({ behavior: "smooth" });
    dispatch({
      type: "SET_CHAT_MINIMIZED",
      payload: false,
    });
  };

  return (
    <>
      {!chatPopUpMinimized && (
        <div
          style={
            mode === "dark"
              ? { backgroundColor: "#242526" }
              : { backgroundColor: "#f0f2f5" }
          }
          className={
            displaySize.width > 700 ? "pop-up-main" : "pop-up-main-full-width"
          }
        >
          {chatData.length > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6px",
                  marginLeft: "6px",
                }}
              >
                {userData?.profilePhoto?.length > 1 ? (
                  <Avatar
                    size={40}
                    src={
                      userData?.profilePhoto[userData.profilePhoto.length - 1]
                        .url
                    }
                  />
                ) : (
                  <Avatar style={{ backgroundColor: "blue" }} size={40}>
                    {userData?.firstName?.slice(0, 1)}
                  </Avatar>
                )}
                <div style={{ fontWeight: "bold", marginLeft: "5px" }}>
                  {" "}
                  {userData?.firstName + " " + userData?.lastName}
                </div>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "25%",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={handleMinimize}
                    style={{
                      marginRight: "10%",
                    }}
                  >
                    <CloseFullScreenIcon />
                  </div>
                  <div style={{ marginRight: "10%" }} onClick={handleChatPopUp}>
                    <CloseIcon />
                  </div>
                </span>
              </div>
              <div
                style={
                  displaySize.width > 700
                    ? { height: "58vh", overflowY: "auto" }
                    : { height: "85vh", overflowY: "auto" }
                }
              >
                {chatData.length > 0
                  ? chats.map((chat, i) =>
                      chat.map((c, j) => (
                        <span ref={ref} key={j + i}>
                          <Message
                            isNew={false}
                            mode={mode}
                            message={c}
                            own={userId === c?.senderId?._id}
                          />
                        </span>
                      ))
                    )
                  : "no chat"}
              </div>
              <span className="chat-main-input">
                <input
                  style={
                    mode === "dark"
                      ? {
                          backgroundColor: "#3a3b3c",
                          width: "98%",
                          height: "30px",
                        }
                      : {
                          backgroundColor: "#fff",
                          width: "98%",
                          height: "30px",
                        }
                  }
                  type="text"
                  placeholder="Aa"
                  autoFocus
                />
              </span>
            </>
          ) : chatData.length <= 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6px",
                  marginLeft: "6px",
                }}
              >
                {userData?.profilePhoto?.length > 1 ? (
                  <Avatar
                    size={40}
                    src={
                      userData?.profilePhoto[userData.profilePhoto.length - 1]
                        .url
                    }
                  />
                ) : (
                  <Avatar style={{ backgroundColor: "blue" }} size={40}>
                    {userData?.firstName?.slice(0, 1)}
                  </Avatar>
                )}
                <div style={{ fontWeight: "bold", marginLeft: "5px" }}>
                  {" "}
                  {userData?.firstName + " " + userData?.lastName}
                </div>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "25%",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={handleMinimize}
                    style={{
                      marginRight: "10%",
                    }}
                  >
                    <CloseFullScreenIcon />
                  </div>
                  <div style={{ marginRight: "10%" }} onClick={handleChatPopUp}>
                    <CloseIcon />
                  </div>
                </span>
              </div>
              <div
                style={
                  displaySize.width > 700
                    ? { height: "58vh", overflowY: "auto" }
                    : { height: "85vh", overflowY: "auto" }
                }
              >
                <Message mode={mode} selectedFriend={userData} isNew={true} />
              </div>

              <span className="chat-main-input">
                <input
                  style={
                    mode === "dark"
                      ? {
                          backgroundColor: "#3a3b3c",
                          width: "98%",
                          height: "30px",
                        }
                      : {
                          backgroundColor: "#fff",
                          width: "98%",
                          height: "30px",
                        }
                  }
                  type="text"
                  placeholder="Aa"
                  autoFocus
                />
              </span>
            </>
          ) : (
            loading && <h2>loading...</h2>
          )}
        </div>
      )}

      {chatPopUpMinimized && (
        <div
          onClick={openMinimizedChat}
          style={{ cursor: "pointer" }}
          className="minimizedView"
        >
          {userData?.profilePhoto?.length > 1 ? (
            <Avatar
              size={52}
              src={userData?.profilePhoto[userData.profilePhoto.length - 1].url}
            />
          ) : (
            <Avatar style={{ backgroundColor: "blue" }} size={52}>
              {userData?.firstName?.slice(0, 1)}
            </Avatar>
          )}
        </div>
      )}
    </>
  );
};

export default ChatPopUp;

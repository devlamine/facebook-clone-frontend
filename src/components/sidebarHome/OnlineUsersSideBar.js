import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../functions/auth";
import { Avatar, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./sideBar.css";
import ChatPopUp from "../chats/ChatPopUp";
import { useState } from "react";
import { getChatForPopUpView } from "../../functions/chat";

const OnlineUsersSideBar = () => {
  const [loading, setLoading] = useState(true);
  const [enablePopUp, setEnablePopUp] = useState(false);
  const { onlineUsersRedux, mode } = useSelector((state) => ({ ...state }));
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const dispatch = useDispatch();
  const { token } = isAuthenticated();

  if (mode === "light") {
    document.body.style.backgroundColor = "#f0f2f5";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#012243";
    document.body.style.color = "white";
  }

  const handleChat = (user) => {
    setLoading(true);
    let newChat = [];
    getChatForPopUpView(token, userId, user._id).then((response) => {
      newChat.push(response.data);
      dispatch({
        type: "ADD_CHAT",
        payload: newChat,
      });
      dispatch({
        type: "SET_CHAT_POP_UP",
        payload: true,
      });
      dispatch({
        type: "SET_SELECTED_USER_DATA",
        payload: user,
      });

      setLoading(false);
    });
  };

  return (
    <div className={mode === "dark" ? "nightMode" : "lightMode"}>
      {onlineUsersRedux?.length > 0 ? (
        <>
          <p style={{ fontSize: "18px" }}>Contacts</p>
          {onlineUsersRedux?.map((onlineUser, i) => (
            <div key={i}>
              {onlineUser._id !== userId && (
                <div
                  onClick={() => handleChat(onlineUser)}
                  className="conversationProfile"
                  style={{ padding: "7px" }}
                >
                  {" "}
                  <span style={{ position: "relative" }}>
                    {onlineUser.profilePhoto.length > 0 ? (
                      <Avatar
                        size={35}
                        src={
                          onlineUser.profilePhoto[
                            onlineUser.profilePhoto.length - 1
                          ].url
                        }
                      ></Avatar>
                    ) : (
                      <Avatar style={{ backgroundColor: "blue" }} size={35}>
                        {onlineUser.firstName.slice(0, 1).toUpperCase()}
                      </Avatar>
                    )}

                    <span
                      style={
                        mode === "dark"
                          ? { border: "2px solid  rgb(0, 21, 41)" }
                          : { border: "2px solid white" }
                      }
                      className="online-side-home"
                    ></span>
                  </span>
                  <b style={{ padding: "5px" }}>
                    {onlineUser.firstName + " " + onlineUser.lastName}
                  </b>
                </div>
              )}
            </div>
          ))}
        </>
      ) : !onlineUsersRedux.allUsersOfline ? (
        <Spin className="text-center p-5 m-5" indicator={<LoadingOutlined />} />
      ) : (
        onlineUsersRedux.allUsersOfline && <span></span>
      )}
    </div>
  );
};

export default OnlineUsersSideBar;

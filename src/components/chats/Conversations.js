import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../functions/auth";
import { getChatsByConId } from "../../functions/chat";
import "./chat.css";

const Conversations = ({
  conversation,
  selectedConversation,
  setSelectedConversation,
  onlineUsers,
  setTotalPagesForChat,
  currentLimitForChat,
  currentPageForChat,
}) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const { mode } = useSelector((state) => ({ ...state }));

  const openConversation = (conversation) => {
    getChatsByConId(
      isAuthenticated().token,
      conversation._id,
      currentPageForChat,
      currentLimitForChat
    ).then((res) => {
      // console.log("this is clicked conversation---->", res.data);
      setSelectedConversation(res.data.chat);
      setTotalPagesForChat(res.data.totalPages);
    });
  };

  useEffect(() => {
    conversation.map((con) => {
      //console.log("conversations are here-->", con);
    });
  }, [conversation]);

  return (
    <div className="onlineUsersMd">
      <div className="con-div" style={{ height: "89.5vh" }}>
        <div
          className="chats-hide"
          style={{ fontSize: "25px", fontWeight: "bold" }}
        >
          Chats
        </div>
        <div>
          <hr className="chats-hide" />
          {conversation.length > 0 &&
            conversation.map((con) => (
              <div
                key={con._id}
                onClick={() => openConversation(con)}
                className="conversationProfile"
              >
                <span style={{ position: "relative" }}>
                  {onlineUsers.map((user) => {
                    if (user.userId === con?.receiverUserId?._id) {
                      return (
                        <span
                          style={
                            mode === "dark"
                              ? { border: "2px solid  rgb(0, 21, 41)" }
                              : { border: "2px solid white" }
                          }
                          className="online"
                        ></span>
                      );
                    }
                  })}
                  {con.receiverUserId.profilePhoto.length > 0 &&
                  con.senderUserId.profilePhoto.length !== 0 &&
                  con.receiverUserId.profilePhoto.length !== 0 ? (
                    <Avatar
                      src={
                        userId === con.receiverUserId._id
                          ? con.senderUserId.profilePhoto[
                              con.senderUserId.profilePhoto.length - 1
                            ]?.url
                          : con.receiverUserId.profilePhoto[
                              con.receiverUserId.profilePhoto.length - 1
                            ]?.url
                      }
                      size={55}
                      style={{ marginRight: "13px" }}
                    ></Avatar>
                  ) : (
                    <span>
                      <Avatar
                        style={{ margin: "10px", backgroundColor: "blue" }}
                        size={50}
                      >
                        {con.receiverUserId.firstName.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </span>
                  )}
                </span>
                <div>
                  <div>
                    {userId === con.receiverUserId._id
                      ? con.senderUserId.firstName +
                        " " +
                        con.senderUserId.lastName
                      : con.receiverUserId.firstName +
                        " " +
                        con.receiverUserId.lastName}
                  </div>

                  <div className="chats-hide">
                    Okay .{" "}
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      7h
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Conversations;

import React, { useEffect, useState } from "react";
import ChatMain from "../components/chats/ChatMain";
import ChattingUserInfo from "../components/chats/ChattingUserInfo";
import Conversations from "../components/chats/Conversations";
import NavBar from "../components/nav/NavBar";
import { useSelector } from "react-redux";
import { getConversation } from "../functions/chat";
import { isAuthenticated } from "../functions/auth";
import "./chatMd.css";

const Chat = () => {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { mode } = useSelector((state) => ({ ...state }));
  if (mode === "light") {
    document.body.style.backgroundColor = "rgb(240, 242, 245)";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#1a1a1a";
    document.body.style.color = "white";
  }

  useEffect(() => {
    loadAllConversations();
  }, []);

  const loadAllConversations = () => {
    getConversation(token, userId).then((res) => {
      console.log(res.data);
      setConversation(res.data);
    });
  };
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="row">
        <div className="col-md-3">
          <Conversations
            conversation={conversation}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            onlineUsers={onlineUsers}
          />
        </div>
        <div className="col-md-6">
          <ChatMain
            selectedConversation={selectedConversation}
            SetselectedConversation={setSelectedConversation}
            conversations={conversation}
            onlineUsers={onlineUsers}
            setOnlineUsers={setOnlineUsers}
            mode={mode}
          />
        </div>
        <div className="col-md-3 chats-hide">
          <ChattingUserInfo />
        </div>
      </div>
    </>
  );
};

export default Chat;

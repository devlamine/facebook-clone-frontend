import React, { useEffect, useRef, useState } from "react";
import { isAuthenticated } from "../../functions/auth";
import { postNewMsg } from "../../functions/chat";
import { io } from "socket.io-client";
import Message from "./Message";
import { Avatar, Badge } from "antd";
import VideocamIcon from "@material-ui/icons/Videocam";
import tone from "../../mp3/google-duo-best-ringtone-36698.mp3";
import newMsgTone from "../../mp3/Messenger - Notification Tone.mp3";
import Peer from "simple-peer";
import { useSelector } from "react-redux";

const ChatMain = ({
  selectedConversation,
  SetselectedConversation,
  conversations,
  onlineUsers,
  setOnlineUsers,
  mode,
}) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const user = isAuthenticated()?.user;
  const token = isAuthenticated()?.token;
  const [messages, setMessages] = useState("");
  const [newMessages, setNewMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [selectedFrndId, setSelectedFrndId] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);

  const [enable, setEnable] = useState(false);
  const [ioReload, setIoReload] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const [videoStream, setVideoStream] = useState(null); //for incomming user
  const [checkStatus, setCheckStatus] = useState(false);
  const [videoStatus, setVideoStatus] = useState(false);

  const socket = useRef();

  const ref = useRef(null);
  const streamData = useRef(null);
  const incommingVideo = useRef(null);
  const toneRef = useRef(null);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const msgRef = useRef();

  let requiredInfo = {};

  // const { onlineUsersRedux } = useSelector((state) => ({ ...state }));
  // setOnlineUsers(onlineUsersRedux);

  const receverId = () => {
    const rcId = selectedConversation.filter((u) => u.senderId?._id !== userId);
    return rcId[0]?.senderId._id;
  };

  const senderId = () => {
    const rcId = selectedConversation.filter((u) => u.senderId?._id === userId);
    return rcId[0]?.senderId._id;
  };

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket.current.on("getMessage", ({ receiverId, senderId, text }) => {
      console.log("getMessage--->", receiverId, senderId, text);
      setArrivalMessage({
        senderId: senderId,
        text: text,
        createdAt: Date.now(),
        receiverId: receiverId,
      });

      setIoReload(!ioReload);
    });
    answerVideoCall();
  }, []);

  useEffect(() => {
    const newMsg = {
      senderId: {
        firstName: userFirstName,
        lastName: userLastName,
        profilePhoto: userProfiles,
        _id: selectedFrndId,
      },
      text: arrivalMessage?.text,
      createdAt: Date.now(),
    };
    // console.log("newMsg", arrivalMessage);

    if (arrivalMessage?.senderId === receverId()) {
      console.log("newMsg--->", newMsg);
      SetselectedConversation((pre) => [...pre, newMsg]);
      msgRef?.current?.play();
    }
  }, [arrivalMessage]);

  useEffect(() => {
    getUserInfo();
    // socket.current.emit("messageToActualUser", receverId());
    ref.current?.scrollIntoView({ behavior: "smooth" });
    // console.log("selectedConversation", selectedConversation);
  }, [messages, enable, ioReload, selectedConversation]);

  // useEffect(() => {
  //   //console.log("this is selectd con-->", selectedConversation);
  // }, [arrivalMessage, selectedConversation, messages]);

  // console.log("this is selected conversation-->", selectedConversation);

  const checkOnlineUsers = () => {
    onlineUsers.map((user) => {
      selectedConversation.map((con) => {
        if (user.userId === con.senderId?._id) {
          return <span className="online"></span>;
        }
      });
    });
  };

  const getUserInfo = () => {
    let loggedInUser = isAuthenticated().user;
    loggedInUser.email = "";
    loggedInUser.isAdmin = "";

    requiredInfo = loggedInUser;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: receverId(),
      text: messages,
    }); //send message to socket server

    postNewMsg(
      token,
      selectedConversation[0].conversationId,
      userId,
      messages
    ).then((res) => {
      res.data.senderId = requiredInfo;
      SetselectedConversation((pre) => [...pre, res.data]);
      setEnable(!enable);
    });
    setMessages("");
  };

  useEffect(() => {
    userFullName();
  }, [selectedConversation]);

  const userFullName = () => {
    const selectedUser = selectedConversation.filter(
      (u) => u.senderId?._id !== userId
    );
    setUserName(
      selectedUser[0]?.senderId?.firstName +
        " " +
        selectedUser[0]?.senderId?.lastName
    );

    setSelectedFrndId(selectedUser[0]?.senderId?._id);

    setUserFirstName(selectedUser[0]?.senderId?.firstName);
    setUserLastName(selectedUser[0]?.senderId?.lastName);

    setUserImage(
      selectedUser[0]?.senderId?.profilePhoto[
        selectedUser[0]?.senderId?.profilePhoto.length - 1
      ]?.url
    );

    setUserProfiles(selectedUser[0]?.senderId?.profilePhoto);
  };

  //video call section

  const answerVideoCall = async () => {};

  const stopNavigator = () => {
    toneRef?.current?.pause();
    // connectionRef.current.destroy();
    // if (!checkStatus) {
    let currentStream =
      streamData && streamData.current && streamData.current.srcObject;
    currentStream?.getTracks().forEach((track) => {
      track.stop();
    });
    //}
  };

  const handleVideoCall = () => {
    setVideoStatus(true);
    if (!checkStatus) {
      sendVideoCall();
    } else {
      setVideoStatus(true);
      stopNavigator();
      setVideoStatus(false);
    }
    setCheckStatus(!checkStatus);
  };

  const sendVideoCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
    toneRef.current.src = tone;
    toneRef.current.play();
    streamData.current.srcObject = stream;
  };

  return (
    <div>
      <audio ref={msgRef} src={newMsgTone} hidden></audio>
      {callAccepted && "ringing..."}
      {stream && videoStatus && (
        <>
          <p
            style={{
              position: "absolute",
              top: "87%",
              right: "9%",
              zIndex: "5",
              fontSize: "18px",
              color: "white",
            }}
          >
            Calling...
          </p>
          <video
            ref={userVideo}
            autoPlay
            style={{
              position: "absolute",
              height: "100px",
              right: "1%",
              top: "5%",
              zIndex: "10",
            }}
          />
          <video
            className="myVideo"
            ref={streamData}
            draggable={true}
            autoPlay
            muted
            style={{
              position: "absolute",
              height: "200px",
              right: "1%",
              top: "300px",
            }}
          />
        </>
      )}
      <audio hidden ref={toneRef} loop />
      {selectedConversation.length > 1 ? (
        <>
          <div
            style={
              mode === "light"
                ? { backgroundColor: "white", color: "black", height: "89.5vh" }
                : { backgroundColor: "#001529", height: "89.5vh" }
            }
          >
            <div className="chat-main-user">
              <div
                style={
                  mode === "light"
                    ? { backgroundColor: "white", color: "black" }
                    : { backgroundColor: "blue", color: "white" }
                }
                className="chat-main-user-profile"
              >
                <span style={{ position: "relative" }}>
                  {checkOnlineUsers()}
                  <Avatar size={50} src={userImage} alt="profile" />
                </span>

                <div>
                  <div
                    className="m-2"
                    style={{
                      lineHeight: "0.3",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {userName}
                  </div>
                  <span className="m-2">Active 2m ago</span>
                </div>
                <span>
                  {" "}
                  <VideocamIcon
                    onClick={handleVideoCall}
                    style={{ marginLeft: "50%", cursor: "pointer" }}
                  />
                </span>
              </div>
              <div className="chat-main-messages">
                {selectedConversation.map((message, i) => (
                  <span ref={ref} key={i}>
                    <Message
                      message={message}
                      own={userId === message?.senderId?._id}
                      mode={mode}
                    />
                  </span>
                ))}
              </div>
              <div className="chat-main-input" style={{ height: "10.5vh" }}>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Aa"
                    onChange={(e) => setMessages(e.target.value)}
                    value={messages}
                    autoFocus={true}
                  />
                  <input type="submit" hidden />
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="no-chat">Select a conversation from the list</div>
      )}
    </div>
  );
};

export default ChatMain;

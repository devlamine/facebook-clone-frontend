import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import SideBar from "../components/nav/SideBar";
import WhatsInYourMind from "../components/WhatsInYourMind";
import Post from "../components/Post";
import NavBar from "../components/nav/NavBar";
import { isAuthenticated } from "../functions/auth";
import { Link, useHistory } from "react-router-dom";
import { fetchPosts } from "../functions/post";
import {
  getAllOnlineUsers,
  getBirthdaysInfo,
  getUser,
} from "../functions/user";
import { Spin } from "antd";
import birthDayLogo from "../Images/birthdaylogo.png";
import StoryHome from "../components/story/StoryHome";
import OnlineUsersSideBar from "../components/sidebarHome/OnlineUsersSideBar";
import FriendRestHome from "../components/sidebarHome/FriendRestHome";
import "./home.css";

const Home = () => {
  const history = useHistory();
  const socket = useRef();
  const { mode } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reFetchPosts, setReFetchPosts] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  const token = isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
    socket.current.emit("addUser", userId);
    getOnlineUsersTest();
  }, []);

  useEffect(() => {
    getUser(token, userId).then((res) => {
      setLoggedInUser(res.data);
      dispatch({
        type: "SET_USER_REQUEST",
        payload: res.data.friendRequests,
      });
    });

    //return () => getOnlineUsers();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated()) {
      history.push("/login");
    } else {
      fetchPosts(token)
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        })
        .catch((err) => console.log("Failed to load posts"));
    }
  }, [reFetchPosts]);

  const getOnlineUsersTest = () => {
    socket.current.on("getUsers", (users) => {
      if (users.length > 0) {
        getAllOnlineUsers(token, users, userId).then((res) => {
          if (res.data) {
            dispatch({ type: "SET_ONLINE_USERS", payload: res.data });
          }
        });
      }
    });
  };

  // useEffect(() => {
  //   getBirthdaysInfo(token, userId).then((res) => console.log(res.data));
  // }, []);

  if (mode === "light") {
    document.body.style.backgroundColor = "#f0f2f5";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#012243";
    document.body.style.color = "white";
  }

  return (
    <>
      <NavBar />

      <div className="container p-0 m-0">
        <div className="row">
          <div className="col-md-3 position-fixed" style={{ zIndex: "2" }}>
            <SideBar />
          </div>
          <div className="col-md-4"></div>
          {!loading ? (
            <div className="col-md-7">
              <StoryHome />

              <WhatsInYourMind
                mode={mode}
                visible={visible}
                setVisible={setVisible}
                setReFetchPosts={setReFetchPosts}
                from="home"
              />
              {posts.length >= 1 ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    post={post}
                    mode={mode}
                    selectedUserId={null}
                  />
                ))
              ) : (
                <h4
                  style={
                    mode === "light" ? { color: "black" } : { color: "white" }
                  }
                  className="my-5 py-5"
                >
                  Looks like your friend list is empty. Start adding friends to
                  see their posts.
                  <p>
                    <Link to={`/friends/suggestions/${userId}`}>
                      Click here to add friends.
                    </Link>
                  </p>
                </h4>
              )}
            </div>
          ) : (
            <Spin
              style={{ margin: "100px", marginTop: "20%" }}
              tip="Loading posts..."
            />
          )}

          <div
            className={
              mode === "dark"
                ? "col-md-3 position-fixed top-0 end-0 dark-mode-sidebar"
                : "col-md-3 position-fixed top-0 end-0 light-mode-sidebar"
            }
            style={{
              zIndex: "5",
              height: "100vh",
              width: "25%",
              paddingTop: "75px",
            }}
          >
            <h5 className="text-muted">Birthdays</h5>
            <div className="d-flex">
              <img
                className="mx-2"
                src={birthDayLogo}
                alt="birthday logo"
                height="35px"
              />
              <p>
                <b>Raj Pansuriya</b> and <b>Mohit Jain</b> have their birthdays
                today.
              </p>
            </div>

            {/* <hr /> */}
            <FriendRestHome />
            <OnlineUsersSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

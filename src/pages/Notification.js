import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../functions/auth";
import { confirmFriendRst, declineFriendRst, getUser } from "../functions/user";
import "./notification.css";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";
import FriendRequest from "../components/notifications/FriendRequest";

const Notification = () => {
  const { mode } = useSelector((state) => ({ ...state }));
  const [friendRequests, setfriendRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);

  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;
  const currentUser = isAuthenticated().user;

  const loggedInUserName = currentUser.firstName + " " + currentUser.lastName;

  useEffect(() => {
    setLoading(true);
    getUser(token, userId).then((res) => {
      setfriendRequests(res.data.friendRequests);
      setNotifications(res.data.notifications.reverse());
      setLoading(false);
    });
  }, [runUseEffect]);

  const handleFriendRequest = (confimedRstId, userName) => {
    confirmFriendRst(
      token,
      userId,
      confimedRstId,
      userName,
      loggedInUserName
    ).then((res) => setRunUseEffect(true));
  };

  const decilneFrndRequest = (requestedUserId) => {
    declineFriendRst(token, userId, requestedUserId).then((res) => {
      setfriendRequests(res.data.friendRequests);
    });
  };
  return (
    <div className={mode === "light" ? "popup-main-light" : "popup-main-dark"}>
      {loading ? (
        <Spin className="text-center p-5 m-5" indicator={<LoadingOutlined />} />
      ) : (
        <>
          {friendRequests.length > 0 &&
            friendRequests.map((u, i) => (
              <div className="p-4 notification" key={i}>
                <FriendRequest
                  u={u}
                  decilneFrndRequest={decilneFrndRequest}
                  handleFriendRequest={handleFriendRequest}
                />
              </div>
            ))}
          {notifications.map((notification, i) => (
            <div className="notification p-2" key={i}>
              <Link
                style={
                  mode === "light" ? { color: "black" } : { color: "white" }
                }
                to={`/timeline/${notification.friendId}`}
              >
                <ul>
                  <li> {notification.message}</li>
                  <p className="text-muted">
                    <TimeAgo datetime={notification.created} />
                  </p>
                </ul>
              </Link>
            </div>
          ))}
          {notifications.length === 0 && friendRequests.length === 0 && (
            <p className="text-center my-5 py-5">You have no notifications</p>
          )}
        </>
      )}
    </div>
  );
};

export default Notification;

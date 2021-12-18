import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../../functions/auth";
import {
  confirmFriendRst,
  declineFriendRst,
  getUser,
} from "../../functions/user";
import FriendRequest from "../notifications/FriendRequest";
const FriendRestHome = () => {
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const { firstName, lastName } = isAuthenticated() && isAuthenticated().user;
  const [friendRequests, setfriendRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);

  const loggedInUserName = firstName + " " + lastName;

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
    <>
      {friendRequests.length > 0 &&
        friendRequests.map((u, i) => (
          <div className="p-2 notification" key={i}>
            <FriendRequest
              u={u}
              decilneFrndRequest={decilneFrndRequest}
              handleFriendRequest={handleFriendRequest}
            />
          </div>
        ))}
    </>
  );
};

export default FriendRestHome;

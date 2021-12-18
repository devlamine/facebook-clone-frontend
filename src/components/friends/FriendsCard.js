import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { isAuthenticated } from "../../functions/auth";
import {
  addToFriendList,
  confirmFriendRst,
  removeFriendRequest,
  unFriend,
} from "../../functions/user";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FriendsCard = ({ f, userIdParams, setRunUseEffect, from }) => {
  const { mode } = useSelector((state) => ({ ...state }));
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;
  const loggedInUser = isAuthenticated().user;
  const [AddedFriend, setAddedFriend] = useState(false);
  const userName = f.firstName + " " + f.lastName;
  const loggedInUserName = loggedInUser.firstName + " " + loggedInUser.lastName;

  const checkFriendRstSent = (f) => {
    const match = f?.friendRequests?.find((friendId) => {
      return friendId === userId;
    });

    return match;
  };
  useEffect(() => {
    let addedToFrndList = checkFriendRstSent(f);
    setAddedFriend(addedToFrndList);
  }, []);

  const handleAddFriend = (selectedFriendId) => {
    addToFriendList(token, userIdParams, selectedFriendId).then((res) => {
      setAddedFriend(!AddedFriend);
      setRunUseEffect(true);
    });
  };

  const handleUnfiend = (selectedFriendId) => {
    unFriend(token, userId, selectedFriendId).then((res) =>
      setRunUseEffect(true)
    );
  };

  const handleReqestAccept = (confimedRstId) => {
    confirmFriendRst(
      token,
      userId,
      confimedRstId,
      userName,
      loggedInUserName
    ).then((res) => setRunUseEffect(true));
  };

  const handleCancleRequest = (cancelRequestId) => {
    removeFriendRequest(token, userId, cancelRequestId).then((res) =>
      setRunUseEffect(false)
    );
  };

  return (
    <>
      <Link
        style={mode === "light" ? { color: "black" } : { color: "white" }}
        to={`/timeline/${f._id}`}
      >
        {f.profilePhoto.length >= 1 ? (
          <img
            src={f.profilePhoto[f.profilePhoto.length - 1].url}
            alt="user profile"
          />
        ) : (
          <span style={{ marginTop: "20px" }}>
            <Avatar
              size={220}
              shape="square"
              style={{ backgroundColor: "blue" }}
            >
              <p style={{ fontSize: "100px" }}>
                {f.firstName && f.firstName.slice(0, 1)}
              </p>
            </Avatar>
          </span>
        )}
        <p className="user-name my-2">{f.firstName + " " + f.lastName}</p>
      </Link>
      {from === "suggestions" &&
        (!AddedFriend ? (
          <span>
            <div
              onClick={() => handleAddFriend(f._id)}
              className="btn btn-primary d-block m-1"
            >
              Add Friend
            </div>
            <div className="btn btn-secondary d-block m-1">Remove</div>
          </span>
        ) : (
          <>
            <p>Request sent</p>
            <div
              onClick={() => handleCancleRequest(f._id)}
              className="btn btn-secondary d-block m-1 my-3"
            >
              Cancel
            </div>
          </>
        ))}
      {from === "listOfFriends" && (
        <div
          onClick={() => handleUnfiend(f._id)}
          className="d-block btn btn-secondary"
        >
          Unfriend
        </div>
      )}
      {from === "friendRequests" && (
        <span>
          <div
            onClick={() => handleReqestAccept(f._id)}
            className="btn btn-primary d-block m-1"
          >
            Confirm
          </div>
          <div className="btn btn-secondary d-block m-1">Delete</div>
        </span>
      )}
    </>
  );
};

export default FriendsCard;

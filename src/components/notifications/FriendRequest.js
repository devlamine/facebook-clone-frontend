import React from "react";
import { isAuthenticated } from "../../functions/auth";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
const FriendRequest = ({ u, handleFriendRequest, decilneFrndRequest }) => {
  const userId = isAuthenticated().user._id;
  return (
    <>
      <p>
        <b>{u.firstName + " " + u.lastName + " "}</b>
        has sent you friend request
      </p>
      <span>
        <Link to={`friends/home/${userId}`}>
          {u.profilePhoto.length >= 1 ? (
            <Avatar
              className="m-2"
              size={40}
              src={u.profilePhoto[u.profilePhoto.length - 1].url}
            />
          ) : (
            <Avatar size={40} style={{ backgroundColor: "blue" }}>
              {u.firstName.slice(0, 1)}
            </Avatar>
          )}
        </Link>
        <button
          onClick={() =>
            handleFriendRequest(u._id, u.firstName + " " + u.lastName)
          }
          className="btn btn-primary btn-sm m-2"
        >
          Confirm
        </button>
        <button
          onClick={() => decilneFrndRequest(u._id)}
          className="btn btn-secondary btn-sm"
        >
          Delete
        </button>
      </span>
    </>
  );
};

export default FriendRequest;

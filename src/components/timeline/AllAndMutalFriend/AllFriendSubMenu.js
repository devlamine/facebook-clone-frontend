import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../../functions/auth";
import { getUser } from "../../../functions/user";

const AllFriendSubMenu = ({ mode, friendsMenu, userData, setRunUseEffect }) => {
  const history = useHistory();
  const [loggedInUserFriends, setLoggedInUserFriends] = useState([]);
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;

  //fething current user to check their friends
  useEffect(() => {
    getUser(token, userId).then((res) =>
      setLoggedInUserFriends(res.data.friends)
    );
  }, []);

  //mathching friendList of loggedInUser and onPage user

  const compareFriendLists = (IdOfOnPageUser) => {
    let match = loggedInUserFriends.find(
      (friendOfLoggedInUser) => friendOfLoggedInUser._id === IdOfOnPageUser
    );
    return match;
  };
  const redirectToTimeline = (id) => {
    history.push(`/timeline/${id}`);
    setRunUseEffect(true);
  };
  return (
    <div>
      {friendsMenu.AllFriends && (
        <div className="row">
          {userData.friends.map((friend, i) => (
            <div className="col-md-6" key={i}>
              <span
                className="mx-4 my-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => redirectToTimeline(friend._id)}
                >
                  {friend.profilePhoto.length >= 1 ? (
                    <Avatar
                      size={50}
                      shape="square"
                      style={{ marginRight: "3px" }}
                      src={
                        friend.profilePhoto[friend.profilePhoto.length - 1].url
                      }
                    />
                  ) : (
                    <Avatar
                      size={50}
                      shape="square"
                      style={{ backgroundColor: "blue", marginRight: "3px" }}
                    >
                      {userData.firstName.slice(0, 1)}
                    </Avatar>
                  )}
                </span>
                <p
                  style={{
                    fontSize: "17px",
                    marginRight: "0px",
                    marginTop: "15px",
                  }}
                >
                  {friend.firstName + " " + friend.lastName}
                  {!compareFriendLists(friend._id) ? (
                    <span className="btn btn-primary btn-sm mx-2">
                      Add Friend
                    </span>
                  ) : (
                    <span
                      className="px-5"
                      style={{ fontSize: "40px", cursor: "pointer" }}
                    >
                      ...
                    </span>
                  )}
                </p>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFriendSubMenu;

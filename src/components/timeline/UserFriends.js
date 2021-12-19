import React, { useState } from "react";
import AllFriendSubMenu from "./AllAndMutalFriend/AllFriendSubMenu";

const UserFriends = ({ linkActive, mode, userData, setRunUseEffect }) => {
  const [friendMenu, setFriendMenu] = useState({
    AllFriends: true,
    mutualFriends: false,
  });
  const handleSubMenuFrnd = (active) => {
    if (active === "Allfriends") {
      setFriendMenu({ ...friendMenu, AllFriends: true, mutualFriends: false });
    } else {
      setFriendMenu({ ...friendMenu, AllFriends: false, mutualFriends: true });
    }
  };
  return (
    <div>
      {linkActive.friends && (
        <div
          style={
            mode === "dark"
              ? { backgroundColor: "#242526" }
              : { backgroundColor: "white" }
          }
          className="col-md-8 offset-md-2 photos-bg"
        >
          <ul className="sub-menu-friends">
            <li
              style={
                (friendMenu.AllFriends && { color: "blue" }) ||
                (mode === "dark" &&
                  friendMenu.AllFriends && { color: "blue" }) ||
                (!friendMenu.AllFriends &&
                  mode === "dark" && { color: "white" }) ||
                (!friendMenu.AllFriends &&
                  mode === "light" && { color: "black" })
              }
              onClick={() => handleSubMenuFrnd("Allfriends")}
            >
              AllFriends
            </li>

            <li
              style={
                (friendMenu.mutualFriends && { color: "blue" }) ||
                (mode === "dark" &&
                  friendMenu.mutualFriends && { color: "blue" }) ||
                (!friendMenu.mutualFriends &&
                  mode === "dark" && { color: "white" }) ||
                (!friendMenu.mutualFriends &&
                  mode === "light" && { color: "black" })
              }
              onClick={() => handleSubMenuFrnd("mutualFriends")}
            >
              Mutual Friends
            </li>
          </ul>
          <AllFriendSubMenu
            mode={mode}
            userData={userData}
            friendsMenu={friendMenu}
            setRunUseEffect={setRunUseEffect}
          />
        </div>
      )}
    </div>
  );
};

export default UserFriends;

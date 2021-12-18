import React from "react";
import SideBarFriends from "../components/friends/SideBarFriends";
import NavBar from "../components/nav/NavBar";

const Friends = () => {
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-md-3 position-fixed" style={{ zIndex: "2" }}>
          <SideBarFriends />
        </div>
        <div className="col-md-3"></div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Friends;

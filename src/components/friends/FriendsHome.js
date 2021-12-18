import React from "react";
import NavBar from "../nav/NavBar";
import SideBarFriends from "./SideBarFriends";
import { useParams } from "react-router-dom";
import FriendRequests from "./FriendRequests";
import { useSelector } from "react-redux";
import Suggestions from "./Suggestions";

const FriendsHome = () => {
  const { userIdParams } = useParams();
  const { mode } = useSelector((state) => ({ ...state }));
  if (mode === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#012243";
    document.body.style.color = "white";
  }
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-md-3 position-fixed" style={{ zIndex: "2" }}>
          <SideBarFriends />
        </div>
        <div className="col-md-3"></div>
        <div className="col">
          <FriendRequests onlyCoreComponents={true} />
          <hr />
          <Suggestions onlyCoreComponents={true} />
        </div>
      </div>
    </div>
  );
};

export default FriendsHome;

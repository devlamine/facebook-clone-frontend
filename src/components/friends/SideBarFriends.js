import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../functions/auth";

const SideBarFriends = () => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/login");
    }
  }, []);
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const { mode } = useSelector((state) => ({ ...state }));

  return (
    <div
      style={
        mode === "dark"
          ? { backgroundColor: "#242526" }
          : { backgroundColor: "rgb(240, 242, 245)" }
      }
      className="sidebar-height sidebar"
    >
      <div>
        <HomeOutlined style={{ marginRight: "7px" }} />
        <Link
          style={mode === "dark" ? { color: "white" } : { color: "black" }}
          to={`/friends/home/${userId}`}
        >
          Home
        </Link>
      </div>
      <div>
        <UserOutlined style={{ marginRight: "7px" }} />
        <Link
          style={mode === "dark" ? { color: "white" } : { color: "black" }}
          to={`/friends/friend-request/${userId}`}
        >
          Friend Requests
        </Link>
      </div>
      <div>
        <UserOutlined style={{ marginRight: "7px" }} />
        <Link
          style={mode === "dark" ? { color: "white" } : { color: "black" }}
          to={`/friends/all-friends/${userId}`}
        >
          All Frinds
        </Link>
      </div>
      <div>
        <UserOutlined style={{ marginRight: "7px" }} />
        <Link
          style={mode === "dark" ? { color: "white" } : { color: "black" }}
          to={`/friends/suggestions/${userId}`}
        >
          Suggestions
        </Link>
      </div>
    </div>
  );
};

export default SideBarFriends;

import React, { useEffect, useState } from "react";
import frndLogo from "../../Images/friends.png";
import eventsLogo from "../../Images/events.png";
import groupsLogo from "../../Images/groups.png";
import jobsLogo from "../../Images/jobs.png";
import marketplaceLogo from "../../Images/marketplace.png";
import memoriesLogo from "../../Images/memories.png";
import pagesLogo from "../../Images/pages.png";
import watchLogo from "../../Images/watch.png";
import { useSelector } from "react-redux";
import "./SideBar.css";
import { Menu, Avatar } from "antd";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import {
  ArrowDownOutlined,
  ImportOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { isAuthenticated } from "../../functions/auth";

const SideBar = () => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/login");
    }
  }, []);
  const [current, setCurrent] = useState("Home");
  const firstName = isAuthenticated() && isAuthenticated().user.firstName;
  const lastName = isAuthenticated() && isAuthenticated().user.lastName;
  const profilePhoto = isAuthenticated() && isAuthenticated().user.profilePhoto;

  const profilePhotoLength = profilePhoto?.length;

  const { mode } = useSelector((state) => ({ ...state }));

  return (
    <div
      className="sidebar-height sidebar"
      style={
        mode === "dark"
          ? { backgroundColor: "#18191a", color: "white" }
          : { backgroundColor: "rgb(240, 242, 245)" }
      }
    >
      <div>
        {isAuthenticated() &&
        isAuthenticated().user.profilePhoto.length >= 1 ? (
          <Avatar
            src={
              isAuthenticated().user?.profilePhoto[profilePhotoLength - 1].url
            }
            size={36}
          />
        ) : (
          <Avatar style={{ backgroundColor: "blue" }}>
            {firstName && firstName.slice(0, 1)}
          </Avatar>
        )}
        <Link
          style={mode === "dark" ? { color: "white" } : { color: "black" }}
          to={`/timeline/${isAuthenticated() && isAuthenticated().user._id}`}
        >
          {" "}
          {firstName + " " + lastName}
        </Link>
      </div>
      <div>
        <img alt="" src={frndLogo} width="30px" />
        <Link
          style={mode === "dark" ? { color: "white" } : { color: "black" }}
          to={`/friends/home/${
            isAuthenticated() && isAuthenticated().user._id
          }`}
        >
          Friends
        </Link>
      </div>
      <div>
        <img src={marketplaceLogo} width="30px" alt="" />
        Market Place
      </div>
      <div>
        <img src={jobsLogo} width="30px" alt="" />
        Jobs
      </div>
      <div>
        <img src={eventsLogo} width="30px" alt="" />
        Events
      </div>

      <div>
        <img src={watchLogo} width="30px" alt="" />
        Watch
      </div>

      <div>
        <img src={pagesLogo} width="30px" alt="" />
        Pages
      </div>

      <div>
        <img src={memoriesLogo} width="30px" alt="" />
        Mermories
      </div>

      <div>
        <img src={groupsLogo} width="30px" alt="" />
        Groups
      </div>
      <div>
        <ArrowDownOutlined />
        Show More
      </div>
    </div>
  );
};

export default SideBar;

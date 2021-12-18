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

const { Item } = Menu;

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

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="sidebar">
      <Menu
        className="sidebar-height"
        selectedKeys={[current]}
        onClick={handleClick}
        mode="inline"
        theme={mode}
      >
        <Item
          key="user"
          icon={
            isAuthenticated() &&
            isAuthenticated().user.profilePhoto.length >= 1 ? (
              <Avatar
                src={
                  isAuthenticated().user?.profilePhoto[profilePhotoLength - 1]
                    .url
                }
                size={36}
              />
            ) : (
              <Avatar style={{ backgroundColor: "blue" }}>
                {firstName && firstName.slice(0, 1)}
              </Avatar>
            )
          }
        >
          <Link
            to={`/timeline/${isAuthenticated() && isAuthenticated().user._id}`}
          >
            {" "}
            {firstName + " " + lastName}
          </Link>
        </Item>
        <Item key="frinds" icon={<img src={frndLogo} width="30px" />}>
          <Link
            to={`/friends/home/${
              isAuthenticated() && isAuthenticated().user._id
            }`}
          >
            Friends
          </Link>
        </Item>
        <Item
          key="marketPlace"
          icon={<img src={marketplaceLogo} width="30px" />}
        >
          Market Place
        </Item>
        <Item key="jobs" icon={<img src={jobsLogo} width="30px" />}>
          Jobs
        </Item>
        <Item key="events" icon={<img src={eventsLogo} width="30px" />}>
          Events
        </Item>

        <Item key="watch" icon={<img src={watchLogo} width="30px" />}>
          Watch
        </Item>

        <Item key="pages" icon={<img src={pagesLogo} width="30px" />}>
          Pages
        </Item>

        <Item key="memories" icon={<img src={memoriesLogo} width="30px" />}>
          Mermories
        </Item>

        <Item key="group" icon={<img src={groupsLogo} width="30px" />}>
          Groups
        </Item>
        <Item className="p-4" icon={<ArrowDownOutlined />} key="button">
          Show More
        </Item>
      </Menu>
    </div>
  );
};

export default SideBar;

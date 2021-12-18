import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Avatar } from "antd";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../functions/auth";

const { Item } = Menu;

const SideBarFriends = () => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/login");
    }
  }, []);
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const [current, setCurrent] = useState("Home");

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
        <Item key="friends" icon={<HomeOutlined />}>
          <Link to={`/friends/home/${userId}`}>Home</Link>
        </Item>
        <Item key="friendRequest" icon={<UserOutlined />}>
          <Link to={`/friends/friend-request/${userId}`}>Friend Requests</Link>
        </Item>
        <Item key="allAfriends" icon={<UserOutlined />}>
          <Link to={`/friends/all-friends/${userId}`}>All Frinds</Link>
        </Item>
        <Item key="suggestions" icon={<UserOutlined />}>
          <Link to={`/friends/suggestions/${userId}`}>Suggestions</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default SideBarFriends;

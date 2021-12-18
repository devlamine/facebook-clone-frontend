import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../functions/auth";
import { getListOfusers } from "../../functions/user";
import NavBar from "../nav/NavBar";
import SideBarFriends from "./SideBarFriends";
import "./friends.css";
import { useSelector } from "react-redux";
import FriendsCard from "./FriendsCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Suggestions = ({ onlyCoreComponents }) => {
  const { userIdParams } = useParams();
  const { mode } = useSelector((state) => ({ ...state }));
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = isAuthenticated().token;
  if (mode === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#012243";
    document.body.style.color = "white";
  }

  useEffect(() => {
    setLoading(true);
    getListOfusers(token, userIdParams).then((res) => {
      setListOfUsers(res.data);
      setLoading(false);
    });
  }, [runUseEffect]);

  const coreComponent = () => {
    return (
      <span>
        <span>
          <p style={{ fontSize: "25px" }}>People you may know</p>
        </span>
        <div className="row">
          {loading ? (
            <Spin className="my-5 py-5" indicator={<LoadingOutlined />} />
          ) : (
            listOfUsers.map((f) => (
              <div
                style={
                  mode === "dark"
                    ? { backgroundColor: "#001529" }
                    : { backgroundColor: "white" }
                }
                key={f._id}
                className="col-md-3 friend-list-card"
              >
                <FriendsCard
                  f={f}
                  setRunUseEffect={setRunUseEffect}
                  userIdParams={userIdParams}
                  from="suggestions"
                />
              </div>
            ))
          )}
        </div>
      </span>
    );
  };

  if (onlyCoreComponents) {
    return coreComponent();
  } else {
    return (
      <div>
        <NavBar />
        <div className="row">
          <div className="col-md-3 position-fixed" style={{ zIndex: "2" }}>
            <SideBarFriends />
          </div>
          <div className="col-md-3"></div>
          <div className="col">{coreComponent()}</div>
        </div>
      </div>
    );
  }
};

export default Suggestions;

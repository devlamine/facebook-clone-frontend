import React, { useEffect, useState } from "react";
import NavBar from "../nav/NavBar";
import SideBarFriends from "./SideBarFriends";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FriendsCard from "./FriendsCard";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../functions/auth";
import { getUser } from "../../functions/user";

const FriendRequests = ({ onlyCoreComponents }) => {
  const { userIdParams } = useParams();
  const { mode } = useSelector((state) => ({ ...state }));
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;

  const [runUseEffect, setRunUseEffect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  if (mode === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#012243";
    document.body.style.color = "white";
  }

  useEffect(() => {
    setLoading(true);
    getUser(token, userId).then((res) => {
      setFriendRequests(res.data.friendRequests);
      setLoading(false);
    });
  }, [runUseEffect]);

  const coreComponent = () => {
    return (
      <span>
        {friendRequests.length >= 1 ? (
          <>
            <span>
              <p style={{ fontSize: "25px" }}>
                You have {friendRequests.length} pending requests
              </p>
            </span>
            <div className="row">
              {loading ? (
                <Spin className="my-5 py-5" indicator={<LoadingOutlined />} />
              ) : (
                friendRequests.map((f, i) => (
                  <div
                    style={
                      mode === "dark"
                        ? { backgroundColor: "#001529" }
                        : { backgroundColor: "white" }
                    }
                    key={i}
                    className="col-md-3 friend-list-card"
                  >
                    <FriendsCard
                      f={f}
                      setRunUseEffect={setRunUseEffect}
                      userIdParams={userIdParams}
                      from="friendRequests"
                    />
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <span>
            <p style={{ fontSize: "25px" }}>You have no pending request</p>
          </span>
        )}
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

export default FriendRequests;

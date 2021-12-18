import React, { useEffect, useState } from "react";
import NavBar from "../nav/NavBar";
import SideBarFriends from "./SideBarFriends";
import { useParams } from "react-router-dom";
import FriendsCard from "./FriendsCard";
import { getUser } from "../../functions/user";
import { isAuthenticated } from "../../functions/auth";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AllFriends = () => {
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;
  const { mode } = useSelector((state) => ({ ...state }));
  const { userIdParams } = useParams();
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listOfFriends, setListOfFriends] = useState([]);
  useEffect(() => {
    setLoading(true);
    getUser(token, userId).then((res) => {
      setListOfFriends(res.data.friends);
      setLoading(false);
    });
  }, [runUseEffect]);

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
          <span>
            <p style={{ fontSize: "25px" }}>
              Total Friends ({listOfFriends.length})
            </p>
          </span>
          <div className="row">
            {loading ? (
              <Spin className="my-5 py-5" indicator={<LoadingOutlined />} />
            ) : (
              listOfFriends.map((f, i) => (
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
                    from="listOfFriends"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFriends;

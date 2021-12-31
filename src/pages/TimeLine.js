import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import { isAuthenticated } from "../functions/auth";
import { getUser } from "../functions/user";
import { CameraFilled } from "@ant-design/icons";
import "./timeline.css";
import ImageUploadModal from "../components/modal/ImageUploadModal";
import defaultCover from "../Images/defaultCover.png";
import { Avatar } from "antd";
import SubMenu from "../components/timeline/SubMenu";
import { useDispatch } from "react-redux";

const TimeLine = () => {
  const history = useHistory();
  const { userIdParams } = useParams();
  const token = isAuthenticated() && isAuthenticated().token;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [modalType, setModalType] = useState("");

  const { mode } = useSelector((state) => ({ ...state }));

  if (mode === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "#18191a";
    document.body.style.color = "white";
  }

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated()) {
      history.push("/login");
    } else {
      getUser(token, userIdParams).then((res) => {
        setUserData(res.data);

        dispatch({
          type: "SET_SELECTED_USER_DATA",
          payload: res.data,
        });

        setLoading(false);
      });
    }
  }, [runUseEffect]);

  const handleImageModal = (photoType) => {
    debugger;
    setModalType(photoType);
    setVisible(true);
  };
  return (
    <div className="main-div">
      <NavBar />
      {loading ? (
        <h3 className=" text-center my-5 text-danger">Loading...</h3>
      ) : (
        <>
          <div style={{ height: "350px", position: "relative" }}>
            <div className="text-center bg-cover">
              {userData.coverPhoto?.length >= 1 ? (
                <img
                  src={userData.coverPhoto[userData.coverPhoto.length - 1].url}
                  alt="cover"
                  height="350px"
                  width="80%"
                  className="p-1"
                  style={{ borderRadius: "15px" }}
                />
              ) : (
                <img
                  src={defaultCover}
                  alt="cover"
                  height="350px"
                  width="80%"
                  className="p-1"
                  style={{ borderRadius: "15px" }}
                />
              )}

              {userIdParams === isAuthenticated().user._id && (
                <button
                  onClick={() => handleImageModal("cover")}
                  style={{ position: "absolute", right: "12%", top: "83%" }}
                  className="btn btn-light"
                >
                  <CameraFilled style={{ fontSize: "24px" }} className="mx-2" />
                  Edit Cover Photo
                </button>
              )}
            </div>
            {
              <div
                style={{
                  borderRadius: "50%",
                  width: "160px",
                  position: "absolute",
                  top: "50%",
                  left: "42%",
                }}
              >
                <div>
                  {userData.profilePhoto?.length >= 1 ? (
                    <img
                      src={
                        userData.profilePhoto[userData.profilePhoto.length - 1]
                          .url
                      }
                      alt="profile"
                      width="200px"
                      height="200px"
                      style={
                        mode === "light"
                          ? { borderRadius: "50%", border: "6px solid white" }
                          : { borderRadius: "50%", border: "6px solid #18191a" }
                      }
                    />
                  ) : (
                    <Avatar
                      size={200}
                      style={
                        mode === "light"
                          ? {
                              borderRadius: "50%",
                              border: "6px solid white",
                              backgroundColor: "blue",
                            }
                          : {
                              borderRadius: "50%",
                              border: "6px solid #18191a",
                              backgroundColor: "blue",
                            }
                      }
                    >
                      <p style={{ fontSize: "400%" }}>
                        {userData.firstName?.slice(0, 1)}
                      </p>
                    </Avatar>
                  )}
                  {userIdParams === isAuthenticated().user._id && (
                    <>
                      <div
                        onClick={() => handleImageModal("profile")}
                        style={{
                          position: "absolute",
                          top: "70%",
                          left: "99%",
                          borderRadius: "50%",
                          backgroundColor: "#cbcaca",
                          padding: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <CameraFilled style={{ fontSize: "24px" }} />
                      </div>
                      <ImageUploadModal
                        modalType={modalType}
                        visible={visible}
                        setVisible={setVisible}
                        setRunUseEffect={setRunUseEffect}
                        runUseEffect={runUseEffect}
                        userData={userData}
                        mode={mode}
                      />
                    </>
                  )}
                </div>
              </div>
            }
          </div>

          <div className="text-center my-4">
            <h2
              style={mode === "light" ? { color: "black" } : { color: "white" }}
              className="fw-bold"
            >
              {userData.firstName + " " + userData.lastName}
            </h2>
            <p>Add bio</p>
          </div>
          <div>
            <hr style={{ width: "80%", marginLeft: "10%" }} />
          </div>
        </>
      )}
      <SubMenu
        mode={mode}
        userIdParams={userIdParams}
        setRunUseEffect={setRunUseEffect}
        userData={userData}
      />
    </div>
  );
};

export default TimeLine;

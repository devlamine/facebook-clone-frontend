import Avatar from "antd/lib/avatar/avatar";
import "./ImageUpload.css";
import React from "react";
import { updateProfile } from "../functions/user";
import { isAuthenticated, updateUserLocal } from "../functions/auth";
import { notification } from "antd";

const ProfilePhotos = ({ userData, mode, setVisible, modalType }) => {
  const changeProfile = (selectedPhoto, placement) => {
    const userId = userData._id;
    const token = isAuthenticated().token;

    updateProfile(token, userId, selectedPhoto, modalType).then((res) =>
      updateUserLocal(res.data, () => {
        setVisible(false);
        notification.open({
          message:
            "Your " + modalType + " photo has been updated successfully.",
          placement,
        });
      })
    );
  };

  return (
    <div>
      <div
        style={
          mode === "dark"
            ? { backgroundColor: "#00305e", color: "white" }
            : {
                backgroundColor: "#fff",
                color: "black",
              }
        }
        bodyStyle={{ padding: "0px" }}
        className="row"
      >
        <h5
          style={
            mode === "dark"
              ? { backgroundColor: "#00305e", color: "white" }
              : {
                  backgroundColor: "#fff",
                  color: "black",
                }
          }
        >
          Uploads
        </h5>

        {/* profile photo */}
        {modalType === "profile" &&
          userData.profilePhoto?.map((profilePhoto, i) => (
            <Avatar
              key={i}
              onClick={() => changeProfile(profilePhoto, "bottomLeft")}
              style={{ borderRadius: "10px" }}
              className="m-1 profile-images"
              src={profilePhoto.url}
              shape="square"
              size={110}
            />
          ))}
        {/* cover photo */}
        {modalType === "cover" &&
          userData.coverPhoto?.map((profilePhoto, i) => (
            <Avatar
              key={i}
              onClick={() => changeProfile(profilePhoto, "bottomLeft")}
              style={{ borderRadius: "10px" }}
              className="m-1 profile-images"
              src={profilePhoto.url}
              shape="square"
              size={110}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfilePhotos;

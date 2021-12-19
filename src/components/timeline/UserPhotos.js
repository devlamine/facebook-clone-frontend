import { Avatar } from "antd";
import React from "react";

const UserPhotos = ({ linkActive, userData, mode }) => {
  return (
    <>
      {linkActive.photos && (
        <div
          style={
            mode === "dark"
              ? { backgroundColor: "#242526" }
              : { backgroundColor: "white" }
          }
          className="col-md-8 offset-md-2 photos-bg"
        >
          {userData.profilePhoto?.map((profilePhoto, i) => (
            <Avatar
              key={i}
              style={{ borderRadius: "10px" }}
              className="m-2"
              src={profilePhoto.url}
              shape="square"
              size={155}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserPhotos;

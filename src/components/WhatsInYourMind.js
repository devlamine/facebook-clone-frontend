import React, { useState } from "react";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Avatar } from "antd";
import { isAuthenticated } from "../functions/auth";
import CreatePostModal from "./modal/CreatePostModal";

const WhatsInYourMind = ({
  mode,
  visible,
  setVisible,
  from,
  userData,
  setReFetchPosts,
}) => {
  const firstName = isAuthenticated() && isAuthenticated().user.firstName;
  const profilePhoto = isAuthenticated() && isAuthenticated().user.profilePhoto;

  const profilePhotoLength = profilePhoto?.length;
  const handlePostModal = () => {
    setVisible(true);
  };
  return (
    <div>
      <div
        className="mt-4"
        style={
          mode === "light"
            ? {
                width: "85%",
                height: "30%",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }
            : {
                width: "85%",
                height: "30%",
                borderRadius: "12px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#001529",
              }
        }
      >
        <div className="d-flex m-4 pt-3">
          {isAuthenticated() &&
          isAuthenticated().user.profilePhoto.length >= 1 ? (
            <Avatar
              src={
                isAuthenticated().user.profilePhoto[profilePhotoLength - 1].url
              }
              size={46}
            />
          ) : (
            <Avatar style={{ backgroundColor: "blue" }}>
              {firstName && firstName.slice(0, 1)}
            </Avatar>
          )}
          <input
            onClick={handlePostModal}
            type="text"
            readOnly
            className="mx-2 post-input"
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              borderBottom: "1px solid grey",
              backgroundColor: "#ebebeb",
              borderRadius: "20px",
              padding: "10px",
              cursor: "pointer",
            }}
            placeholder={
              (from === "home" &&
                isAuthenticated() &&
                "What's on your mind, " +
                  isAuthenticated().user.firstName +
                  "?") ||
              (from === "timeline" &&
                isAuthenticated() &&
                "Write somthing to " + userData.firstName + "...")
            }
          />
        </div>
        <hr />
        <div
          className="mx-4"
          style={{
            display: "flex",
            paddingBottom: "7px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={handlePostModal}
            style={{ cursor: "pointer" }}
            className="m-2"
          >
            <VideocamIcon
              className="m-1"
              style={{ fontSize: "25px", color: "red" }}
            />
            Live Video
          </div>
          <div
            onClick={handlePostModal}
            style={{ cursor: "pointer" }}
            className="m-2"
          >
            <PhotoLibraryIcon
              className="m-1"
              style={{ fontSize: "25px", color: "green" }}
            />{" "}
            Photo/Video
          </div>
          <div
            onClick={handlePostModal}
            style={{ cursor: "pointer" }}
            className="m-2"
          >
            <InsertEmoticonIcon
              className="m-1"
              style={{ fontSize: "25px", color: "yellow" }}
            />{" "}
            Feeling/Activity
          </div>
        </div>
        {/* <button className="btn btn-sm btn-primary ">Share</button> */}
        <CreatePostModal
          from={from}
          userData={userData}
          visible={visible}
          setVisible={setVisible}
          setReFetchPosts={setReFetchPosts}
        />
      </div>
    </div>
  );
};

export default WhatsInYourMind;

import { Avatar } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../functions/auth";
import { createStory } from "../../functions/story";

const LoggedInUserStories = ({ mode, previewMode, images }) => {
  const { firstName, lastName, profilePhoto, _id } = isAuthenticated().user;
  const token = isAuthenticated().token;
  const history = useHistory();

  const handleCreateStory = () => {
    createStory(token, _id, images).then((res) => {
      if (res.data.success) {
        history.push("/");
      } else {
        console.log("failed to create the post");
      }
    });
  };

  return (
    <div className="mx-3 my-3" style={{ paddingTop: "60px" }}>
      <h3
        style={
          mode === "dark"
            ? { color: "white", marginBottom: "20px" }
            : { color: "black", marginBottom: "20px" }
        }
      >
        Your story
      </h3>

      {profilePhoto.length >= 1 ? (
        <Avatar size={55} src={profilePhoto[profilePhoto.length - 1].url} />
      ) : (
        <Avatar size={55} style={{ backgroundColor: "blue" }}>
          {firstName.slice(0, 1)}
        </Avatar>
      )}

      <span className="mx-3">{firstName + " " + lastName}</span>
      {previewMode && (
        <div style={{ marginTop: "120%" }}>
          <hr />
          <div className="btn btn-secondary d-inline mx-2">Discard</div>
          <div onClick={handleCreateStory} className="btn btn-primary d-inline">
            Share to Story
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInUserStories;

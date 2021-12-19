import { PlusOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../functions/auth";
import { getStories } from "../../functions/story";
import "./story.css";
import StoryCard from "./StoryCard";

const StoryHome = () => {
  const history = useHistory();
  const { mode } = useSelector((state) => ({ ...state }));
  const { _id, profilePhoto, firstName } =
    isAuthenticated() && isAuthenticated()?.user;

  const token = isAuthenticated()?.token;

  const [stories, setStories] = useState([]);
  useEffect(() => {
    if (isAuthenticated()) {
      getStories(token, _id)
        .then((res) => {
          setStories(res.data);
        })
        .catch((err) => console.log("faild to fetch stories-->", err));
    } else {
      history.push("/login");
    }
  }, []);

  const redirectToCreateStory = () => {
    history.push("/stories/create");
  };
  return (
    <div className="d-flex story-scroll">
      <div
        style={
          mode === "light"
            ? { backgroundColor: "#d6d7da" }
            : { backgroundColor: "#242526" }
        }
        className="story-main-card mx-2"
      >
        {profilePhoto?.length >= 1 ? (
          <img
            className="story-main-card-image"
            src={profilePhoto[profilePhoto.length - 1].url}
            height="112px"
            width="110px"
            alt="profile"
          />
        ) : (
          <Avatar shape="square" size={111} style={{ backgroundColor: "blue" }}>
            {firstName?.slice(0, 1)}
          </Avatar>
        )}
        <PlusOutlined
          onClick={redirectToCreateStory}
          className="add-story-icon"
        />
        <div className="add-story-text">
          <p>Create</p>
          <p>story</p>
        </div>
      </div>
      {stories.map((story, index) => (
        <span key={index}>
          <StoryCard story={story} />
        </span>
      ))}
    </div>
  );
};

export default StoryHome;

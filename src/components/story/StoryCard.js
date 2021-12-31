import { ArrowRightOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PopUpViewStory from "./PopUpViewStory";

const StoryCard = ({ story, allStories }) => {
  const { mode } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        style={
          mode === "light"
            ? { backgroundColor: "#d6d7da" }
            : { backgroundColor: "#1c1e21" }
        }
        className="story-main-card mx-1"
      >
        {story.storyImages[0].resource_type === "video" ? (
          <video
            className="story-user-card-image"
            src={story.storyImages[0].url}
            alt="story"
            width="113px"
            height="100%"
            style={{ objectFit: "fill" }}
          />
        ) : (
          <img
            className="story-user-card-image"
            src={story.storyImages[0].url}
            alt="story"
            width="113px"
            height="100%"
          />
        )}

        <div className="user-avatar-text">
          <span className="user-avatar">
            {story.postedBy.profilePhoto.length >= 1 ? (
              <Avatar
                src={
                  story.postedBy.profilePhoto[
                    story.postedBy.profilePhoto.length - 1
                  ].url
                }
                size={35}
              />
            ) : (
              <Avatar style={{ backgroundColor: "gray" }}>
                {story.postedBy.firstName.slice(0, 1)}
              </Avatar>
            )}
          </span>
          <p>{story.postedBy.firstName + " " + story.postedBy.lastName}</p>
        </div>
      </div>
      <PopUpViewStory
        allStories={allStories}
        story={story}
        mode={mode}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default StoryCard;

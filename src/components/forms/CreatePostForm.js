import React, { useState } from "react";
import { isAuthenticated } from "../../functions/auth";
import Picker, { SKIN_TONE_LIGHT } from "emoji-picker-react";
import axios from "axios";
import "./post.css";
import PersonIcon from "@material-ui/icons/Person";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FileUpload from "./FileUpload";
import { Avatar, Badge, Spin } from "antd";
import { createPost } from "../../functions/post";

const CreatePostForm = ({
  setVisible,
  visible,
  mode,
  from,
  userData,
  setReFetchPosts,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharingOption, setSharingOption] = useState("public");
  const [postBody, setPostBody] = useState("");
  const token = isAuthenticated().token;

  const [enableEmojiPicker, setenableEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setPostBody((pre) => pre + emojiObject.emoji);
  };

  const { firstName, profilePhoto } =
    isAuthenticated() && isAuthenticated().user;

  const profilePhotoLength = profilePhoto.length;

  //removing images
  const handleRemoveImage = (public_id) => {
    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_API}/imageremove`,
        { public_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let filterdImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setImages(filterdImages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  //submiting post
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      sharingOption,
      postBody,
      images,
      postedBy: isAuthenticated().user._id,
    };

    createPost(token, post, from, userData?._id).then((res) => {
      if (res.data.success) {
        setSharingOption("");
        setImages([]);
        setPostBody("");
        setVisible(false);
        setReFetchPosts(!visible);
      }
    });
  };
  return (
    <div
      style={
        mode === "dark"
          ? { backgroundColor: "#242526", color: "white", padding: "15px" }
          : {
              backgroundColor: "#fff",
              color: "black",
              padding: "15px",
            }
      }
    >
      <h3
        className="text-center"
        style={mode === "light" ? { color: "black" } : { color: "white" }}
      >
        Create Post
      </h3>
      <hr />
      <div>
        {isAuthenticated() && (
          <>
            <div className="d-flex">
              {isAuthenticated() &&
              isAuthenticated().user.profilePhoto.length >= 1 ? (
                <Avatar
                  src={
                    isAuthenticated().user.profilePhoto[profilePhotoLength - 1]
                      .url
                  }
                  size={46}
                />
              ) : (
                <Avatar style={{ backgroundColor: "blue" }}>
                  {firstName.slice(0, 1)}
                </Avatar>
              )}
              <div
                className="d-flex flex-column fw-bold fs-6"
                style={{ marginLeft: "13px" }}
              >
                <span>
                  {isAuthenticated() &&
                    isAuthenticated().user.firstName +
                      " " +
                      isAuthenticated().user.lastName}
                </span>
                <div>
                  <select
                    onChange={(e) => setSharingOption(e.target.value)}
                    style={{
                      borderRadius: "5px",
                      outline: "none",
                      backgroundColor: "#E4E6EB",
                      color: "black",
                    }}
                  >
                    <option defaultChecked value="public">
                      Public
                    </option>
                    <option value="private">Private</option>
                    <option value="only me">Only me</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="my-2">
              <textarea
                autoFocus
                onChange={(e) => setPostBody(e.target.value)}
                value={postBody}
                rows="6"
                style={
                  mode === "dark"
                    ? { backgroundColor: "#242526" }
                    : { backgroundColor: "white" }
                }
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

              <div>
                {images &&
                  images.map((img) => (
                    <Badge
                      key={img.public_id}
                      count="X"
                      onClick={() => handleRemoveImage(img.public_id)}
                      style={{ cursor: "pointer" }}
                    >
                      {img.resource_type === "image" && (
                        <Avatar
                          src={img.url}
                          size={110}
                          className="m-2"
                          shape="square"
                        />
                      )}
                      {img.resource_type === "video" && (
                        <video
                          controls
                          width="300px"
                          height="200px"
                          src={img.url}
                        ></video>
                      )}
                    </Badge>
                  ))}
              </div>
              <div className="add-to-post">
                <p>Add to your post</p>
                <div>
                  <label>
                    {loading ? (
                      <Spin className="mx-2" tip="Loading..." />
                    ) : (
                      <FileUpload
                        values={images}
                        setValues={setImages}
                        setLoading={setLoading}
                        pathName="imageuploads"
                        multiple={true}
                        btn={false}
                      />
                    )}
                  </label>
                  <span>
                    <span style={{ position: "relative", cursor: "pointer" }}>
                      <PersonIcon
                        style={{
                          color: "blue",
                          fontSize: "30px",
                        }}
                      />
                      <LocalOfferIcon
                        style={{
                          color: "blue",
                          fontSize: "10px",
                          position: "absolute",
                          top: "5",
                          left: "20",
                        }}
                      />
                    </span>
                  </span>
                  {enableEmojiPicker && (
                    <Picker
                      skinTone={SKIN_TONE_LIGHT}
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{
                        width: "40%",
                        position: "absolute",
                        top: "2rem",
                        right: "-7rem",
                        zIndex: "2000",
                        height: "60%",
                      }}
                    />
                  )}
                  <span
                    onClick={() => setenableEmojiPicker(!enableEmojiPicker)}
                  >
                    <InsertEmoticonIcon
                      className="mx-3"
                      style={{
                        fontSize: "30px",
                        color: "yellow",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  <LocationOnIcon
                    style={{
                      fontSize: "30px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row m-1 my-2">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-secondary"
                disabled={postBody.length === 0}
              >
                Post
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePostForm;

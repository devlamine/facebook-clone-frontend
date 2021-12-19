import React, { useEffect, useRef, useState } from "react";
import { Tooltip, Avatar } from "antd";
import "antd/dist/antd.css";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import "./style.css";
import TimeAgo from "timeago-react";
import { isAuthenticated } from "../functions/auth";
import { disLike, like, postComment } from "../functions/post";
import likeIcon from "../Images/emoji/likeIcon.svg";
import { getUser } from "../functions/user";
import { useHistory } from "react-router-dom";
import likeTone from "../mp3/Like Button Press - Sound Effect.mp3";
import { useSelector } from "react-redux";
//import { Love, Happy, Hate, Fear, CryingFace } from "animated-emojis";
//import FacebookEmoji from "react-facebook-emoji";

const Post = ({ post, mode, userData, selectedUserId }) => {
  const ref = useRef(null);
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;
  const { profilePhoto, firstName } = isAuthenticated().user;

  const likeRef = useRef(null);
  const audioRef = useRef(null);

  const postId = post._id;
  const [likesLength, setLikesLength] = useState(post.likes.length);
  const [likedUserNames, setLikedUserNames] = useState([]);
  const [comment, setComment] = useState("");
  const [commentArr, setCommnetArr] = useState(post.comments);
  const [loadComments, setLoadComments] = useState(false);
  const [playVideo, setPlayVideo] = useState(true);
  const history = useHistory();

  const { onlineUsersRedux } = useSelector((state) => ({ ...state }));

  const isOnline = () => {
    let isOnline = false;
    if (onlineUsersRedux.length > 0) {
      const user = onlineUsersRedux.find(
        (user) => user._id === post.postedBy._id
      );

      if (user) {
        isOnline = true;
      } else {
        isOnline = false;
      }
    } else {
      return false;
    }
    return isOnline;
  };

  const checkLiked = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };
  const [liked, setLiked] = useState(checkLiked(post.likes));

  const likeToggle = () => {
    let likeApiCall = liked ? disLike : like;
    likeAnimation();

    likeApiCall(token, postId, userId).then((res) => {
      if (res.data) {
        setLiked(!liked);
        setLikesLength(res.data.likes.length);
        setLikedUserNames(
          res.data.likes.map((p) => p.firstName + " " + p.lastName)
        );
      }
    });
  };

  const likeAnimation = () => {
    if (!liked) {
      audioRef.current.play();
      likeRef.current.classList.add("likeAnimation");
      setTimeout(() => {
        likeRef.current.classList.remove("likeAnimation");
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(token, postId, userId, comment).then((res) => {
      // console.log(res.data);
      setCommnetArr(res.data.comments);
      setComment("");
      setLoadComments(true);
    });
  };

  const loadCommnets = () => {
    setLoadComments(!loadComments);
  };

  const handleProfileClick = (id) => {
    history.push(`/timeline/${id}`);
  };

  const handleVideo = () => {
    if (playVideo) {
      ref.current.play();
      setPlayVideo(!playVideo);
    } else {
      ref.current.pause();
      setPlayVideo(!playVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      // console.log("scorll event triggerd-->", event);
    });
  }, []);

  return (
    <>
      <audio ref={audioRef} src={likeTone} hidden></audio>
      <div
        className="mt-5"
        style={
          mode === "light"
            ? {
                width: "85%",
                // height: "75%",
                borderRadius: "15px",
                backgroundColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }
            : {
                width: "85%",
                // height: "75%",
                borderRadius: "15px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                backgroundColor: "#242526",
              }
          //"#001529"
        }
      >
        <div className="row">
          <div className="d-flex">
            <span style={{ position: "relative" }}>
              {isOnline() && (
                <span
                  style={
                    mode === "dark"
                      ? { border: "2px solid  rgb(0, 21, 41)" }
                      : { border: "2px solid white" }
                  }
                  className="isOnline"
                ></span>
              )}
              {post.postedBy.profilePhoto.length >= 1 ? (
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProfileClick(post.postedBy._id)}
                  className="m-3"
                  src={
                    post.postedBy.profilePhoto[
                      post.postedBy.profilePhoto.length - 1
                    ].url
                  }
                  size={55}
                />
              ) : (
                <Avatar
                  onClick={() => handleProfileClick(post.postedBy._id)}
                  style={{ backgroundColor: "blue", cursor: "pointer" }}
                  className="m-3"
                  size={55}
                >
                  {post.postedBy.firstName.slice(0, 1)}
                </Avatar>
              )}
            </span>

            <div className="d-flex flex-column mt-3">
              <div>
                {selectedUserId !== null ? (
                  <>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProfileClick(post.postedBy._id)}
                    >
                      {" "}
                      <b>
                        {post.postedBy.firstName + " " + post.postedBy.lastName}
                      </b>
                    </span>
                    <span>
                      {" "}
                      {userData._id === post.postedBy._id ? (
                        " shared a post"
                      ) : (
                        <>
                          wrote on{" "}
                          <b
                            style={{ cursor: "pointer" }}
                            onClick={() => handleProfileClick(selectedUserId)}
                          >
                            {userData._id === userId
                              ? "your"
                              : userData.firstName + "'s"}
                          </b>{" "}
                          timeline
                        </>
                      )}
                    </span>
                  </>
                ) : (
                  <>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProfileClick(post.postedBy._id)}
                    >
                      {post.postedBy.firstName + " " + post.postedBy.lastName}
                    </p>
                  </>
                )}
              </div>
              <div>
                <TimeAgo datetime={post.createdAt} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {post.postBody.length > 1 && (
            <div className="mx-3 my-2">
              <p>{post.postBody}</p>
            </div>
          )}
          {post.images.length >= 1 && (
            <div style={{ height: "470px", width: "100%", overflow: "hidden" }}>
              {post.images[0].resource_type === "video" ? (
                <video
                  ref={ref}
                  style={{
                    minWidth: "90%",
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                  onClick={handleVideo}
                >
                  <source src={post.images[0].url}></source>
                </video>
              ) : (
                <img
                  style={{ minWidth: "100%", maxHeight: "100%" }}
                  src={post.images[0].url}
                  height="470px"
                  width="100%"
                  alt="user profile"
                />
              )}
            </div>
          )}
        </div>

        {(likesLength >= 1 || commentArr.length >= 1) && (
          <div className="row">
            <div style={{ cursor: "pointer" }} className="my-2 col-md-6">
              {likesLength >= 1 && (
                <Tooltip
                  title={likesLength + " people like this post"}
                  color="blue"
                  placement="bottom"
                >
                  <img
                    className="mx-1"
                    src={likeIcon}
                    width="18px"
                    alt="like icon"
                  />
                  {liked
                    ? (likesLength === 1 && "You Like it") ||
                      (likesLength > 1 &&
                        `You and ${likesLength - 1} ${
                          likesLength - 1 === 1 ? "other" : "others"
                        }`)
                    : likesLength && !liked && likesLength}
                </Tooltip>
              )}{" "}
            </div>
            <div className="col-md-6 my-2">
              <span
                className="mx-5 px-4"
                onClick={loadCommnets}
                style={{ cursor: "pointer" }}
              >
                {commentArr.length >= 1 && commentArr.length + " comments"}
              </span>
            </div>
          </div>
        )}
        {/* <div className="gif-emojies">
          <FacebookEmoji type="like" />
          <FacebookEmoji type="love" />
          <FacebookEmoji type="wow" />
          <FacebookEmoji type="yay" />
          <FacebookEmoji type="angry" />
          <FacebookEmoji type="haha" />
          <FacebookEmoji type="sad" />
        </div> */}
        <div className="row mt-1 text-center">
          <div
            onClick={likeToggle}
            style={{ cursor: "pointer" }}
            className="col-md-6 p-2 like"
            ref={likeRef}
          >
            {liked ? (
              <span>
                <LikeFilled style={{ color: "#0066ff", fontSize: "25px" }} />
              </span>
            ) : (
              <span>
                <LikeOutlined style={{ fontSize: "25px" }} />
              </span>
            )}
          </div>

          <div
            onClick={loadCommnets}
            style={{ cursor: "pointer" }}
            className="col-md-6 p-2 comment"
          >
            <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "25px" }} />{" "}
            Comment
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div
              onClick={() => handleProfileClick(post.postedBy._id)}
              style={{ cursor: "pointer" }}
            >
              {profilePhoto.length >= 1 ? (
                <Avatar
                  className="m-3"
                  src={profilePhoto[profilePhoto.length - 1].url}
                  size={35}
                />
              ) : (
                <Avatar
                  style={{ backgroundColor: "blue" }}
                  className="m-3"
                  size={30}
                >
                  {firstName.slice(0, 1)}
                </Avatar>
              )}
            </div>

            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              required
              value={comment}
              style={
                mode === "dark"
                  ? {
                      width: "100%",
                      outline: "none",
                      border: "none",
                      borderBottom: "1px solid grey",
                      backgroundColor: "#3a3b3c",
                      borderRadius: "20px",
                      padding: "5px",
                      marginBottom: "20px",
                      marginTop: "20px",
                      marginRight: "20px",
                    }
                  : {
                      width: "100%",
                      outline: "none",
                      border: "none",
                      borderBottom: "1px solid grey",
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      padding: "5px",
                      marginBottom: "10px",
                    }
              }
              placeholder="Write a comment..."
            />
            <button type="submit" hidden></button>
          </div>
        </form>
        {loadComments && (
          <div>
            {commentArr.length >= 1 && (
              <div>
                {commentArr.map((c) => (
                  <div>
                    <div className="d-flex">
                      <div
                        onClick={() => handleProfileClick(c.postedBy._id)}
                        style={{ cursor: "pointer" }}
                        className="my-3 mx-2 p-1"
                      >
                        {c.postedBy.profilePhoto.length >= 1 ? (
                          <Avatar
                            className="m-3"
                            src={
                              c.postedBy.profilePhoto[
                                c.postedBy.profilePhoto.length - 1
                              ].url
                            }
                            size={28}
                          />
                        ) : (
                          <Avatar
                            className="m-3"
                            style={{ backgroundColor: "blue" }}
                            size={28}
                          >
                            {c.postedBy.firstName.slice(0, 1)}
                          </Avatar>
                        )}
                      </div>
                      <div style={{ borderRadius: "10px" }}>
                        <div className="d-flex flex-column mt-3">
                          <div className="text-muted">
                            {c.postedBy.firstName + " " + c.postedBy.lastName}
                          </div>
                          <div>{c.text}</div>
                          <div style={{ fontSize: "11px" }}>
                            <TimeAgo datetime={c.created} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;

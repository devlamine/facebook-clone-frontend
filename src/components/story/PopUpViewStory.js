import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Progress } from "antd";
import React, { useEffect, useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import "./story.css";

const PopUpViewStory = ({ visible, setVisible, story, mode, allStories }) => {
  const [percent, setPercent] = useState(0);
  const [loadImage, setLoadImage] = useState(0);
  const [intervalStr, setIntervalStr] = useState();
  const [storyImages, setStoryImages] = useState(story.storyImages);
  const [postedBy, setPostedBy] = useState(story.postedBy);
  const [storyId, setStoryId] = useState(story._id);
  const [playVideo, setPlayVideo] = useState(false);
  const [pause, setPause] = useState(true);
  const [volumeMute, setVolumeMute] = useState(false);
  const [disbleRightBtn, setDisbleRightBtn] = useState(false);
  const [disbleLeftBtn, setDisbleLeftBtn] = useState(false);
  const ref = useRef(null);
  let per = 0;
  let nProgressBar = [];
  let lImag = 0;
  let intervalForStr;
  let stryImg = [];
  let nextStory;
  let checkLastStory = 0;

  // useEffect(() => {
  //   handleAllStories();
  // }, [lImag]);

  useEffect(() => {
    setLoadImage(0);
    setPercent(0);
    per = 0;
    loadProgresssBar();
    console.log("allStories", story);
  }, [visible]);

  const loadProgresssBar = (strDuration = 20, storyIn = storyImages) => {
    lImag = loadImage;
    //console.log("stryImages next-->", story);
    if (visible === true && !intervalForStr) {
      intervalForStr = setInterval(() => {
        if (percent < 100 && per < 100) {
          per = per + 1;
          setPercent(per);
          if (storyIn[lImag]) {
            storyIn[lImag].percent = per;
            setStoryImages(storyIn);
          }
        } else {
          if (lImag < storyIn.length - 1) {
            lImag++;
            setLoadImage(lImag);
          } else if (per >= 100) {
            setPercent(100);
            clearInterval(intervalForStr);
            handleRightMove();
          }

          setPercent(0);
          per = 0;
        }
      }, strDuration);
      setIntervalStr(intervalForStr);
    }
  };

  const progressBar = () => {
    for (let i = 0; i < storyImages.length; i++) {
      nProgressBar.push(
        <div
          key={i}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginRight: "2px",
          }}
        >
          <Progress
            percent={storyImages[i]?.percent ?? 0}
            showInfo={false}
            size="small"
            status="normal"
            style={{ width: "100%" }}
            strokeWidth={3}
            strokeColor="#00bcd4"
          />
        </div>
      );
    }

    return nProgressBar;
  };

  //handling left and right swipe of stories

  const handleLeftMove = () => {
    if (loadImage > 0) {
      per = 0;
      setLoadImage((pre) => pre - 1);

      let changeStrImg = storyImages;
      for (let i = loadImage; i <= changeStrImg.length; i++) {
        if (changeStrImg[i]?.percent) changeStrImg[i].percent = 0;
      }
      setStoryImages(changeStrImg);
      clearInterval(intervalStr);
      loadProgresssBar();
    } else {
      console.log("else running...");
      clearInterval(intervalStr);

      lImag = 0;
      setLoadImage(lImag);
      per = 0;
      setPercent(0);

      let changeStrImg = allStories;
      //console.log("changeStrImg---->", changeStrImg);
      changeStrImg.forEach((allStory, index, arr) => {
        if (storyId === allStory._id) {
          nextStory = index - 1;
          checkLastStory++;
        }
        if (index === 0 && storyId === allStory._id) {
          nextStory = 0;
          setDisbleLeftBtn(true);
          allStories[index - 1].storyImages.forEach((img, index, arr) => {
            if (index === arr.length - 1) {
              console.log("first image", img);
            }
          });
        }
      });

      stryImg = allStories[nextStory].storyImages;

      setPostedBy(allStories[nextStory].postedBy);
      setStoryId(allStories[nextStory]._id);
      setStoryImages(stryImg);

      //setStoryImages(stryImg);
      loadProgresssBar(20, stryImg);
    }
  };

  const handleRightMove = () => {
    if (loadImage < storyImages.length - 1) {
      clearInterval(intervalStr);

      per = 0;
      setPercent(0);
      setLoadImage((pre) => pre + 1);

      let changeStrImg = storyImages;
      for (let i = loadImage - 1; i >= 0; i--) {
        if (changeStrImg[i]?.percent) changeStrImg[i].percent = 100;
      }
      setStoryImages(changeStrImg);

      loadProgresssBar();
    } else {
      console.log("else running...");
      clearInterval(intervalStr);

      lImag = 0;
      setLoadImage(lImag);
      per = 0;
      setPercent(0);

      let changeStrImg = allStories;
      //console.log("changeStrImg---->", changeStrImg);
      changeStrImg.forEach((allStory, index, arr) => {
        if (storyId === allStory._id) {
          nextStory = index + 1;
          checkLastStory++;
        }
        if (index === arr.length - 2 && storyId === allStory._id) {
          nextStory = index + 1;
          setDisbleRightBtn(true);
          allStories[index + 1].storyImages.forEach((img, index, arr) => {
            //selecting the last story
            if (index === arr.length - 1) {
              console.log("last image", img);
            }
          });
        }
      });

      stryImg = allStories[nextStory].storyImages;

      setPostedBy(allStories[nextStory].postedBy);
      setStoryId(allStories[nextStory]._id);
      setStoryImages(stryImg);

      //setStoryImages(stryImg);
      loadProgresssBar(20, stryImg);
    }
  };

  const handlePlay = (e) => {
    clearInterval(intervalStr);
    loadProgresssBar(ref.current.duration * 10);
  };

  const handlePauseAndPlay = () => {
    if (playVideo) {
      ref.current.play();
      setPause(true);
      setPlayVideo(!playVideo);
    } else {
      ref.current.pause();
      setPause(false);
      setPlayVideo(!playVideo);
    }
  };

  const handleMute = () => {
    ref.current.muted = !ref.current.muted;
    setVolumeMute(ref.current.muted);
  };

  const handleClose = () => {
    setVisible(!visible);
    let changeStrImg = storyImages;
    for (let i = 0; i < changeStrImg.length; i++) {
      if (changeStrImg[i]?.percent) changeStrImg[i].percent = 0;
    }
    clearInterval(intervalStr);
  };

  return (
    <>
      {visible && (
        <div
          style={
            mode === "dark"
              ? { backgroundColor: "#242526", color: "white" }
              : { backgroundColor: "white", color: "black" }
          }
          className="story-modal"
        >
          <span onClick={handleClose} className="cancle-icon">
            X
          </span>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <LeftOutlined
                onClick={disbleLeftBtn ? null : handleLeftMove}
                className="arrow-controller"
              />
            </div>
            <div>
              <div style={{ position: "relative" }}>
                {storyImages[loadImage]?.resource_type === "video" ? (
                  <video
                    muted={true}
                    ref={ref}
                    src={storyImages[loadImage]?.url}
                    height="500vh"
                    width="300vw"
                    style={{
                      borderRadius: "10px",
                      objectFit: "fill",
                      marginBottom: "30%",
                    }}
                    controls={false}
                    autoPlay
                    onPlay={(e) => handlePlay(e)}
                  ></video>
                ) : (
                  <img
                    index={loadImage}
                    src={storyImages[loadImage]?.url}
                    height="500vh"
                    width="300vw"
                    style={{ borderRadius: "10px", marginBottom: "30%" }}
                    alt="story"
                  />
                )}

                <div
                  className="mx-2"
                  style={{
                    position: "absolute",
                    top: "0%",
                    width: "100%",
                    left: "-2.5%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "5px",
                      width: "100%",
                    }}
                  >
                    {progressBar()}
                  </div>
                  <div className="d-flex">
                    {postedBy.profilePhoto.length >= 1 ? (
                      <Avatar
                        className="mx-2"
                        src={
                          postedBy.profilePhoto[
                            postedBy?.profilePhoto?.length - 1
                          ]?.url
                        }
                      />
                    ) : (
                      <Avatar
                        className="mx-2"
                        style={{ backgroundColor: "blue" }}
                      >
                        {postedBy.firstName.slice(0, 1)}
                      </Avatar>
                    )}
                    <p
                      style={{
                        color: "white",
                        marginLeft: "2px",
                        fontWeight: 500,
                      }}
                    >
                      {postedBy.firstName + " " + postedBy.lastName}
                    </p>
                    {storyImages[loadImage]?.resource_type === "video" && (
                      <div style={{ marginLeft: "38%", display: "flex" }}>
                        <div>
                          {pause ? (
                            <PauseIcon onClick={handlePauseAndPlay} />
                          ) : (
                            playVideo && (
                              <PlayArrowIcon onClick={handlePauseAndPlay} />
                            )
                          )}
                        </div>
                        <div>
                          {!volumeMute ? (
                            <VolumeUpIcon onClick={handleMute} />
                          ) : (
                            <VolumeOffIcon onClick={handleMute} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <RightOutlined
                onClick={disbleRightBtn ? null : handleRightMove}
                className="arrow-controller"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpViewStory;

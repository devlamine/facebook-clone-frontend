import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Modal, Progress } from "antd";
import React, { useEffect, useState, useRef } from "react";
import "./story.css";

const PopUpViewStory = ({ visible, setVisible, story, mode }) => {
  const [percent, setPercent] = useState(0);
  const [loadImage, setLoadImage] = useState(0);
  const [intervalStr, setIntervalStr] = useState();
  const [storyImages, setStoryImages] = useState(story.storyImages);
  const ref = useRef(null);
  let per = 0;
  let nProgressBar = [];
  let lImag = 0;
  let intervalForStr;

  useEffect(() => {
    setLoadImage(0);
    setPercent(0);
    per = 0;
    loadProgresssBar();
  }, [visible]);

  const loadProgresssBar = (strDuration = 20) => {
    lImag = loadImage;
    if (visible === true && !intervalForStr) {
      intervalForStr = setInterval(() => {
        if (percent < 100 && per < 100) {
          per = per + 1;
          setPercent(per);
          let stryImg = storyImages;
          if (stryImg[lImag]) {
            stryImg[lImag].percent = per;
            setStoryImages(stryImg);
          }
        } else {
          if (lImag < storyImages.length - 1) {
            lImag++;
            setLoadImage(lImag);
          } else if (per >= 100) {
            setPercent(100);
            clearInterval(intervalForStr);
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
    }
  };

  const handleRightMove = () => {
    if (loadImage < storyImages.length - 1) {
      clearInterval(intervalStr);

      per = 0;
      setLoadImage((pre) => pre + 1);

      let changeStrImg = storyImages;
      for (let i = loadImage - 1; i >= 0; i--) {
        if (changeStrImg[i]?.percent) changeStrImg[i].percent = 100;
      }
      setStoryImages(changeStrImg);

      loadProgresssBar();
    } else {
      console.log("else running..");
    }
  };

  const handlePlay = (e) => {
    clearInterval(intervalStr);
    loadProgresssBar(ref.current.duration * 10);
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
          <span onClick={() => setVisible(!visible)} className="cancle-icon">
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
                onClick={handleLeftMove}
                className="arrow-controller"
              />
            </div>
            <div>
              <div style={{ position: "relative" }}>
                {storyImages[loadImage]?.resource_type === "video" ? (
                  <video
                    ref={ref}
                    src={storyImages[loadImage]?.url}
                    height="500vh"
                    width="300vw"
                    style={{
                      borderRadius: "10px",
                      objectFit: "fill",
                      marginBottom: "30%",
                    }}
                    controls
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
                    {story.postedBy.profilePhoto.length >= 1 ? (
                      <Avatar
                        className="mx-2"
                        src={
                          story.postedBy.profilePhoto[
                            story.postedBy.profilePhoto.length - 1
                          ].url
                        }
                      />
                    ) : (
                      <Avatar
                        className="mx-2"
                        style={{ backgroundColor: "blue" }}
                      >
                        {story.postedBy.firstName.slice(0, 1)}
                      </Avatar>
                    )}
                    <p
                      style={{
                        color: "white",
                        marginLeft: "2px",
                        fontWeight: 500,
                      }}
                    >
                      {story.postedBy.firstName + " " + story.postedBy.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <RightOutlined
                onClick={handleRightMove}
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

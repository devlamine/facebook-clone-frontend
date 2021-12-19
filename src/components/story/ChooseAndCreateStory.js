import { FileImageOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import StoryImage from "../../Images/storyPhoto.png";
import Resizer from "react-image-file-resizer";
import "./story.css";
import { isAuthenticated } from "../../functions/auth";
import axios from "axios";
import { Spin } from "antd";
import PreviewStory from "./PreviewStory";

const ChooseAndCreateStory = ({ mode, setPreviewMode, images, setImages }) => {
  const token = isAuthenticated().token;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        let uploadedImages = images;

        if (files) {
          setLoading(true);

          axios
            .post(
              `${process.env.REACT_APP_API}/imageuploads`,
              { image: reader.result },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              uploadedImages.push(res.data);
              setImages(uploadedImages);
              setLoading(false);
              setPreviewMode(true);
            })
            .catch((err) => {
              console.log("Cloudinary image uplaod failed--->", err);
              setLoading(false);
            });
        }
      };
    }
  };

  return (
    <div
      style={
        mode === "dark"
          ? {
              backgroundColor: "#18191a",
              height: "100vh",
              marginLeft: "-18px",
              color: "white",
            }
          : {
              backgroundColor: "white",
              height: "100vh",
              marginLeft: "-18px",
              color: "black",
            }
      }
    >
      {loading ? (
        <Spin tip="Loading..." className="m-5 p-5 text-center" />
      ) : (
        <>
          {images?.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "90vh",
              }}
            >
              {/* create a photo story */}

              <div
                style={{
                  height: "330px",
                  width: "220px",
                  overflow: "hidden",
                }}
              >
                <div
                  alt="photo story"
                  style={{
                    backgroundImage: `url(${StoryImage})`,
                    backgroundPosition: "0px 0px",
                    backgroundSize: "221px 662px",
                    width: "220px",
                    height: "330px",
                    position: "relative",
                  }}
                >
                  <label>
                    <input
                      type="file"
                      multiple
                      style={{ visibility: "hidden" }}
                      onChange={fileUploadAndResize}
                    />
                    <div
                      className="story"
                      style={{
                        position: "absolute",
                        top: "0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "220px",
                        height: "340px",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "#242526",
                          borderRadius: "50%",
                          padding: "15px",
                        }}
                      >
                        <FileImageOutlined
                          style={{
                            fontSize: "25px",
                            color: "white",
                          }}
                        />
                      </span>
                      <p style={{ fontWeight: "bold", paddingTop: "10px" }}>
                        Create a Photo Story
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* create a text story */}
              <div
                style={{
                  height: "330px",
                  width: "220px",
                  overflow: "hidden",
                }}
              >
                <div
                  alt="text story"
                  style={{
                    backgroundImage: `url(${StoryImage})`,
                    backgroundPosition: "0px -331px",
                    backgroundSize: "221px 662px",
                    width: "220px",
                    height: "330px",
                    position: "relative",
                  }}
                >
                  <div
                    className="story"
                    style={{
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "220px",
                      height: "330px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "25px",
                        backgroundColor: "#242526",
                        color: "white",
                        borderRadius: "50%",
                        padding: "15px",
                      }}
                    >
                      Aa
                    </p>

                    <p style={{ fontWeight: "bold", paddingTop: "1px" }}>
                      Create a Text Story
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {images?.length >= 1 && <PreviewStory mode={mode} images={images} />}
        </>
      )}
    </div>
  );
};

export default ChooseAndCreateStory;

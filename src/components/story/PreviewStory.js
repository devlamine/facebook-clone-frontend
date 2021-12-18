import React, { useState } from "react";

const PreviewStory = ({ mode, images }) => {
  const [selctedMediaIndex, setselctedMediaIndex] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Preview</p>
      <div
        style={{
          height: "70%",
          width: "70%",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            width: "220px",
            height: "330px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {images.map((image) =>
            image.resource_type === "video" ? (
              <video
                key={image.url}
                src={image.url}
                width="220px"
                height="330px"
                style={{ borderRadius: "20px", objectFit: "fill" }}
                controls
              ></video>
            ) : (
              <img
                key={image.url}
                src={image.url}
                width="220px"
                alt="preview"
                height="330px"
                style={{ borderRadius: "20px" }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewStory;

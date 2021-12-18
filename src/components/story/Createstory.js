import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../nav/NavBar";
import ChooseAndCreateStory from "./ChooseAndCreateStory";
import LoggedInUserStories from "./LoggedInUserStories";

const Createstory = () => {
  const { mode } = useSelector((state) => ({ ...state }));
  const [previewMode, setPreviewMode] = useState(false);
  const [images, setImages] = useState([]);
  return (
    <div>
      <div className="row">
        <NavBar />
        <div
          className="col-md-3 position-fixed"
          style={
            mode === "dark"
              ? {
                  backgroundColor: "rgb(0, 21, 41)",
                  height: "100vh",
                  color: "white",
                }
              : { backgroundColor: "white", height: "100vh", color: "black" }
          }
        >
          <LoggedInUserStories
            mode={mode}
            previewMode={previewMode}
            images={images}
          />
        </div>
        <div className="col-md-3"></div>
        <div className="col">
          <ChooseAndCreateStory
            mode={mode}
            images={images}
            setImages={setImages}
            setPreviewMode={setPreviewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Createstory;

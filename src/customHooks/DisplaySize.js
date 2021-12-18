import React, { useEffect, useState } from "react";

const DisplaySize = () => {
  const [displaySize, settDisplaySize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", dynemicResize);

    return () => window.removeEventListener("resize", dynemicResize);
  }, []);

  const dynemicResize = () => {
    settDisplaySize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  return displaySize;
};

export default DisplaySize;

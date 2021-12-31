import React from "react";
import { useEffect, useState } from "react";

const ScrollValue = () => {
  const [scroll, setScroll] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    setScroll({ scrollTop, scrollHeight, clientHeight });
  };
  return scroll;
};

export default ScrollValue;

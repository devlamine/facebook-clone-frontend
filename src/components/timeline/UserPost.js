import React from "react";
import WhatsInYourMind from "../WhatsInYourMind";
import Post from "../Post";
import { isAuthenticated } from "../../functions/auth";
import { HomeOutlined, HeartFilled, AimOutlined } from "@ant-design/icons";
import { fetchPostsByuser } from "../../functions/post";
import { useEffect } from "react";
import { useState } from "react";
import ScrollValue from "./../../customHooks/ScrollValue";
import { LoadingOutlined } from "@ant-design/icons";

const UserPost = ({
  mode,
  visible,
  setVisible,
  linkActive,
  posts,
  userData,
  selectedUserId,
  userIdParams,
  setPosts,
  setSelectedUserId,
}) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const { scrollHeight, scrollTop, clientHeight } = ScrollValue();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrntLimit] = useState(4);
  const [loading, setLoading] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    fetchPostsByuser(token, userIdParams, currentPage, currentLimit)
      .then((res) => {
        setPosts((pre) => [...pre, ...res.data.timeline]);
        setTotalPages(res.data.totalPages);
        console.log(res.data);
        setSelectedUserId(res.data._id);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  //load all posts of the user

  useEffect(() => {
    loadPosts();
  }, [visible, currentPage]);

  useEffect(() => {
    // console.log(
    //   "scrollHeight",
    //   scrollHeight,
    //   "scrollTop",
    //   scrollTop,
    //   "clientHeight",
    //   clientHeight
    // );
    if (scrollTop + clientHeight + 10 >= scrollHeight) {
      setCurrentPage(currentPage + 1);
      console.log("scroll to bottom");
    }
  }, [scrollHeight, scrollTop, clientHeight]);

  return (
    <>
      {linkActive.post && (
        <>
          {" "}
          <div className="col-md-6 userInfo-sidebar">
            <div
              style={
                mode === "dark"
                  ? { backgroundColor: "#242526", borderRadius: "6px" }
                  : { backgroundColor: "white", borderRadius: "6px" }
              }
              className="userinfo-div-main p-4"
            >
              <div className="m-2">
                <HomeOutlined style={{ fontSize: "20px" }} />{" "}
                <span className="mx-1">Lives in Montreal, Quebec</span>
              </div>
              <div>
                <AimOutlined style={{ fontSize: "20px" }} className="m-2" />
                From Rajkot, Gujarat
              </div>
              <div>
                <HeartFilled style={{ fontSize: "20px" }} className="m-2" />
                Married
              </div>
              {userId === userData._id && (
                <div className="my-4">
                  <button
                    style={{ width: "100%" }}
                    className="btn btn-secondary"
                  >
                    Edit details
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <WhatsInYourMind
                mode={mode}
                visible={visible}
                setVisible={setVisible}
                from="timeline"
                userData={userData}
              />
            </div>
            {posts.length > 0
              ? posts.map((post, i) => (
                  <Post
                    key={i}
                    post={post}
                    mode={mode}
                    userData={userData}
                    selectedUserId={selectedUserId}
                  />
                ))
              : !loading && <div className="text-center">No posts</div>}
            {loading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "15%",
                  padding: "15px",
                }}
              >
                {" "}
                <div>
                  {" "}
                  <LoadingOutlined style={{ fontSize: "20px" }} />
                </div>
                <p s>fetching posts...</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserPost;

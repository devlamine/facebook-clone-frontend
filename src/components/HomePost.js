import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ScrollValue from "../customHooks/ScrollValue";
import { isAuthenticated } from "../functions/auth";
import { fetchPosts } from "../functions/post";
import Post from "./Post";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const HomePost = ({ mode, reFetchPosts }) => {
  const { scrollHeight, scrollTop, clientHeight } = ScrollValue();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(4);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  const token = isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated()) {
      history.push("/login");
    } else {
      fetchPosts(token, perPageLimit, currentPage)
        .then((res) => {
          console.log(res.data);
          setPosts((prev) => [...prev, ...res.data.allPosts]);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((err) => console.log("Failed to load posts"));
    }
  }, [reFetchPosts, currentPage]);
  useEffect(() => {
    if (
      scrollTop + clientHeight + 10 >= scrollHeight &&
      currentPage <= totalPages
    ) {
      setCurrentPage(currentPage + 1);
    }
  }, [scrollHeight, scrollTop, clientHeight]);
  return (
    <>
      {posts.length >= 1
        ? posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              mode={mode}
              selectedUserId={null}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          ))
        : !loading && (
            <h4
              style={mode === "light" ? { color: "black" } : { color: "white" }}
              className="my-5 py-5"
            >
              Looks like your friend list is empty. Start adding friends to see
              their posts.
              <p>
                <Link to={`/friends/suggestions/${userId}`}>
                  Click here to add friends.
                </Link>
              </p>
            </h4>
          )}
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
    </>
  );
};

export default HomePost;

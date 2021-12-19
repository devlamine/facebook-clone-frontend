import React from "react";
import WhatsInYourMind from "../WhatsInYourMind";
import Post from "../Post";
import { isAuthenticated } from "../../functions/auth";
import { HomeOutlined, HeartFilled, AimOutlined } from "@ant-design/icons";

const UserPost = ({
  mode,
  visible,
  setVisible,
  linkActive,
  posts,
  userData,
  selectedUserId,
}) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;

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
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                mode={mode}
                userData={userData}
                selectedUserId={selectedUserId}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserPost;

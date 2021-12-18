import React from "react";
import TimeAgo from "timeago-react";
import { Avatar } from "antd";

const Message = ({ own, message, mode, isNew, selectedFriend }) => {
  const userProfile = (profile) => {
    if (message !== undefined) {
      return profile?.senderId?.profilePhoto?.length > 1 ? (
        <Avatar
          style={{ marginLeft: "5px" }}
          src={
            profile?.senderId?.profilePhoto[
              profile.senderId?.profilePhoto?.length - 1
            ]?.url
          }
        />
      ) : (
        <Avatar style={{ backgroundColor: "blue", marginLeft: "5px" }}>
          {profile?.senderId?.firstName.slice(0, 1)}
        </Avatar>
      );
    } else {
      return selectedFriend?.profilePhoto?.length > 1 ? (
        <Avatar
          style={{ marginLeft: "5px" }}
          src={
            selectedFriend?.profilePhoto[
              selectedFriend?.profilePhoto?.length - 1
            ]?.url
          }
          size={60}
        />
      ) : (
        <Avatar
          style={{ backgroundColor: "blue", marginLeft: "5px" }}
          size={60}
        >
          {selectedFriend?.firstName?.slice(0, 1)}
        </Avatar>
      );
    }
  };
  return (
    <>
      {!isNew ? (
        <>
          <div
            className={
              !own
                ? "chat-main-message-user-message"
                : "chat-main-message-user-message own"
            }
          >
            {!own && (
              <div className="chat-main-messages-user-img">
                {userProfile(message)}
              </div>
            )}
            <div>
              <div
                className={
                  !own
                    ? "chat-main-messages-message"
                    : "chat-main-messages-message own-msg"
                }
              >
                <span style={mode === "dark" && !own ? { color: "black" } : {}}>
                  {message?.text}
                </span>
              </div>
              <div>
                <TimeAgo
                  className="text-muted"
                  style={{ fontSize: "10px" }}
                  datetime={message?.createdAt}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center my-4">
            <div style={{ padding: "12px" }}>{userProfile(selectedFriend)}</div>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",

                lineHeight: "2px",
              }}
            >
              {selectedFriend?.firstName + " " + selectedFriend?.lastName}
            </p>
            <p style={{ lineHeight: "5px", color: "#6c757d" }}>Facebook</p>
            <p style={{ lineHeight: "5px", color: "#6c757d" }}>
              You're friends on Facebook
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Message;

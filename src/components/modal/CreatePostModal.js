import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import CreatePostForm from "../forms/CreatePostForm";
import { useSelector } from "react-redux";
import DisplaySize from "../../customHooks/DisplaySize";

const CreatePostModal = ({
  setVisible,
  visible,
  from,
  userData,
  setReFetchPosts,
}) => {
  const { mode } = useSelector((state) => ({ ...state }));

  const displaySize = DisplaySize();

  return (
    <>
      <Modal
        style={
          mode === "dark"
            ? { backgroundColor: "#242526", color: "white" }
            : {
                backgroundColor: "#fff",
                color: "black",
              }
        }
        bodyStyle={{ padding: "0px" }}
        width={displaySize?.width < 600 ? "100%" : "50%"}
        centered={true}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CreatePostForm
          from={from}
          userData={userData}
          setVisible={setVisible}
          visible={visible}
          setReFetchPosts={setReFetchPosts}
          mode={mode}
        />
      </Modal>
    </>
  );
};

export default CreatePostModal;

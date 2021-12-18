import React, { useState } from "react";
import { Modal, Spin, Avatar, Badge } from "antd";
import FileUpload from "../forms/FileUpload";
import photoIcon from "../../Images/emoji/cameraIcon.png";
import { isAuthenticated, updateUserLocal } from "../../functions/auth";
import axios from "axios";
import { updateProfile } from "../../functions/user";
import ProfilePhotos from "../ProfilePhotos";

const ImageUploadModal = ({
  visible,
  setVisible,
  userData,
  mode,
  modalType,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;

  const handleRemoveImage = (public_id) => {
    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_API}/imageremove`,
        { public_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let filterdImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setImages(filterdImages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleUpdatePhoto = () => {
    let cover = "cover";
    let profile = "profile";
    if (modalType === "profile") {
      updateProfile(token, userId, images, profile).then((res) => {
        updateUserLocal(res.data, () => setVisible(false));
      });
    } else {
      let coverPhoto = images;
      updateProfile(token, userId, coverPhoto, cover).then((res) => {
        updateUserLocal(res.data, () => setVisible(false));
      });
    }
  };
  return (
    <div>
      <Modal
        closable={true}
        style={
          mode === "dark"
            ? { backgroundColor: "#00305e", color: "white" }
            : {
                backgroundColor: "#fff",
                color: "black",
              }
        }
        bodyStyle={{ padding: "0px" }}
        visible={visible}
        footer={null}
        onCancel={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
      >
        <div
          style={
            mode === "dark"
              ? { backgroundColor: "#00305e", color: "white" }
              : {
                  backgroundColor: "#fff",
                  color: "black",
                }
          }
          className="p-4"
        >
          <h4
            style={
              mode === "dark"
                ? { color: "white" }
                : {
                    color: "black",
                  }
            }
          >
            {modalType === "profile"
              ? " Update profile picture"
              : " Update cover picture"}
          </h4>
          <hr />
          <label>
            {loading ? (
              <Spin className="mx-2" tip="Loading..." />
            ) : (
              <FileUpload
                mode={mode}
                values={images}
                setValues={setImages}
                setLoading={setLoading}
                photoIcon={photoIcon}
                pathName="imageuploads"
                multiple={false}
                btn={true}
              />
            )}
          </label>
          <div className="my-3">
            {images &&
              images.map((img) => (
                <Badge
                  key={img.public_id}
                  count="X"
                  onClick={() => handleRemoveImage(img.public_id)}
                  style={{ cursor: "pointer" }}
                >
                  <Avatar
                    src={img.url}
                    size={110}
                    className="m-2"
                    shape="square"
                  />
                </Badge>
              ))}
            {images.length >= 1 && (
              <div className="my-4">
                <button
                  onClick={handleUpdatePhoto}
                  className="btn btn-sm btn-primary"
                >
                  update
                </button>
              </div>
            )}
          </div>

          <ProfilePhotos
            userData={userData}
            mode={mode}
            setVisible={setVisible}
            modalType={modalType}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploadModal;

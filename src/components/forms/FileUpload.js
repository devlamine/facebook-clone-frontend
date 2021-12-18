import React from "react";
// import Resizer from "react-image-file-resizer";
import axios from "axios";
import { isAuthenticated } from "../../functions/auth";
import { PlusOutlined } from "@ant-design/icons";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

const FileUpload = ({
  mode,
  values,
  setValues,
  setLoading,
  photoIcon,
  pathName,
  multiple,
  btn,
}) => {
  const token = isAuthenticated().token;
  console.log();

  const fileUploadAndResize = (e) => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        let uploadedImages = values;

        if (files) {
          setLoading(true);

          axios
            .post(
              `${process.env.REACT_APP_API}/${pathName}`,
              { image: reader.result },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              uploadedImages.push(res.data);
              setValues(uploadedImages);
              setLoading(false);
            })
            .catch((err) => {
              console.log("Cloudinary image uplaod failed--->", err);
              setLoading(false);
            });
        }
      };
    }
  };

  return (
    <>
      <div className="row mx-1">
        {!btn ? (
          <label>
            <PhotoLibraryIcon
              style={{ fontSize: "25px", color: "green", cursor: "pointer" }}
            />
            <input
              type="file"
              multiple={multiple}
              accept="images/*"
              hidden
              onChange={fileUploadAndResize}
            />
          </label>
        ) : (
          <label className="btn btn-primary btn-sm p-0 px-1">
            <div className="d-flex justify-content-center align-items-center">
              <PlusOutlined style={{ fontSize: "21px" }} />
              <p className="mx-2 my-2 ">Upload photo</p>
            </div>
            <input
              type="file"
              multiple={multiple}
              // accept="images/*"
              hidden
              onChange={fileUploadAndResize}
            />
          </label>
        )}
      </div>
    </>
  );
};

export default FileUpload;

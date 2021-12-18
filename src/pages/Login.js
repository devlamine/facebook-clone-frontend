import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { isAuthenticated } from "../functions/auth";
import FbTextLogo from "../Images/fbText.svg";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated()) {
      history.push("/");
    }
  }, []);
  return (
    <div className="container p-0 m-1">
      <div className="row">
        <div className="col-md-6">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "160%", paddingLeft: "40px" }}
          >
            <span>
              <img src={FbTextLogo} alt="FaceBook" width="300px" />
              <p style={{ marginLeft: "29px", fontSize: "1.1rem" }}>
                Connect with friends and the world around you on Facebook.
              </p>
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "160%", width: "130%" }}
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

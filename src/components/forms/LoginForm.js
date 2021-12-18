import React, { useState } from "react";
import { authanticate, signIn } from "../../functions/auth";
import RegisterModal from "../modal/RegisterModal";
import { useHistory } from "react-router-dom";
import "./login.css";

const LoginForm = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const [successInfo, setSuccessInfo] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegisterModal = () => {
    setIsVisible(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((res) => {
        authanticate(res.data, () => {
          history.push("/");
          setErrMessage("");
        });
      })
      .catch((e) => setErrMessage("Invalid credentials."));
  };
  return (
    <div className="login-form">
      {successInfo && (
        <p
          className="text-center my-3 bg-success p-2"
          style={{ color: "white" }}
        >
          Account has been created successfully! Please Login.
        </p>
      )}
      <form className="login-form-form" onSubmit={handleSubmit}>
        <div className="fb-login-input">
          <input
            type="text"
            placeholder="Email Address"
            className="form-control"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMessage("");
            }}
          />
        </div>
        <div className="fb-login-input">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrMessage("");
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block w-75 m-2">
          Log In
        </button>
        {errMessage.length > 1 && (
          <p className="text-center py-1 text-danger">{errMessage}</p>
        )}
        <p>Forgot Password?</p>
        <p className="btn btn-success" onClick={handleRegisterModal}>
          Create New Account
        </p>
      </form>
      <RegisterModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setSuccessInfo={setSuccessInfo}
      />
    </div>
  );
};

export default LoginForm;

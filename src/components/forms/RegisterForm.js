import React, { useState } from "react";
import { signUp } from "../../functions/auth";

const RegisterForm = ({ setIsVisible, setSuccessInfo }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [checkErr, setCheckErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      password,
      email,
      birthday,
      gender,
    };
    signUp(userData)
      .then((res) => {
        if (res.data.success) {
          setIsVisible(false);
          setSuccessInfo(true);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setBirthday("");
          setGender("");
        } else if (res.data.message) {
          console.log(res.data.message);
          setCheckErr(true);
          setErrMessage(res.data.message);
        } else {
          setIsVisible(true);
          setSuccessInfo(false);
          setCheckErr(true);
          setErrMessage("Failed to create account. Please try again.");
        }
      })
      .catch((e) => {
        setErrMessage("Failed to create account. Please try again.");
        setCheckErr(true);
      });
  };
  return (
    <div>
      <h2 style={{ lineHeight: "13px" }}>Sign Up</h2>
      <p>It’s quick and easy.</p>
      <hr />
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                placeholder="First name"
                className="form-control my-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control my-2"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group my-2">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group my-2">
          <input
            type="password"
            placeholder="New password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group my-2">
          <label>Birthday</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setBirthday(e.target.value)}
            required
            value={birthday}
          />
        </div>
        <div className="form-group my-2">
          <label>Gender</label>
          <select
            className="form-control"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" defaultValue>
              Please Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="text-center mt-2">
          <button className="btn btn-success" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      {checkErr && <p className="text-center text-danger my-3">{errMessage}</p>}
    </div>
  );
};

export default RegisterForm;

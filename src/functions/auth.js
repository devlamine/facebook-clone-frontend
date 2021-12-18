import axios from "axios";

export const signUp = async (userData) =>
  axios.post(`${process.env.REACT_APP_API}/register-user`, { userData });

export const signIn = async (email, password) =>
  axios.post(`${process.env.REACT_APP_API}/login`, { email, password });

export const authanticate = (jwt, next) => {
  if (typeof window != undefined) {
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === false) {
    return false;
  } else {
    if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  }
};

export const updateUserLocal = (user, next) => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("jwt")) {
      let auth = JSON.parse(sessionStorage.getItem("jwt"));
      auth.user = user;
      sessionStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

export const signOut = (next) => {
  if (typeof window !== undefined) {
    sessionStorage.removeItem("jwt");
    next();

    return axios.get(`${process.env.REACT_APP_API}/logout`);
  }
};

import axios from "axios";

export const getUser = (token, userId) =>
  axios.get(`${process.env.REACT_APP_API}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllOnlineUsers = (token, userIds, userId) =>
  axios.post(
    `${process.env.REACT_APP_API}/user/getOnlineUsers`,
    {
      userIds,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateProfile = (token, userId, profilePhoto, photoType = "") =>
  axios.put(
    `${process.env.REACT_APP_API}/user/${userId}`,
    {
      profilePhoto,
      photoType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getListOfusers = (token, userId) =>
  axios.get(`${process.env.REACT_APP_API}/user/friend-suggestions/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addToFriendList = (token, userId, requestedUserId) =>
  axios.put(
    `${process.env.REACT_APP_API}/user/add-following/${userId}`,
    {
      requestedUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const unFriend = (token, userId, requestedUserId) =>
  axios.put(
    `${process.env.REACT_APP_API}/user/unfriend/${userId}`,
    {
      requestedUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeFriendRequest = (token, userId, requestedUserId) =>
  axios.put(
    `${process.env.REACT_APP_API}/user/remove-friend-request/${userId}`,
    {
      requestedUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const confirmFriendRst = (
  token,
  userId,
  requestedUserId,
  userName,
  loggedInUserName
) =>
  axios.put(
    `${process.env.REACT_APP_API}/user/confirm-friend/${userId}`,
    {
      requestedUserId,
      userName,
      loggedInUserName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const declineFriendRst = (token, userId, requestedUserId) =>
  axios.put(
    `${process.env.REACT_APP_API}/user/decline-request/${userId}`,
    {
      requestedUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getBirthdaysInfo = (token, userId) =>
  axios.get(`${process.env.REACT_APP_API}/user/birthdays/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

import axios from "axios";

export const createConversation = (token, conversationInfo) =>
  axios.post(
    `${process.env.REACT_APP_API}/conversations`,
    { conversationInfo },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getConversation = (token, userId) =>
  axios.get(`${process.env.REACT_APP_API}/conversations/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getChatsByConId = (token, conversationId, page, limit) =>
  axios.get(
    `${process.env.REACT_APP_API}/chat/${conversationId}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getChatForPopUpView = (token, userId, requestedUserId) =>
  axios.get(
    `${process.env.REACT_APP_API}/conversations/${userId}/${requestedUserId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const postNewMsg = (token, conversationId, senderId, text) =>
  axios.post(
    `${process.env.REACT_APP_API}/chat/`,
    { conversationId, senderId, text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

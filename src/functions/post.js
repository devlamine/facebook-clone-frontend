import axios from "axios";
import { isAuthenticated } from "./auth";

export const createPost = (token, post, from, userId = null) =>
  axios.post(
    `${process.env.REACT_APP_API}/new-post`,
    { post, from, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const fetchPosts = (token, limit, page) =>
  axios.get(
    `${process.env.REACT_APP_API}/getPosts?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const fetchPostsByuser = (token, userId, page, limit) =>
  axios.get(
    `${process.env.REACT_APP_API}/getPosts/${userId}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const like = (token, postId, userId) =>
  axios.put(
    `${process.env.REACT_APP_API}/post/like`,
    { postId, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const disLike = (token, postId, userId) =>
  axios.put(
    `${process.env.REACT_APP_API}/post/dislike`,
    { postId, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const postComment = (token, postId, userId, comment) =>
  axios.put(
    `${process.env.REACT_APP_API}/post/comment`,
    { postId, userId, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

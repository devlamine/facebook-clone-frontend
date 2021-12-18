import axios from "axios";

export const createStory = (token, userId, storyImages) =>
  axios.post(
    `${process.env.REACT_APP_API}/stories/create/${userId}`,
    { storyImages },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getStories = (token, userId) =>
  axios.get(`${process.env.REACT_APP_API}/stories/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

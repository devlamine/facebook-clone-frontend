export const minimizedChatReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_CHAT_MINIMIZED":
      return action.payload;
    default:
      return state;
  }
};

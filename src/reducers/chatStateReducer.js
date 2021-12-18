export const chatStateReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_CHAT_POP_UP":
      return action.payload;
    default:
      return state;
  }
};

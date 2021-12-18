export const chatReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CHAT":
      return action.payload;
    default:
      return state;
  }
};

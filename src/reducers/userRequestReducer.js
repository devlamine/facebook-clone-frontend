export const userRequestReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_REQUEST":
      return action.payload;
    default:
      return state;
  }
};

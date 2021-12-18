export const selectedUserDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_USER_DATA":
      return action.payload;
    default:
      return state;
  }
};

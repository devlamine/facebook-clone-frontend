let intialState = "light";
if (typeof window !== "undefined") {
  if (localStorage.getItem("mode")) {
    intialState = localStorage.getItem("mode");
  }
}
export const modeReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_MODE":
      return action.payload;
    default:
      return state;
  }
};

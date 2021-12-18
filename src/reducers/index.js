import { combineReducers } from "redux";
import { chatReducer } from "./chatReducer";
import { chatStateReducer } from "./chatStateReducer";
import { minimizedChatReducer } from "./minimizedChat";
import { modeReducer } from "./modeReducer";
import { onlineUsersReducer } from "./onlineUsers";
import { selectedUserDataReducer } from "./selctedUserDataReducer";
import { userRequestReducer } from "./userRequestReducer";

const rootReducer = combineReducers({
  mode: modeReducer,
  userRequest: userRequestReducer,
  chats: chatReducer,
  chatPopUpRedux: chatStateReducer,
  userDataRedux: selectedUserDataReducer,
  chatPopUpMinimized: minimizedChatReducer,
  onlineUsersRedux: onlineUsersReducer,
});

export default rootReducer;

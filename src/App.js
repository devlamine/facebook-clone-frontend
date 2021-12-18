import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Notification from "./pages/Notification";
import TimeLine from "./pages/TimeLine";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import UserRoute from "./Routes/UserRoute";
import FriendsHome from "./components/friends/FriendsHome";
import Suggestions from "./components/friends/Suggestions";
import AllFriends from "./components/friends/AllFriends";
import FriendRequests from "./components/friends/FriendRequests";
import Createstory from "./components/story/Createstory";
import ChatPopUp from "./components/chats/ChatPopUp";
import { useSelector } from "react-redux";

const App = () => {
  const { chatPopUpRedux, userDataRedux, chatPopUpMinimized } = useSelector(
    (state) => ({
      ...state,
    })
  );

  return (
    <>
      {chatPopUpRedux && !chatPopUpMinimized && (
        <ChatPopUp userData={userDataRedux} chatPopUp={chatPopUpRedux} />
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat-room" component={Chat} />
        {/* <Route exact path="/notifications" component={Notification} /> */}

        <Route exact path="/timeline/:userIdParams" component={TimeLine} />
        <Route
          exact
          path="/friends/home/:userIdParams"
          component={FriendsHome}
        />
        <Route
          exact
          path="/friends/suggestions/:userIdParams"
          component={Suggestions}
        />
        <Route
          exact
          path="/friends/all-friends/:userIdParams"
          component={AllFriends}
        />
        <Route
          exact
          path="/friends/friend-request/:userIdParams"
          component={FriendRequests}
        />
        <Route exact path="/stories/create" component={Createstory} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;

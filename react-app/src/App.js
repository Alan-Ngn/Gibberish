import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/SideNavigation";
import ChannelById from "./components/ChannelById";
import "./index.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { io } from 'socket.io-client';
import { loadUsersThunk } from "./store/user";
import TopNavigation from "./components/TopNavigation";
import SplashPage from "./components/Splash";
let socket;
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.on("chat", (chat) => {
        // Whenver a chat is sent, Dispatch our fetch to get all messages and set the messages to the returned list
        dispatch(authenticate())
    })
    socket.on("all", (chat) => {
        // dispatch(authenticate())
        dispatch(loadUsersThunk())
    })
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
}, [])

  return (
    <>
      <div className="site">
        <Route exact path='/' component={SplashPage}/>
        <Route path="/login" component={LoginFormPage} />
        <Route path="/signup" component={SignupFormPage}/>
            <TopNavigation isLoaded={isLoaded}/>
        <ProtectedRoute>

            <div className="content">
              <Navigation socket={socket} isLoaded={isLoaded} />
            {isLoaded && (
              <Switch>
                <Route path='/channels/:channelId' render={(props)=> <ChannelById {...props} socket={socket}/> } />
              </Switch>
            )}
            </div>
      </ProtectedRoute>
      </div>
    </>
  );
}

export default App;

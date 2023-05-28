import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ChannelById from "./components/ChannelById";
import "./index.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { io } from 'socket.io-client';
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
        dispatch(authenticate())
    })
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
}, [])

  return (
    <>
      <div className="site">
        <Route path="/login" component={LoginFormPage} />
        <Route path="/signup" component={SignupFormPage}/>
        <ProtectedRoute>
          <div className="nav-list-wrapper">
            <Navigation socket={socket} isLoaded={isLoaded} />
          </div>
          {isLoaded && (
            <Switch>
              <Route path='/channels/:channelId' render={(props)=> <ChannelById {...props} socket={socket}/> } />
            </Switch>
          )}
      </ProtectedRoute>
      </div>
    </>
  );
}

export default App;

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
import RightNavigation from "./components/RightNavigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="site">
        <Route path="/login" component={LoginFormPage} />
        <Route path="/signup" component={SignupFormPage}/>
        <ProtectedRoute>
          <div className="nav-list-wrapper">
            <Navigation isLoaded={isLoaded} />
          </div>
          {isLoaded && (
            <Switch>
              <Route path='/channels/:channelId' component={ChannelById} />
            </Switch>
          )}
          <div className="nav-right-list-wrapper">
            <RightNavigation isLoaded={isLoaded} />
          </div>
      </ProtectedRoute>
      </div>
    </>
  );
}

export default App;

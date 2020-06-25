import React from "react";
import "./components.scss";
import NavbarComponent from "./NavbarComponent";
import LoginPage from "./LoginPage";
import MainPage from "./Mainpage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ComponentsHolder = () => {
  return (
    <Router>
      <div className="components-holder">
        <NavbarComponent />
        <Switch>
          <Router exact path="/">
            <MainPage />
          </Router>
          <Router exact path="/login">
            <LoginPage />
          </Router>
        </Switch>
      </div>
    </Router>
  );
};

export default ComponentsHolder;

import React from "react";
import "./components.scss";
import NavbarComponent from "./NavbarComponent";
import LoginPage from "./LoginPage";
import RegisterPage from './RegisterPage'
import MainPage from "./Mainpage";
import { BrowserRouter as Router, Switch } from "react-router-dom";

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
          <Router exact path="/register">
            <RegisterPage />
          </Router>
        </Switch>
      </div>
    </Router>
  );
};

export default ComponentsHolder;

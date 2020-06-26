import React from "react";
import "./components.scss";
import NavbarComponent from "./NavbarComponent";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MainPage from "./Mainpage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyCr1vWrOs6t1wVYlgQIjjebBl86WtgAP14",
  authDomain: "codolist-application.firebaseapp.com",
  databaseURL: "https://codolist-application.firebaseio.com",
  projectId: "codolist-application",
  storageBucket: "codolist-application.appspot.com",
  messagingSenderId: "1075781285003",
  appId: "1:1075781285003:web:cb9adfd7cb47005b06108e",
  measurementId: "G-FZ4ELN8EK3",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const ComponentsHolder = () => {
  return (
    <Router>
      <div className="components-holder">
        <NavbarComponent />
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default ComponentsHolder;

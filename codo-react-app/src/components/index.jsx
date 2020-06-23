import React from "react";
import "./components.scss";
import NavbarComponent from "./NavbarComponent";
import MainPage from "./Mainpage";

const ComponentsHolder = () => {
  return (
    <div className="components-holder">
      <NavbarComponent />
      <MainPage />
    </div>
  );
};

export default ComponentsHolder;

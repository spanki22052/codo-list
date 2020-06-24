import React from "react";
import { Component } from "react";
import "./main.scss";

class MainPageComponent extends Component {
  render() {
    return (
      <div className="main-page">
        <div className="photo-block">
          <div className="text-block">
            <h1>
              <span className="upside">Real comfortable</span> <br />
              and beautiful.
            </h1>
            <p>
              By using CodoList you will achive your goals more better, than you
              could earlier...
            </p>
          </div>
          <button>Start use</button>
        </div>

        <div className="todo-photo-block">
          <div className="main-text">
            <h1>Beautiful todo blocks</h1>
          </div>
          <div className="objects-holder">
            <img src="/images/todoblock-image.png" alt="todolistblock" />
            <p>
              With CodoList you will can to controll your tasks with comfortable
              todo blocks
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPageComponent;

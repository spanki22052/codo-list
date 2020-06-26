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
          <a href="/login">
            <button>Start use</button>
          </a>
        </div>

        <div className="todo-photo-block">
          <div className="main-text">
            <h1>Beautiful todo blocks</h1>
          </div>
          <div className="objects-holder">
            <div className="image-holder">
              <img src="/images/todoblock-image.png" alt="todolistblock" />
            </div>
            <p>
              With CodoList you will can to controll your tasks with comfortable
              todo blocks
            </p>
          </div>
        </div>
        <br />
        <div className="configures-block">
          <div className="img-holder">
            <img src="/images/processbar-image.png" alt="processbar" />
          </div>
          <h1>Processbars</h1>
          <p>
            You can controll your tasks by editing percentage of completed task.
            Also you can choose importance of your task.
          </p>
        </div>
        <br />
        <div className="configures-block">
          <div className="img-holder">
            <img src="/images/configure-image.png" alt="configure" />
          </div>
          <h1>Editing system</h1>
          <p>
            You can controll all your tasks. Edit them, remove, reset all and
            more...
          </p>
        </div>
        <br />
      </div>
    );
  }
}

export default MainPageComponent;

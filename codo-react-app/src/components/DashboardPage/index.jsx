import React, { Component } from "react";
import "./dashboard.scss";
import NewTodo from "./NewTodo";
const firebase = require("firebase");

class DasboardPageComponent extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      email: "",
      showNew: "none",
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/");
      else {
        await firebase
          .firestore()
          .collection("todo")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async (res) => {
            await this.setState({
              email: _usr.email,
            });

            firebase
              .firestore()
              .collection("todo")
              .doc(_usr.email)
              .get()
              .then((info) => {
                info.data() !== undefined &&
                  this.setState({ todos: info.data().todolist });
              });
          });
      }
    });
  };

  colorCheck = (percentage) => {
    if (percentage < 35 && percentage === 0) {
      return "#0DC160";
    } else if (percentage < 60) {
      return "#FCD400";
    } else {
      return "#FE0000";
    }
  };

  render() {
    return (
      <div className="dashboard-page">
        <NewTodo
          showNew={this.state.showNew}
          todos={this.state.todos}
          email={this.state.email}
          addTodo={(newTodo) =>
            this.setState({ todos: [...this.state.todos, newTodo] })
          }
          changeDisplay={() => this.setState({ showNew: "none" })}
        />
        {this.state.todos.length > 0 ? (
          <div className="todo-blocks">
            {this.state.todos.map((element, index) => {
              let percentageCounter = 440 + element.percentage * 2 + 10;
              return (
                <div key={index} className="todo-block">
                  <div className="processbar-side">
                    <div className="percent">
                      <svg>
                        <circle cx="35" cy="35" r="35"></circle>
                        <circle
                          cx="35"
                          cy="35"
                          r="35"
                          id="to-change"
                          style={{
                            strokeDashoffset: `-${percentageCounter}`,
                            stroke: `${this.colorCheck(element.percentage)}`,
                          }}
                        ></circle>
                      </svg>
                      <div className="number">
                        <h2>
                          {element.percentage} <span>%</span>
                        </h2>
                      </div>
                    </div>
                    <button className="edit-button">Edit</button>
                    <button className="finish-button">Finish</button>
                  </div>
                  <div className="text-side">
                    <h1>{element.todo}</h1>
                    <p>{element.description}</p>
                  </div>
                </div>
              );
            })}
            <div className="new-block">
              <button onClick={() => this.setState({ showNew: "block" })}>
                +
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-holder">
              <h1 className="gray-text">You don't have any tasks for today</h1>
            </div>
            <div className="gray-box">
              <button onClick={() => this.setState({ showNew: "block" })}>
                +
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DasboardPageComponent;

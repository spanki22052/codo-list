import React, { Component } from "react";
import "./dashboard.scss";
const firebase = require("firebase");

class DasboardPageComponent extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      email: "",
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
  render() {
    return (
      <div className="dashboard-page">
        {this.state.todos.length > 0 ? (
          <div className="todo-blocks">
            <div className="todo-block">
              <div className="processbar-side">
                <button className="edit-button">Edit</button>
                <button className="finish-button">Finish</button>
              </div>
              <div className="text-side">
                <h1>Start to work on CodoList</h1>
                <p>Create some todo task on CodoList application</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-holder">
              <h1 className="gray-text">You don't have any tasks for today</h1>
            </div>
            <div className="gray-box">
              <button>+</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DasboardPageComponent;

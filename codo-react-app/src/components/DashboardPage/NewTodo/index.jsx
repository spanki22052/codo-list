import React, { Component } from "react";
import "./new.scss";
const firebase = require("firebase");

class NewTodo extends Component {
  constructor() {
    super();
    this.state = {
      todoInput: "",
      descriptionInput: "",
    };
  }

  render() {
    return (
      <div style={{ display: this.props.showNew }} className="newtodo">
        <div className="input-block">
          <p>Task:</p>
          <input
            value={this.state.todoInput}
            onChange={(e) => this.setState({ todoInput: e.target.value })}
            type="text"
          />
        </div>
        <div className="input-block">
          <p>Description:</p>
          <textarea
            value={this.state.descriptionInput}
            onChange={(e) =>
              this.setState({ descriptionInput: e.target.value })
            }
            type="text"
          />
        </div>
        <div className="buttons-side">
          <button onClick={this.props.changeDisplay} className="close-btn">
            Close
          </button>
          <button onClick={this.createNewTodo} className="ready-btn">
            Ready
          </button>
        </div>
      </div>
    );
  }

  createNewTodo = () => {
    this.state.todoInput.length > 0 && this.state.descriptionInput.length > 0
      ? firebase
          .firestore()
          .collection("todo")
          .doc(this.props.email)
          .set({
            todolist: [
              ...this.props.todos,
              {
                description: this.state.descriptionInput,
                isFinished: false,
                percentage: 0,
                todo: this.state.todoInput,
              },
            ],
          })
          .then((dbError) => {
            console.log(dbError);
            this.setState({ signupError: "Failed to load user" });
          })
      : console.log("can't create");

    this.state.todoInput.length > 0 &&
      this.state.descriptionInput.length > 0 ? 
      this.props.addTodo({
        description: this.state.descriptionInput,
        isFinished: false,
        percentage: 0,
        todo: this.state.todoInput,
      }) : console.log('mistake')
    this.setState({ todoInput: "", descriptionInput: "" });
  };
}

export default NewTodo;

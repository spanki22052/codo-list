import React, { Component } from "react";
import "./edit.scss";
const firebase = require("firebase");

class EditTodo extends Component {
  constructor() {
    super();
    this.state = {
      todoInput: "",
      descriptionInput: "",
      editPercentage: 0,
    };
  }

  componentWillMount() {
    this.setState({
      todoInput: this.props.todo,
      descriptionInput: this.props.desc,
    });
  }

  render() {
    return (
      <div style={{ display: this.props.showNew }} className="edit-todo">
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
        <div className="perc-side">
          <div className="input-block">
            <p>Completed to %:</p>
            <input
              value={this.state.editPercentage}
              onChange={(e) =>
                this.setState({ editPercentage: e.target.value })
              }
              type="text"
            />
          </div>
        </div>
        <div className="buttons-side">
          <button
            onClick={() => {
              this.props.changeDisplay();
              this.setState({
                todoInput: "",
                descriptionInput: "",
                editPercentage: "",
              });
            }}
            className="close-btn"
          >
            Close
          </button>
          <button className="edit-btn">Remove</button>
          <button onClick={this.editTodo} className="ready-btn">
            Ready
          </button>
        </div>
      </div>
    );
  }

  editTodo = () => {
    const todolist = [...this.props.todos];

    todolist[this.props.index] = {
      description: this.state.descriptionInput,
      isFinished: [todolist[this.props.index].isFinished][0],
      percentage: this.state.editPercentage,
      todo: this.state.todoInput,
    };

    this.props.changeTodo(todolist);

    this.state.todoInput.length > 0 &&
    this.state.todoInput.length < 25 &&
    this.state.descriptionInput.length > 0 &&
    this.state.descriptionInput.length < 50
      ? firebase
          .firestore()
          .collection("todo")
          .doc(this.props.email)
          .set({
            todolist,
          })
          .then((dbError) => {
            console.log(dbError);
            this.setState({ signupError: "Failed to load user" });
          })
      : console.log("can't create");
  };
}

export default EditTodo;

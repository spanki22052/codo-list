import React, { Component } from "react";
import "./dashboard.scss";
import NewTodo from "./NewTodo";
import EditTodo from "./EditTodo";
const firebase = require("firebase");

class DasboardPageComponent extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      email: "",
      showNew: "none",
      showEdit: "none",
      itemsFilter: [true],
      returnEditBlock: null,
      editIndex: 0,
    };
  }

  componentDidMount = () => {
    console.log("hello wolrd");
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

  returnEditBlock(desc, todo, index) {
    this.setState({
      returnEditBlock: (
        <EditTodo
          showNew="block"
          todos={this.state.todos}
          email={this.state.email}
          index={index}
          desc={desc}
          todo={todo}
          changeTodo={(newTodo) => this.setState({ todos: newTodo })}
          changeDisplay={() => this.setState({ returnEditBlock: null })}
        />
      ),
    });
  }

  colorCheck = (percentage) => {
    if (percentage < 35) {
      return "#0DC160";
    } else if (percentage < 60) {
      return "#FCD400";
    } else {
      return "#FE0000";
    }
  };

  changeElementByIndex = (index, bool) => {
    const newTodos = [...this.state.todos];
    newTodos[index].isFinished = bool;

    newTodos[index].percentage < 100
      ? (newTodos[index].percentage = 100)
      : (newTodos[index].percentage = 0);
    console.log(newTodos[index].percentage);
    this.setState({ todos: newTodos });
    firebase
      .firestore()
      .collection("todo")
      .doc(this.state.email)
      .set({
        todolist: [...newTodos],
      });
  };

  todosFilteredChanged = (action) => {
    this.setState({
      itemsFilter: [action],
    });
  };

  render() {
    return (
      <div className="dashboard-page">
        <NewTodo
          showNew={this.state.showNew}
          todos={this.state.todos}
          email={this.state.email}
          inputList={this.state.editInputs}
          addTodo={(newTodo) =>
            this.setState({ todos: [...this.state.todos, newTodo] })
          }
          changeDisplay={() => this.setState({ showNew: "none" })}
        />
        {this.state.returnEditBlock}
        {this.state.todos.length > 0 && (
          <div className="buttons-block">
            <button
              className="finished-btn"
              onClick={() => this.setState({ itemsFilter: [true] })}
            >
              Finished
            </button>
            <button
              onClick={() => this.setState({ itemsFilter: [false] })}
              className="unfinished-btn"
            >
              Not Finished
            </button>
          </div>
        )}
        {this.state.todos.length > 0 ? (
          <div className="todo-blocks">
            {this.state.todos.map((element, index) => {
              let percentageCounter =
                440 + element.percentage * 2 + element.percentage / 6;
              return (
                element.isFinished === this.state.itemsFilter[0] && (
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
                      <button
                        onClick={() => {
                          this.setState({
                            showEdit: "block",
                            editIndex: index,
                          });
                          this.returnEditBlock(
                            element.description,
                            element.todo,
                            index
                          );
                        }}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          this.changeElementByIndex(
                            index,
                            !this.state.itemsFilter[0]
                          )
                        }
                        className="finish-button"
                      >
                        Finish
                      </button>
                    </div>
                    <div className="text-side">
                      <h1>{element.todo}</h1>
                      <p>{element.description}</p>
                    </div>
                  </div>
                )
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

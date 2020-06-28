import React, { Component } from "react";
import "./register.scss";
const firebase = require("firebase");

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      inputEmail: "",
      passwordInput: "",
      repeatPasswordInput: "",
      signupError: null,
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (_usr) this.props.history.push("/dashboard");
    });
  };

  render() {
    return (
      <div className="register-page">
        <h1>Register</h1>
        <div className="line"></div>
        <div className="input-block">
          <p>email:</p>
          <input
            type="text"
            value={this.state.inputEmail}
            onChange={(e) => this.setThisElements(e, "email")}
          />
        </div>
        <div className="input-block">
          <p>password:</p>
          <input
            value={this.state.passwordInput}
            onChange={(e) => this.setThisElements(e, "password")}
            type="password"
          />
        </div>
        <div className="input-block">
          <p>repeat password:</p>
          <input
            type="password"
            value={this.state.repeatPasswordInput}
            onChange={(e) => this.setThisElements(e, "repeat")}
          />
        </div>
        <div className="buttons-block">
          <button onClick={this.registerNewPerson}>Register</button>
        </div>
        <div className="login-a">
          <a href="/login">Login</a>
        </div>
        <p className="signup-error">{this.state.signupError}</p>
      </div>
    );
  }
  setThisElements = (e, type) => {
    switch (type) {
      case "email":
        this.setState({ inputEmail: e.target.value });
        break;
      case "password":
        this.setState({ passwordInput: e.target.value });
        break;
      case "repeat":
        this.setState({ repeatPasswordInput: e.target.value });
        break;
      default:
        break;
    }
  };

  registerNewPerson = () => {
    this.state.passwordInput === this.state.repeatPasswordInput &&
    this.state.repeatPasswordInput.length > 0 &&
    this.state.inputEmail.length > 0
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.inputEmail,
            this.state.passwordInput
          )
          .then(
            (autRes) => {
              firebase
                .firestore()
                .collection("users")
                .doc(this.state.inputEmail)
                .set({
                  email: this.state.inputEmail,
                  password: this.state.passwordInput,
                })
                .then(
                  () => {
                    this.props.history.push("/dashboard");
                  },
                  (dbError) => {
                    console.log(dbError);
                    this.setState({ signupError: "Failed to load user" });
                  }
                );
            },
            (authErr) => {
              console.log(authErr);
              this.setState({ signupError: "Failed to add user" });
            }
          )
          .then(
            (autRes) => {
              firebase
                .firestore()
                .collection("todo")
                .doc(this.state.inputEmail)
                .set({
                  todolist: [],
                })
                .then(
                  () => {
                    this.props.history.push("/dashboard");
                  },
                  (dbError) => {
                    console.log(dbError);
                    this.setState({ signupError: "Failed to load user" });
                  }
                );
            },
            (authErr) => {
              console.log(authErr);
              this.setState({ signupError: "Failed to add user" });
            }
          )
      : this.setState({ signupError: "Failed to add user" });
  };
}

export default RegisterPage;

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
          <a href="/login">
            <button>Login</button>
          </a>
          <button onClick={this.registerNewPerson}>Register</button>
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
              const userObj = {
                email: autRes.user.inputEmail,
                password: this.state.passwordInput,
              };

              firebase
                .firestore()
                .collection("users")
                .doc(this.state.inputEmail)
                .set(userObj)
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
    this.setState({
      inputEmail: "",
      passwordInput: "",
      repeatPasswordInput: "",
    });
  };
}

export default RegisterPage;

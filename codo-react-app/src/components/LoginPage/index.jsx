import React, { Component } from "react";
import "./login.scss";
const firebase = require("firebase");

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      emailInput: "",
      passwordInput: "",
      loginError: null
    };
  }

  render() {
    return (
      <div className="login-page">
        <h1>Login</h1>
        <div className="line"></div>
        <div className="input-block">
          <p>email:</p>
          <input
            type="text"
            value={this.state.emailInput}
            onChange={(e) => this.setState({ emailInput: e.target.value })}
          />
        </div>
        <div className="input-block">
          <p>password:</p>
          <input
            type="password"
            value={this.state.passwordInput}
            onChange={(e) => this.setState({ passwordInput: e.target.value })}
          />
        </div>
        <div className="buttons-block">
          <button onClick={this.signIn}>Login</button>
          <a href="/register">
            <button>Register</button>
          </a>
        </div>
        <p className="login-error">{this.state.loginError}</p>
      </div>
    );
  }

  signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.emailInput,
        this.state.passwordInput
      )
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        (err) => {
          this.setState({ loginError: "Server error" });
          console.log(err);
        }
      );
  };
}

export default LoginPage;

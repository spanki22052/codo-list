import React, { Component } from "react";
import "./login.scss";
const firebase = require("firebase");

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      emailInput: "",
      passwordInput: "",
      loginError: null,
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (_usr) this.props.history.push("/dashboard");
    });
  };

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
        </div>
        <div className="login-a">
          <a href="/register">Register</a>
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

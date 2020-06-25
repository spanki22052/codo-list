import React, { Component } from "react";
import "./login.scss";

class LoginPage extends Component {
  constructor() {
    
  }

  render() {
    return (
      <div className="login-page">
        <h1>Login</h1>
        <div className="line"></div>
        <div className="input-block">
          <p>email:</p>
          <input type="text" />
        </div>
        <div className="input-block">
          <p>password:</p>
          <input type="password" />
        </div>
        <div className="buttons-block">
          <button>Login</button>
          <a href="/register">
            <button>Register</button>
          </a>
        </div>
      </div>
    );
  }
}

export default LoginPage;

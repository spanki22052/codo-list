import React, { Component } from "react";
import "./register.scss";

class RegisterPage extends Component {
  render() {
    return (
      <div className="login-page">
        <h1>Register</h1>
        <div className="line"></div>
        <div className="input-block">
          <p>email:</p>
          <input type="text" />
        </div>
        <div className="input-block">
          <p>password:</p>
          <input type="password" />
        </div>
        <div className="input-block">
          <p>repeat password:</p>
          <input type="password" />
        </div>
        <div className="buttons-block">
          <a href="/login">
            <button>Login</button>
          </a>
          <button>Register</button>
        </div>
      </div>
    );
  }
}

export default RegisterPage;

import React, { Component } from "react";
const firebase = require("firebase");

class DasboardPageComponent extends Component {
  render() {
    return (
      <div className="dashboard-page">
        <h1>Hello from dashboard page</h1>
      </div>
    );
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/");
      else {
        await firebase
          .firestore()
          .collection("todo")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async (res) => {
            const todos = res.docs.map((_doc) => _doc.data());
            await this.setState({
              todos: todos,
              email: _usr.email,
            });
          });
      }
    });
  };
}

export default DasboardPageComponent;

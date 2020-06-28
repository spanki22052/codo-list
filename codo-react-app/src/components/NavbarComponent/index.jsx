import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  orangeColor,
  darkBackground,
  montserratFont,
  NavLinkStyle,
} from "./styles";
const firebase = require("firebase");

class NavbarComponent extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      todos: [],
    };
  }

  render() {
    return (
      <div className="navbar-component">
        <Navbar style={{ backgroundColor: "#182023", zIndex: "100" }} expand="lg">
          <Navbar.Brand
            style={{
              color: orangeColor,
              fontFamily: montserratFont,
              fontWeight: "900",
            }}
            href="/"
          >
            CodoList
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {this.state.email.length > 0 ? (
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav.Link style={NavLinkStyle} href="/dashboard">
                dashboard
              </Nav.Link>
              <Nav.Link
                onClick={this.firebaseSignOut}
                style={NavLinkStyle}
                href="/"
              >
                signout
              </Nav.Link>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav.Link style={NavLinkStyle} href="/login">
                login
              </Nav.Link>
            </Navbar.Collapse>
          )}
        </Navbar>
      </div>
    );
  }

  firebaseSignOut = () => {
    firebase.auth().signOut();
    this.setState({ isLoggedIn: false });
  };

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) console.log("You aren't logged in");
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

export default NavbarComponent;

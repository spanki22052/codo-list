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
        {console.log(this.state.email)}
        <Navbar style={darkBackground} expand="lg">
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
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav.Link style={NavLinkStyle} href="/">
              home
            </Nav.Link>
            {this.state.email.length > 0 ? (
              <Nav.Link
                onClick={this.firebaseSignOut}
                style={NavLinkStyle}
                href="/"
              >
                signout
              </Nav.Link>
            ) : (
              <Nav.Link style={NavLinkStyle} href="/signup">
                signup
              </Nav.Link>
            )}
          </Navbar.Collapse>
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

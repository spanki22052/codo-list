import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  orangeColor,
  darkBackground,
  montserratFont,
  NavLinkStyle,
} from "./styles";
import { Link } from "react-router-dom";

class NavbarComponent extends Component {
  render() {
    return (
      <div className="navbar-component">
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
            <Nav.Link style={NavLinkStyle} href='/'>home</Nav.Link>
            <Nav.Link style={NavLinkStyle}>
              <Link to="/login" style={{ textDecoration: "none", color: orangeColor }}>
                login
              </Link>
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;

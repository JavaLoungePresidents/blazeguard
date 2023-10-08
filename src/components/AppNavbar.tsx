import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function AppNavbar() {
  return (
    <Navbar expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand className="m-0 logo" href="#home">
          Blaze<span>Guard</span>.
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="hamburger-menu"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <p>Searchbar.</p>
          </Nav>
          <Nav>
            <Nav.Link href="#about" className="nav-links">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

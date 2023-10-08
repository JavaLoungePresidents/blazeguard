import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import SearchBar from "@/components/SearchBar";

interface AppNavbarProps {
  updateGlobalLocation: (newLocation: Location) => void;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Location extends Coordinates {
  textLocation: string;
}

const AppNavbar = ({ updateGlobalLocation }: AppNavbarProps) => {
  const [location, setLocation] = useState<Location>({
    lat: 0,
    lng: 0,
    textLocation: "",
  });

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
    updateGlobalLocation(newLocation);
  };

  return (
    <Navbar expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand className="m-0 logo" href="/">
          Blaze<span>Guard</span>.
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="hamburger-menu"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <SearchBar onLocationChange={handleLocationChange} />
          </Nav>
          <Nav>
            <Nav.Link href="/about" className="nav-links">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

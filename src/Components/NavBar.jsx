import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { HashLink } from "react-router-hash-link";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="site-navbar"
    >
      <Container>
        <Navbar.Brand as={HashLink} to="/" className="site-navbar__brand">
          <svg
            className="site-navbar__mark"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 2.5 45.5 24 24 45.5 2.5 24 24 2.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M31 14H20.5a6 6 0 0 0 0 12h7a6 6 0 0 1 0 12H17"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <circle cx="34" cy="14" r="2" fill="currentColor" />
          </svg>
          <span className="site-navbar__wordmark">
            <span className="site-navbar__name">Shiloh</span>
            <small>Creative Studio</small>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav as="nav" aria-label="Main navigation" className="navlinks ms-auto">
            <Nav.Link as={HashLink} to="/#latest">
              Projects
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#service">
              Services
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#process">
              Process
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#contact"
              className="site-navbar__contact"
            >
              Contact Us
              <span aria-hidden="true">↗</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

import React, { Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import classes from "./Navigation.module.scss";
// import PropTypes from "prop-types";

// import  from "react";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Burger App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Burger builder
          </Link>
          <Link to="/checkout" className="nav-link">
            Checkout
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  //
};

export default Navigation;

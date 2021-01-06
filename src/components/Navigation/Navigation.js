import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import classes from "./Navigation.module.scss";
import PropTypes from "prop-types";
import { Fragment } from "react";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand green" href="#">
        Navbar
      </a>
      <ul className={`${classes.navbar_nav} navbar-nav`}>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Home
          </a>
        </li>
      </ul>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav bg-dark m-0 ml-lg-auto p-3 p-lg-0">
          <li className="nav-item">
            <a className="nav-link text-truncate" href="#spy0">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-truncate" href="#spy1">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-truncate" href="#spy2">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-truncate" href="#spy3">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-truncate"
              data-target="#codeply"
              href="//codeply.com"
            >
              Link
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  //
};

export default Navigation;

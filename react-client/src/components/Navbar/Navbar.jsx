import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// TODO: SET LINKS IN NAV

const Navbar = ({ currentUserUsername, currentUserAllergies }) => {
  // <div className="nav-main">
  //   <nav className="navbar navbar-dark bg-dark">
  //     <div className="container-fluid">
  //       <a className="navbar-brand" href="#">
  // <img
  //   className="logo"
  //   src={require("../../images/logo.png")}
  //   width="50"
  //   height="50"
  //   alt="Logo"
  // />
  // <h3 className="logo-title">RecipeMate</h3>
  //         <h1>Signed in as {currentUserUsername}</h1>
  //         <h1>Allergies are: {currentUserAllergies}</h1>
  //       </a>

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            className="logo"
            src={require("../../images/logo.png")}
            width="50"
            height="50"
            alt="Logo"
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/signup"}>Sign Up</Link>
            </li>
            <li className="nav-item dropdown"></li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Random from "../Random/Random";
import "./Navbar.css";

// TODO: SET LINKS IN NAV

const Navbar = (props) => {
  const navigate = useNavigate();

  const logMeOut = () => {
    axios({
      method: "POST",
      url: "/logout",
    })
      .then((response) => {
        props.token();
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });

  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link to={"/"}>
          <img
            className="logo"
            src={require("../../images/logo.png")}
            width="50"
            height="50"
            alt="Logo"
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "white",
                paddingLeft: "10px",
                paddingInline: "5px",
              }}
            >
              <li className="nav-item">
                <button className="btn btn-success btn-rounded">Home</button>
              </li>
            </Link>
            <li className="nav-item">
              <Link
                to={"/random"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  paddingInline: "5px",
                }}
              >
                <button className="btn btn-success">Random Recipe</button>
              </Link>
            </li>
            <li className="nav-item dropdown"></li>
            <li className="nav-item"></li>
          </ul>
          <div className="sign-out-btn">
            <button className="btn btn-outline-success" onClick={logMeOut}>
              Sign Out
            </button>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by name"
              aria-label="Search"
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

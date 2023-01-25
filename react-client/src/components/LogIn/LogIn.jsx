import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = (props) => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const logMeIn = (event) => {
    axios({
      method: "POST",
      url: "/token",
      data: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
        console.log(response);
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
    console.log(loginForm.username, loginForm.password);

    setLoginForm({
      username: "",
      password: "",
    });

    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            'url("https://wallpaperaccess.com/full/1412206.jpg")',
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
        <div className="main-logo" style={{ backgroundColor: "bisque" }}>
          <img
            className="main-logo-img"
            src={require("../../images/logo.png")}
            width="50"
            height="50"
            alt="Logo"
          />
          <h1 className="main-logo-title">Flavor Finder</h1>
        </div>
                  <div className="card-body p-5 w-100">
                    <h2 className="text-uppercase text-center mb-5">Log In</h2>
                    <form className="login" id="registration-form">
                      <div className="form-outline mb-4">
                        <input
                          onChange={handleChange}
                          type="text"
                          text={loginForm.username}
                          id="form3Example1cg"
                          name="username"
                          className="form-control form-control-lg"
                          placeholder="Username"
                          value={loginForm.username}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          onChange={handleChange}
                          type="password"
                          text={loginForm.password}
                          id="form3Example4cg"
                          name="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          value={loginForm.password}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-dark btn-block btn-lg gradient-custom-4"
                          onClick={logMeIn}
                        >
                          Log In
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?{" "}
                        <Link to={"/signup"}>Sign Up</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogIn;

import React, { useState, useEffect } from "react";

const LogIn = ({ onLogInUsername, onLogInAllergies }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    let data;

    data = {
      username: event.target[0].value,
      password: event.target[1].value,
    };

    fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.success) {
          localStorage.setItem('username', JSON.stringify(data.username));
          localStorage.setItem('allergies', JSON.stringify(data.allergies))
          console.log("Success");
          const username = JSON.parse(localStorage.getItem('username'))
          const allergies = JSON.parse(localStorage.getItem('allergies'))
          console.log(username)
          onLogInUsername(username)
          console.log(allergies)
          onLogInAllergies(allergies)
        } else {
          console.log("Unsuccessful");
        }
      });
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
                  <div className="card-body p-5 w-100">
                    <h2 className="text-uppercase text-center mb-5">Log In</h2>
                    <form id="registration-form" onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          placeholder="Username"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-dark btn-block btn-lg gradient-custom-4"
                        >
                          Log In
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?{" "}
                        <a href="#!" className="fw-bold text-body">
                          <u>Sign Up</u>
                        </a>
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

import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event);
    let data;

    if (!event.target[5].checked) {
      data = {
        username: event.target[0].value,
        email: event.target[1].value,
        password: event.target[2].value,
        confirmPassword: event.target[3].value,
        allergies: null,
      };
    } else {
      data = {
        username: event.target[0].value,
        email: event.target[1].value,
        password: event.target[2].value,
        confirmPassword: event.target[3].value,
        allergies: event.target[4].value,
      };
    }

    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    fetch("/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
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
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>
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
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          placeholder="Email@example.com"
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
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          placeholder="Confirm Password"
                        />
                      </div>
                      {isChecked && (
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example4cdg"
                            className="form-control form-control-lg"
                            placeholder="Allergies (peanuts, soy, etc.)"
                          />
                        </div>
                      )}
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I have food allergies
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-dark btn-block btn-lg gradient-custom-4"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Already have an account?{" "}
                        <a href="#!" className="fw-bold text-body">
                          <u>Login here</u>
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

export default SignUp;

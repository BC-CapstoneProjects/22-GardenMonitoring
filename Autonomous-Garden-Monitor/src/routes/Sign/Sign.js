import React, { useState } from "react";
import "./Sign.css";

import { Link } from "react-router-dom";

function Signin(props) {
  let [authMode, setAuthMode] = useState("signin");

  function handleForgotPasswordClick() {
    // Add your logic here for handling the "Forgot password?" click event.
    console.log("Forgot password clicked");
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1 text-black"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3 text-black">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Link to="/garden" className="btn btn-primary">
                Submit
              </Link>
            </div>
            <p className="text-center mt-2">
              Forgot{" "}
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={handleForgotPasswordClick}
              >
                password?
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="ex) Hyungmin"
            />
          </div>

          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="ex) Jeon"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="ex) 423-156-4627"
            />
          </div>

          <div className="form-group mt-3">
            <label>address line 1</label>
            <input type="text" className="form-control mt-1" />
          </div>

          <div className="form-group mt-3">
            <label>address line 2</label>
            <input type="text" className="form-control mt-1" />
          </div>

          <div className="form-group mt-3">
            <label>City</label>
            <input type="text" className="form-control mt-1" />
          </div>

          <div className="form-group mt-3">
            <label>State</label>
            <select className="form-control mt-1" aria-label="Default select example">
              <option selected>State</option>
              <option value="Washington">WA</option>
              <option value="Oregon">OR</option>
              <option value="California">CA</option>
            </select>
          </div>
          {/*
          <div className="form-group mt-3">
            <label>Garden</label>
            <select className="form-control mt-1" aria-label="Default select example">
              <option selected>Select Garden</option>
              <option value="1">Bellevue</option>
              <option value="2">Redmond</option>
              <option value="3">Seattle</option>
            </select>
          </div>
          */}
          <div className="d-grid gap-2 mt-3">
            <Link to="/garden" className="btn btn-primary">
              Submit
            </Link>
          </div>
          <p className="text-center mt-2">
            Forgot{" "}
            <button
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={handleForgotPasswordClick}
            >
              password?
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
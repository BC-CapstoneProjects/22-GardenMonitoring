import { Component } from "react";
import { Link } from "react-router-dom";
import "./account.css";
import React, { useState } from "react";
import axios from "axios";

import ReactDOM from "react-dom/client";

const registerUrl =
 

const Account = () => {
  const links = [
    {
      route: "/garden",
      text: "Home",
      class: "home-button",
    },
    {
      route: "/settings/account",
      text: "Account",
    },
    {
      route: "/settings/notifications",
      text: "Notifications",
    },
    {
      route: "/settings/privacy",
      text: "Privacy",
    },
  ];
  const settings = [
    " Email ",
    " First Name ",
    " Last Name ",
    " Password",
    " Organization",
    " Address",
    " Timezone",
    " Schedule",
  ];

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrg] = useState("");
  const [address, setAddress] = useState("");
  const [timeline, setTimeLine] = useState("");
  const [schedule, setSchedule] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submit button is pressed");
    if (
      email.trim() === "" ||
      fname.trim() === "" ||
      lname.trim() === "" ||
      password.trim() === "" ||
      organization.trim() === "" ||
      address.trim() === "" ||
      timeline.trim() === "" ||
      schedule.trim() === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        
      },
    };
    const requestBody = {
      email: email,
      fname: fname,
      lname: lname,
      password: password,
      organization: organization,
      address: address,
      timeline: timeline,
      schedule: schedule,
    };

    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registration successful");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
          // console.log(error);
        } else {
          setMessage("Sorry... the backend server is down. Try again later");
        }
      });
  };
  return (
    // padding 5 all around
    <div class="mydiv">
      <div class="container">
        <div class="container mx-auto sm:px-4 max-w-full mx-auto">
          <div class="flex flex-wrap  md:justify-center">
            <div class="relative flex-grow max-w-full flex-1 px-4 content myborder">
              <div class="navbar topBar">
                <ul class="navbar mr-auto list">
                  <li class="nav-item active">
                    {links.map((x) => (
                      <p class="sidebar-item ">
                        <Link to={x.route}>
                          <button class={"button " + x.class}>{x.text}</button>
                        </Link>
                      </p>
                    ))}
                  </li>
                </ul>
              </div>

              <div class="relative flex-grow max-w-full flex-1 px-4">
                <h1 class="h1 pb-5">Account Settings</h1>
              </div>
              {/* <div class="w-1/6 h2">
                      <button className="button edit">Edit</button>
                    </div> */}

              {/* {settings.map((x) => (
                    
                  ))} */}
              {/* onSubmit={submitHandler} */}
              <form>
                <div class="form-group ">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    class="form-control form-control-lg"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Email Address"
                  ></input>
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">First Name</label>
                  <input
                    class="form-control form-control-lg"
                    value={fname}
                    onChange={(event) => setFName(event.target.value)}
                    type="text"
                    placeholder="First Name"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Last Name</label>
                  <input
                    class="form-control form-control-lg"
                    value={lname}
                    onChange={(event) => setLName(event.target.value)}
                    type="text"
                    placeholder="Last Name"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    class="form-control form-control-lg"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Password"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Organization</label>
                  <input
                    class="form-control form-control-lg"
                    value={organization}
                    onChange={(event) => setOrg(event.target.value)}
                    type="text"
                    placeholder="Organization"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Address</label>
                  <input
                    class="form-control form-control-lg"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    type="text"
                    placeholder="Address"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Timeline</label>
                  <input
                    class="form-control form-control-lg"
                    value={timeline}
                    onChange={(event) => setTimeLine(event.target.value)}
                    type="date"
                    placeholder="Timeline"
                  ></input>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Schedule</label>
                  <input
                    class="form-control form-control-lg"
                    value={schedule}
                    onChange={(event) => setSchedule(event.target.value)}
                    type="text"
                    placeholder="Schedule"
                  ></input>
                </div>

                {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                <input
                  type="submit"
                  onClick={submitHandler}
                  value="Save"
                  class="btn btn-primary btn-sm m-2"
                  id="mysubmit"
                />
                <button class="button red btn btn-danger btn-sm m-2">
                  Delete Account
                </button>
              </form>

              <div>{message && <p className="message">{message}</p>}</div>
              {/* <script>
                    $(document).ready(function(){
                      $('#mysubmit').on('click', function(){
                        
                      })
                    })
                  </script> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

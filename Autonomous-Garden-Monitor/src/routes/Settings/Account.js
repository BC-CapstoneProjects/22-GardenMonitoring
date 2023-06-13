import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Account.css";
import axios from "axios";

//const navigate = useNavigate();

const registerUrl =
  "https://9ekazcm4bc.execute-api.eu-north-1.amazonaws.com/production/register";
const deleteAccountUrl =
  "https://9ekazcm4bc.execute-api.eu-north-1.amazonaws.com/production/deleteAccount";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      organization: "",
      address: "",
      timeline: "",
      schedule: "",
      message: null,
    };
  }

  deleteAccount = (e) => {
    e.preventDefault();
    const { email } = this.state;
    axios
      .delete(deleteAccountUrl, {
        headers: {
          "x-api-key": "9j2odVm9Bp5RiH8Lvgmdk7VCS8J9SBXu4G2tJ0XC",
        },
        data: {
          email: email,
        },
      })
      .then((response) => {
        console.log(response.data);
        //navigate("/signin");
        this.setState({
          fname: "",
          lname: "",
          email: "",
          password: "",
          organization: "",
          address: "",
          timeline: "",
          schedule: "",
          message: null,
        });
        window.location.href = "/"; // Use window.location.href to navigate to the sign-in page
      })
      .catch((error) => {
        window.location.href = "/"; // Use window.location.href to navigate to the sign-in page
        console.error(error);
        this.setState({
          message: "Failed to delete account. Please try again later.",
        });
      });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log("submit button is pressed");
    const {
      email,
      fname,
      lname,
      password,
      organization,
      address,
      timeline,
      schedule,
    } = this.state;
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
      this.setState({ message: "All fields are required" });
      return;
    }
    this.setState({ message: null });
    const requestConfig = {
      headers: {
        "x-api-key": "9j2odVm9Bp5RiH8Lvgmdk7VCS8J9SBXu4G2tJ0XC",
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
        this.setState({ message: "Registration successful" });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          this.setState({ message: error.response.data.message });
        } else {
          this.setState({
            message: "Sorry... the backend server is down. Try again later",
          });
        }
      });
  };

  render() {
    const links = [
      {
        route: "/",
        text: "Back to main screen",
        class: "home-button",
      },
      {
        route: "/account",
        text: "Account",
      },
      // {
      //   route: "/notifications",
      //   text: "Notifications",
      // },
      {
        route: "/privacy",
        text: "Privacy",
      },
    ];
    const {
      fname,
      lname,
      email,
      password,
      organization,
      address,
      timeline,
      schedule,
      message,
    } = this.state;

    return (
      <div className="mydiv">
        <div className="container">
          <div className="container mx-auto sm:px-4 max-w-full mx-auto">
            <div className="flex flex-wrap  md:justify-center">
              <div className="relative flex-grow max-w-full flex-1 px-4 content myborder">
                <div className="navbar topBar">
                  <ul className="navbar mr-auto list">
                    {links.map((x) => (
                      <li className="nav-item active" key={x.route}>
                        <p className="sidebar-item">
                          <Link to={x.route}>
                            <button className={"button " + x.class}>
                              {x.text}
                            </button>
                          </Link>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative flex-grow max-w-full flex-1 px-4">
                  <h1 className="h1 pb-5">Account Settings</h1>
                </div>
                <div className="w-1/6 h2">
                  <button className="button edit">Edit</button>
                </div>

                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(event) =>
                        this.setState({ email: event.target.value })
                      }
                      type="email"
                      placeholder="Email Address"
                    />
                    <small className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">First Name</label>
                    <input
                      className="form-control form-control-lg"
                      value={fname}
                      onChange={(event) =>
                        this.setState({ fname: event.target.value })
                      }
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Last Name</label>
                    <input
                      className="form-control form-control-lg"
                      value={lname}
                      onChange={(event) =>
                        this.setState({ lname: event.target.value })
                      }
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(event) =>
                        this.setState({ password: event.target.value })
                      }
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Organization</label>
                    <input
                      className="form-control form-control-lg"
                      value={organization}
                      onChange={(event) =>
                        this.setState({ organization: event.target.value })
                      }
                      type="text"
                      placeholder="Organization"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input
                      className="form-control form-control-lg"
                      value={address}
                      onChange={(event) =>
                        this.setState({ address: event.target.value })
                      }
                      type="text"
                      placeholder="Address"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Timeline</label>
                    <input
                      className="form-control form-control-lg"
                      value={timeline}
                      onChange={(event) =>
                        this.setState({ timeline: event.target.value })
                      }
                      type="date"
                      placeholder="Timeline"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Schedule</label>
                    <input
                      className="form-control form-control-lg"
                      value={schedule}
                      onChange={(event) =>
                        this.setState({ schedule: event.target.value })
                      }
                      type="text"
                      placeholder="Schedule"
                    />
                  </div>

                  <input
                    type="submit"
                    onClick={this.submitHandler}
                    value="Save"
                    className="btn btn-primary btn-sm m-2"
                    id="mysubmit"
                  />
                  <button
                    onClick={this.deleteAccount}
                    className="button red btn btn-danger btn-sm m-2"
                  >
                    Delete Account
                  </button>
                </form>

                <div>{message && <p className="message">{message}</p>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;

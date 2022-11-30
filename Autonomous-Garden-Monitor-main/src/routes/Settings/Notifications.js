import { Component } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch"
import "./notifications.css";

class Notifications extends Component {
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
      {
        route: "/notifications",
        text: "Notifications",
      },
      {
        route: "/privacy",
        text: "Privacy",
      },
    ];
    const settings = [
      "Allow Email notifications",
      "Disease Alerts",
      "Wilting Alerts",
      "Growth Alerts",
      "Drone Temp",
    ];

    return (
      // padding 5 all around
      <div class="p-5">
        <div class="container-fluid">
          <div class="row justify-content-md-center">
            <div class="col-3 sidebar">
              {links.map((x) => (
                <p class="sidebar-item pb-5">
                  <Link to={x.route}>
                    <button class={"button " + x.class}>{x.text}</button>
                  </Link>
                </p>
              ))}
            </div>
            <div class="col content">
              <div class="row">
                <div class="col">
                  <h1>Notification Settings</h1>
                </div>
                <div class="col-1">
                  <button className="button edit">Edit</button>
                </div>
              </div>
              {settings.map((x) => (
                <div class="container pb-5">
                  <div class="row justify-content-md-center">
                    <div class="col-7">
                      <p>{x}</p>
                    </div>
                    {/* <div class="col">
                      <button className="button">On</button>
                    </div>
                    <div class="col">
                      <button className="button">Off</button>
                    </div> */}
                    <div class="col">
                      <Switch></Switch>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;

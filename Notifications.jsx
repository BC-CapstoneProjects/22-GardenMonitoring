import { Component } from "react";
import { Link } from "react-router-dom";
// import Switch from "react-switch"
import "./notifications.css";

class Notifications extends Component {
  render() {
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
      "Allow Email notifications",
      "Disease Alerts",
      "Wilting Alerts",
      "Growth Alerts",
      "Drone Temp",
    ];

    return (
      // padding 5 all around
      <div class="mydiv">
        <div class="container">
          <div class="container mx-auto sm:px-4 max-w-full mx-auto">
            <div class="flex flex-wrap  md:justify-center">              
              <div class="relative flex-grow max-w-full flex-1 px-4 content myborder">
                <div class="flex flex-wrap">
                  <div class="navbar topBar">
                    <ul class="navbar mr-auto list">
                      <li class="nav-item active">
                      <div class="col-3 navbar  ">
                        {links.map((x) => (
                          <p class="sidebar-item pb-5">
                            <Link to={x.route}>
                              <button class={"button " + x.class}>{x.text}</button>
                            </Link>
                          </p>
                        ))}
                      </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <h1 class="h1 pb-5">Notification Settings</h1>
                  </div>
                  <div class="col-1 h2">
                    <button className="button edit">Edit</button>
                  </div>
                </div>
                {settings.map((x) => (
                  <form>
                    <div class="container pb-5">
                    <div class="row justify-content-md-center size">
                      <div class="col-7">
                        <p>{x}</p>
                      </div>
                      <div class="col">
                        <button className="button on">On</button>
                      </div>
                      <div class="col">
                        <button className="button off">Off</button>
                      </div>
                      {/* <div class="col">
                        <Switch></Switch>
                      </div> */}
                    </div>
                  </div>
                  </form>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;

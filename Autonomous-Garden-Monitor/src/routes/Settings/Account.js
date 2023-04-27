import { Component } from "react";
import { Link } from "react-router-dom";

class  Account extends Component {
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
      " Email ",
      " First Name ",
      " Last Name ",
      " Password",
      " Organization",
      " Address",
      " Timezone",
      " Schedul"
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
                  <h1>Account Settings</h1>
                </div>
                <div class="col-1">
                  <button className="button edit">Edit</button>
                </div>
              </div>
              {settings.map((x) => (
                <div class="container pb-5">
                  <div class="row justify-content-md-center">
                    <div class="col-2">
                      <p>{x}</p>
                    </div>
                    <div class="col">
                      <input class ="search-bar"type = "text"></input>
                    </div>
                    </div>
                </div>
              ))}
              <button class = "button">Save</button>
              <button class="button red">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account
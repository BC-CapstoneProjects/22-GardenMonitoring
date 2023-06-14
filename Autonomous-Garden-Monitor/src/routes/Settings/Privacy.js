import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";

class Privacy extends Component {
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
                                <button class={"button " + x.class}>
                                  {x.text}
                                </button>
                              </Link>
                            </p>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="privacy-container">
                  <div class="col-3 ">
                    <h1 style={{ marginLeft: "20%" }}>
                      <u>Privacy Policy</u>
                    </h1>
                    <p>
                      We are committed to protecting your privacy. This privacy
                      policy explains how we collect and use your personal
                      information.
                    </p>
                    <h3>Personal Information.</h3>
                    <p>
                      We collect personal information such as your name, email
                      address, and phone number when you sign up for an account
                      with us. We may also collect additional information such
                      as your address.
                    </p>
                    <h3>How We Use Your Information.</h3>
                    <p>
                      We use your personal information to provide you with our
                      services, communicate with you about your account, and to
                      improve our products and services. We may also use your
                      information to send you marketing communications.
                    </p>
                    <h3>Sharing Your Information.</h3>
                    <p>
                      We do not sell or rent your personal information to third
                      parties. We may share your information with third-party
                      service providers who help us provide our services or with
                      law enforcement agencies if required by law.
                    </p>
                    <h3>Security.</h3>
                    <p>
                      We take reasonable steps to protect your personal
                      information from unauthorized access, use, or disclosure.
                      However, no method of transmission over the internet or
                      electronic storage is completely secure.
                    </p>
                    <h3>Cookies.</h3>
                    <p>
                      We may use cookies and similar tracking technologies to
                      enhance your experience on our website. You have the
                      option to disable cookies through your browser settings,
                      but please note that disabling cookies may limit certain
                      functionalities of our website.
                    </p>

                    <h3>Children's Privacy.</h3>
                    <p>
                      Our services are not intended for individuals under the
                      age of 13. We do not knowingly collect personal
                      information from children. If we become aware that we have
                      inadvertently collected personal information from a child
                      under the age of 13, we will take steps to delete the
                      information as soon as possible.
                    </p>

                    <h3>Third-Party Links</h3>
                    <p>
                      Our website may contain links to third-party websites or
                      services. We are not responsible for the privacy practices
                      or content of these third-party sites. We encourage you to
                      read the privacy policies of those websites before
                      providing any personal information.
                    </p>
                    <h3>Changes to This Policy</h3>
                    <p>
                      We may update this privacy policy from time to time. We
                      will notify you of any changes by posting the new policy
                      on our website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Privacy;

import React, { Component } from "react";
import Banner from "../common/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <Banner className="homepage-banner">
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <div className="row">
            <NewAndOldComplaints />
            <Notifications />
          </div>
        </div>
      </Banner>
    );
  }
}

export default Home;

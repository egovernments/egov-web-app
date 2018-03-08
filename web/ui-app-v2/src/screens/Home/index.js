import React, { Component } from "react";
import Banner from "./components/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Updates from "./components/Updates";
import Notifications from "./components/Notifications";
import Events from "./components/Events";
import "./index.css";

class Home extends Component {
  state = {};
  render() {
    let { banner, updates, events } = this.state;
    return (
      <Banner>
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <div className="row">
            <NewAndOldComplaints />
            <Updates />
          </div>
        </div>
      </Banner>
    );
  }
}

export default Home;

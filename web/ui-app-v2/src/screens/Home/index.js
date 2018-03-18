import React, { Component } from "react";
import Banner from "../common/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import "./index.css";

class Home extends Component {
  state = {
    updates: [
      {
        title: "Contamination of water",
        date: "10-Mar-18",
        status: "Re-Assigned",
      },
      {
        title: "Dog menace",
        date: "10-Mar-18",
        status: "Rejected",
      },
    ],
  };

  render() {
    const { updates } = this.state;
    const { history } = this.props;
    return (
      <Banner className="homepage-banner">
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <div className="row">
            <NewAndOldComplaints history={history} />
            <Notifications updates={updates} />
          </div>
        </div>
      </Banner>
    );
  }
}

export default Home;

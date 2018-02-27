import React, { Component } from "react";
import Banner from "./components/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Updates from "./components/Updates";
import Notifications from "./components/Notifications";
import Events from "./components/Events";

import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import "./index.css";


class Home extends Component {
  state= {
  }
  render() {
    let { banner, updates, events} = this.state;
    return (
      <div>
        <Banner {...banner} />
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <NewAndOldComplaints />
          <Updates {...Updates} />
          <Notifications />
          <Events {...events} />
        </div>
      </div>
    );
  }
}

export default Home;

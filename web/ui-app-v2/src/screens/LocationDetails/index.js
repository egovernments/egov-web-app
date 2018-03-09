import React, { Component } from "react";
import Card from "./components/ComplaintType";
import "./index.css";

class LocationDetails extends Component {
  state = {
    complaints: [
      {
        children: "Complaint Type",
        text: "Accumulation of Litter",
      },
    ],
  };
  render() {
    return <Card complaints={this.state.complaints} />;
  }
}

export default LocationDetails;

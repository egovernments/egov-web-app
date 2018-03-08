import React, { Component } from "react";
import Card from "../../components/Card";
import "./index.css";

class LocationDetails extends Component {
  state = {
    complaints: [
      {
        header: "Complaint Type",
        text: "Accumulation of Litter",
      },
    ],
  };
  render() {
    let { items, value } = this.state;
    return (
      <Card
        header={this.state.complaints.header}
        textChildren={
          <div>
            <span>{this.state.complaints.text} </span>
          </div>
        }
      />
    );
  }
}

export default LocationDetails;

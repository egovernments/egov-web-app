import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";

class MyProperties extends Component {
  state = {
    items: [
      {
        primaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        secondaryText: "Property ID: PQL-98-876",
      },
      {
        primaryText: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram",
        secondaryText: "Property ID: JML-34-756",
      },
    ],
  };
  render() {
    return (
      <Screen className="pt-home-screen">
        <AssessmentList items={this.state.items} />
      </Screen>
    );
  }
}

export default MyProperties;

import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";

class CompletedAssessments extends Component {
  state = {
    items: [
      {
        primaryText: "2016 - 2017",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
      },
      {
        primaryText: "2017 - 2018",
        secondaryText: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
      },
      {
        primaryText: "2017 - 2018",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
      },
      {
        primaryText: "2018 - 2019",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
      },
      {
        primaryText: "2018 - 2019",
        secondaryText: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
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

export default CompletedAssessments;

import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon } from "components";

class CompletedAssessments extends Component {
  iconStyle = {
    marginLeft: "10px",
    height: "20px",
  };
  state = {
    items: [
      {
        primaryText: "2016 - 2017",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "2017 - 2018",
        secondaryText: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "2017 - 2018",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "2018 - 2019",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "2018 - 2019",
        secondaryText: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
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

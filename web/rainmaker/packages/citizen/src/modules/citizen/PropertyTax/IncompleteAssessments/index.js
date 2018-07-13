import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon } from "components";

class IncompleteAssessments extends Component {
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
        status: "Payment failed",
      },
      {
        primaryText: "2017 - 2018",
        secondaryText: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
        date: "12-06-2018",
        status: "Saved Draft",
      },
      {
        primaryText: "2015 - 2016",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        date: "12-06-2018",
        status: "Payment failed",
      },
    ],
  };

  // componentDidMount = () => {
  //   let { fetchDrafts } = this.props;
  //   fetchComplaints([]);
  // };

  render() {
    return (
      <Screen className="pt-home-screen">
        <AssessmentList items={this.state.items} />
      </Screen>
    );
  }
}

export default IncompleteAssessments;

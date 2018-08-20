import React, { Component } from "react";
import { Dashboard } from "modules/common";
import { connect } from "react-redux";

class LandingPage extends Component {
  moduleData = [
    {
      moduleTitle: "Complaints",
      moduleDescription:
        "mSeva Complaints offers an easy to use interface which enables you to lodge civic works related complaints. It also lets you track the status of your complaint and facilitates direct interaction with your municipality till its resolution.",
      button1: "mSeva Complaints",
      button2: "How it works?",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "dashboard-complaint",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
    },
    {
      moduleTitle: "Property Tax",
      moduleDescription: "Assess, pay and track your Property Taxes online with mSeva Property Tax.",
      button1: "mSeva Property Tax",
      button2: "FAQs",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      route: "property-tax",
      iconName: "dashboard-propertytax",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
    },
  ];
  render() {
    const { history, name } = this.props;
    return <Dashboard moduleItems={this.moduleData} history={history} userName={name} />;
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { userInfo } = auth;
  const name = userInfo && userInfo.name;

  return { name };
};
export default connect(
  mapStateToProps,
  null
)(LandingPage);

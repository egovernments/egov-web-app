import React, { Component } from "react";
import AssessmentList from "../../../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon, Receipt } from "components";
import PropertyItems from "./propertyitems";

let { propertyAddressItems, assessmentItems, ownershipItems } = PropertyItems;

class Property extends Component {
  state = {
    items: [
      {
        primaryText: "Property Information",
        leftIcon: <Icon action="action" name="info" />,
        nestedItems: [
          {
            primaryText: "Property Address",
            leftIcon: <Icon action="action" name="home" />,
            secondaryText: <Receipt receiptItems={propertyAddressItems} />,
          },
          {
            primaryText: "Assessment Information",
            leftIcon: <Icon action="action" name="assignment" />,
            secondaryText: <Receipt receiptItems={assessmentItems} />,
          },
          {
            primaryText: "OwnershipInformation",
            leftIcon: <Icon action="social" name="person" />,
            secondaryText: <Receipt receiptItems={ownershipItems} />,
          },
        ],
      },
      {
        primaryText: "Payment Record",
        leftIcon: <Icon action="action" name="receipt" />,
        nestedItems: [
          {
            primaryText: "2018 - 2019",
          },
          {
            primaryText: "2017 - 2018",
          },
        ],
      },
    ],
  };

  render() {
    return (
      <Screen className="pt-home-screen">
        <AssessmentList items={this.state.items} history={this.props.history} />
      </Screen>
    );
  }
}

export default Property;

import React, { Component } from "react";
import AssessmentList from "../../../common/AssessmentList";
import Label from "egov-ui-kit/utils/translationNode";
import { Screen } from "modules/common";
import { Icon } from "components";

class Property extends Component {
  state = {
    items: [
      {
        primaryText: "Property Information",
        nestedItems: [
          {
            primaryText: "Property Address",
            leftIcon: <Icon action="action" name="home" />,
            secondaryText: (
              <div className="clearfix" style={{ height: "inherit" }}>
                <div className="clearfix">
                  <div className="col-xs-12 col-sm-6">
                    <div className="col-xs-12 col-sm-6">
                      <Label label="House No:" />
                      <Label label="Street Name:" />
                      <Label label="Pincode:" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <Label label="E2/14" />
                      <Label label="Kandwa Road" />
                      <Label label="560098" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <div className="col-xs-12 col-sm-6">
                      <Label label="Colony Name:" />
                      <Label label="Mohalla:" />
                      <Label label="Property ID:" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <Label label="Salunke Vihar" />
                      <Label label="Harinagar" />
                      <Label label="XC-345-76" />
                    </div>
                  </div>
                </div>
                <div className="clearfix">
                  <div className="col-xs-12 col-sm-6" />
                  <div className="col-xs-12 col-sm-6" />
                </div>
                <div className="clearfix">
                  <div className="col-xs-12 col-sm-6" />
                  <div className="col-xs-12 col-sm-6" />
                </div>
              </div>
            ),
          },
          {
            primaryText: "Assessment Information",
            leftIcon: <Icon action="action" name="home" />,
            secondaryText: <div> </div>,
          },
          {
            primaryText: "OwnershipInformation",
            leftIcon: <Icon action="action" name="home" />,
            secondaryText: <div />,
          },
        ],
      },
      {
        primaryText: "Payment Record",
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

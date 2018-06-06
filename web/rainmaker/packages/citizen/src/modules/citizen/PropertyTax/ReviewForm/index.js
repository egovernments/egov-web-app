import React, { Component } from "react";
import { Button, TimeLine, Card, Icon, Label } from "components";
import { Screen } from "modules/common";
// import Label from "utils/translationNode";
import PropertyAddress from "./components/PropertyAddress";
import BasicInformation from "./components/BasicInformation";
import AssessmentInfo from "./components/AssessmentInfo";
import OwnerInfo from "./components/OwnerInfo";
import ActionFooter from "./components/ActionFooter";
import PropertyTaxDetailsCard from "./components/PropertyTaxDetails";

import propertyAddressConfig from "./formConfigs/propertyAddress";
import basicInformationConfig from "./formConfigs/basicInformation";

import "./index.css";
const defaultIconStyle = {
  fill: "#767676",
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10,
};

const PropAddressIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" />;
const BasicInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="assignment" />;
const AssessmentInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="assessment" />;
const OwnerInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="social" name="person" />;
const editIcon = <Icon style={defaultIconStyle} color="#ffffff" action="image" name="edit" />;

class ReviewForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Screen>
        <Label
          label="Review Form"
          fontSize="20px"
          labelStyle={{
            fontFamily: "Roboto",
            color: "#484848",
            margin: "24px 0px 0px 16px",
          }}
        />
        <PropertyAddress form={propertyAddressConfig} icon={PropAddressIcon} editIcon={editIcon} />
        <BasicInformation form={basicInformationConfig} icon={BasicInfoIcon} editIcon={editIcon} />
        <AssessmentInfo icon={AssessmentInfoIcon} editIcon={editIcon} />
        <OwnerInfo icon={OwnerInfoIcon} editIcon={editIcon} />
        <PropertyTaxDetailsCard />
        <ActionFooter />
      </Screen>
    );
  }
}

export default ReviewForm;

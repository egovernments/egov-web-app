import React, { Component } from "react";
import { Icon } from "components";
import PropertyAddress from "./components/PropertyAddress";
import AssessmentInfo from "./components/AssessmentInfo";
import OwnerInfo from "./components/OwnerInfo";
import PropertyTaxDetailsCard from "./components/PropertyTaxDetails";
import propertyAddressConfig from "./formConfigs/propertyAddress";
import { connect } from "react-redux";

import "./index.css";
const defaultIconStyle = {
  fill: "#767676",
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10,
};

const PropAddressIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="home" />;
const AssessmentInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="assessment" />;
const OwnerInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="social" name="person" />;

class ReviewForm extends Component {
  componentDidMount() {}

  editIcon = <Icon onClick={this.handleEdit} style={defaultIconStyle} color="#ffffff" action="image" name="edit" />;
  render() {
    let { updateIndex } = this.props;
    return (
      <div>
        <PropertyAddress
          form={propertyAddressConfig}
          icon={PropAddressIcon}
          editIcon={
            <Icon
              onClick={() => {
                updateIndex(0);
              }}
              style={defaultIconStyle}
              color="#ffffff"
              action="image"
              name="edit"
            />
          }
        />
        <AssessmentInfo
          icon={AssessmentInfoIcon}
          editIcon={
            <Icon
              onClick={() => {
                updateIndex(1);
              }}
              style={defaultIconStyle}
              color="#ffffff"
              action="image"
              name="edit"
            />
          }
        />
        <OwnerInfo
          icon={OwnerInfoIcon}
          editIcon={
            <Icon
              onClick={() => {
                updateIndex(2);
              }}
              style={defaultIconStyle}
              color="#ffffff"
              action="image"
              name="edit"
            />
          }
          form={propertyAddressConfig}
        />
        <PropertyTaxDetailsCard />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
});
export default connect(
  null,
  mapDispatchToProps
)(ReviewForm);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";
import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import "../FormWizard/components/WizardComponent/index.css";

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
  }

  icon = <Icon action="navigation" name="check" />;

  buttons = {
    button1: "Link previous payments",
    button2: "Finish",
  };

  successMessages = {
    Message1: "Thank you !",
    Message2: "Payment has been made successfully!",
  };

  componentDidMount = () => {
    const { fetchProperties, match } = this.props;
    fetchProperties([{ key: "ids", value: match.params.propertyId }]);
  };

  render() {
    return (
      <Screen>
        <PaymentStatus
          receiptUIDetails={this.props.receiptUIDetails}
          receiptDetails={this.props.receiptDetails}
          floatingButtonColor="#22b25f"
          icon={this.icon}
          messages={this.successMessages}
          buttons={this.buttons}
        />
      </Screen>
    );
  }
}

const createPropertyInfo = (property) => {
  const { owners: ownerDetails } = property.propertyDetails[0];
  return (
    property && [
      ownerDetails.length > 0
        ? ownerDetails.reduce((result, current, index) => {
            result["key"] = `Owner${index + 1} name:`;
            result["value"] = current.name;
            return result;
          }, {})
        : { key: "Owner name:", value: ownerDetails[0].name },
      {
        key: "Existing Property ID:",
        value: property.oldPropertyId,
      },
      {
        key: "Property Tax Assessment ID:",
        value: property.propertyId,
      },
      {
        key: "Property Address:",
        value: getCommaSeperatedAddress(property.address.buildingName, property.address.street),
      },
    ]
  );
};

const createReceiptDetails = (property, propertyDetails, receiptDetails) => {
  return {
    ReceiptNo: "PT03-067-03-117",
    header: {
      header: "AMRITSAR MUNICIPAL CORPORATION",
      subheader: "Property Tax Payment Receipt (Citizen Copy)",
      logo: msevaLogo,
    },
    tax: {
      AmountPaid: "100",
      fireCess: "10",
      rebate: "10",
      total: "100",
    },
    receipts: {
      AmountPaid: "60",
      transactionId: "TR123",
      bankName: "ICICI",
      payMode: "Net Banking",
      pendingAmt: "40",
      paymentDate: "24/07/2018",
    },
    propertyDetails: [{ ...propertyDetails }],
    address: property.address,
    owners: propertyDetails.owners,
  };
};

const getLatestPropertyDetails = (propertyDetailsArray) => {
  if (propertyDetailsArray.length > 1) {
    return propertyDetailsArray.reduce((acc, curr) => {
      return acc.assessmentDate > curr.assessmentDate ? acc : curr;
    });
  } else {
    return propertyDetailsArray[0];
  }
};

const mapStateToProps = (state, ownProps) => {
  const { properties } = state || {};
  const { propertiesById } = properties;
  const selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];
  const propertyInfo = selProperty && createPropertyInfo(selProperty);
  const latestPropertyDetails = selProperty && getLatestPropertyDetails(selProperty.propertyDetails);
  const receiptInfo = [
    {
      key: "Assessment No.: ",
      value: "ZRN-453-98",
    },
    {
      key: "Receipt No:",
      value: "PT03-067-03-117",
    },
    {
      key: "Payment Term:",
      value: "2017-18",
    },
    {
      key: "Date:",
      value: "24.04.18",
    },
    {
      key: "Payable Amount:",
      value: "1,432",
    },
    {
      key: "Amount Paid:",
      value: "1,432",
    },
    {
      key: "Amount Due:",
      value: "0",
    },
  ];
  const receiptUIDetails = { propertyInfo, receiptInfo };
  const receiptDetails = selProperty && createReceiptDetails(selProperty, latestPropertyDetails);
  return { receiptUIDetails, receiptDetails };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSuccess);

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
  receiptUIDetails = {
    propertyInfo: [
      {
        key: "Owner Name:",
        value: "Hari Singh",
      },
      {
        key: "Existing Property ID:",
        value: "PID-78-567",
      },
      {
        key: "Property Tax Assessment ID: ",
        value: "ZRN-453-98",
      },
      {
        key: "Property Address:",
        value: "EB-154, Maya Enclave, Harinagar, KT Marg, Amritsar - 53",
      },
    ],
    receiptInfo: [
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
    ],
  };

  receiptDetails = {
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
    propertyDetails: [
      {
        noOfFloors: 2,
        landArea: 10,
        propertySubType: "INDEPENDENTBUILDING",
        financialYear: "2017-18",
        assessmentDate: 1531987969654,
        assessmentNumber: "PB-PT-2018_07_19-000019",
        documents: [
          {
            name: "aadhar",
            id: "12345",
          },
        ],
        units: [
          {
            floorNo: "1",
            occupancyType: "RENTED",
            usageCategoryDetail: "GROCERYSTORE",
            usageCategoryMajor: "NONRESIDENTIAL",
            usageCategoryMinor: "COMMERCIAL",
            usageCategorySubMinor: "RETAIL",
            unitArea: 10,
            arv: 100.1,
          },
          {
            floorNo: "2",
            occupancyType: "SELFOCCUPIED",
            usageCategoryDetail: "GROCERYSTORE",
            usageCategoryMajor: "NONRESIDENTIAL",
            usageCategoryMinor: "COMMERCIAL",
            usageCategorySubMinor: "RETAIL",
            unitArea: 90,
            arv: 200,
          },
        ],
      },
    ],
    address: {
      buildingName: "Springfield",
      city: "amritsar",
      locality: {
        code: "abc",
      },

      street: "Sarjapur Road",
      doorNo: "1/11",
    },
    owners: {
      mobileNumber: "9000000007",
      OwnershipType: "Individual",
      name: "testseven",
      ownerType: "WIDOW",

      correspondenceAddress: "bangalore",
    },
  };

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
          receiptDetails={this.receiptDetails}
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
  return [
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
  ];
};

const mapStateToProps = (state, ownProps) => {
  const { properties } = state || {};
  const { propertiesById } = properties;
  const propertyInfo =
    propertiesById && propertiesById[ownProps.match.params.propertyId] ? createPropertyInfo(propertiesById[ownProps.match.params.propertyId]) : [];
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
  return { receiptUIDetails };
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

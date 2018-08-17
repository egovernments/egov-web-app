import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";
import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { fetchProperties, fetchReceipts } from "egov-ui-kit/redux/properties/actions";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import createReceiptDetails from "../common/PaymentStatus/Components/createReceipt";
import Label from "egov-ui-kit/utils/translationNode";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import get from "lodash/get";

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
  }

  icon = <Icon action="navigation" name="check" />;

  buttons = {
    button1: "Link previous payments",
    button2: "Finish",
  };

  successMessages = (financialYear) => {
    return {
      Message1: (
        <div className="rainmaker-displayInline" style={{ justifyContent: "center" }}>
          <Label containerStyle={{ paddingTop: "10px" }} fontSize={16} label={"PT_TAX"} labelStyle={{ color: "#484848", fontWeight: 500 }} />
          {financialYear && (
            <Label
              containerStyle={{ margin: "0 3px", paddingTop: "10px" }}
              fontSize={16}
              label={`(${financialYear})`}
              labelStyle={{ color: "#484848", fontWeight: 500 }}
            />
          )}
        </div>
      ),
      Message2: (
        <Label
          containerStyle={{ paddingTop: "10px" }}
          fontSize={16}
          label={"PT_RECEIPTS_SUCCESS_MESSAGE4"}
          labelStyle={{ color: "#484848", fontWeight: 500 }}
        />
      ),
    };
  };

  componentDidMount = () => {
    const { fetchProperties, fetchReceipts, match, fetchGeneralMDMSData } = this.props;
    const requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "PropertyTax",
            masterDetails: [
              {
                name: "Floor",
              },
              {
                name: "UsageCategoryMajor",
              },
              {
                name: "UsageCategoryMinor",
              },
              {
                name: "UsageCategorySubMinor",
              },
              {
                name: "OccupancyType",
              },
              {
                name: "PropertyType",
              },
            ],
          },
        ],
      },
    };
    fetchGeneralMDMSData(requestBody, "PropertyTax", [
      "Floor",
      "UsageCategoryMajor",
      "UsageCategoryMinor",
      "UsageCategorySubMinor",
      "OccupancyType",
      "PropertyType",
    ]);
    fetchProperties([{ key: "ids", value: match.params.propertyId }, { key: "tenantId", value: match.params.tenantId }]);
    fetchReceipts([
      { key: "tenantId", value: match.params.tenantId },
      { key: "consumerCode", value: `${match.params.propertyId}:${match.params.assessmentId}` },
    ]);
  };

  goToHome = () => {
    this.props.history.push("/property-tax");
  };

  render() {
    const { generalMDMSDataById } = this.props;
    const { assessmentYear } = this.props.match.params;
    return (
      <Screen>
        <PaymentStatus
          receiptUIDetails={this.props.receiptUIDetails}
          receiptDetails={this.props.receiptDetails}
          floatingButtonColor="#22b25f"
          icon={this.icon}
          messages={this.successMessages(assessmentYear)}
          buttons={this.buttons}
          primaryAction={this.goToHome}
          noExistingPropertyId={!this.props.existingPropertyId}
          generalMDMSDataById={generalMDMSDataById && generalMDMSDataById}
        />
      </Screen>
    );
  }
}

const createReceiptUIInfo = (property, receiptDetails, cities, totalAmountToPay) => {
  const { owners: ownerDetails, financialYear } = property.propertyDetails[0];
  return {
    propertyInfo: property && [
      ownerDetails.length > 1
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
        value: getCommaSeperatedAddress(property.address, cities),
      },
    ],
    receiptInfo: [
      {
        key: "Assessment No.: ",
        value: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].consumerCode").split(":")[1],
      },
      {
        key: "Receipt No:",
        value: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      },
      {
        key: "Payment Term:",
        value: financialYear,
      },
      {
        key: "Date:",
        value: receiptDetails && getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      },
      {
        key: "Payable Amount:",
        value: totalAmountToPay ? totalAmountToPay.toString() : "0",
      },
      {
        key: "Amount Paid:",
        value: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString(),
      },
      {
        key: "Amount Due:",
        value: receiptDetails && (totalAmountToPay - get(receiptDetails, "Bill[0].billDetails[0].amountPaid")).toString(),
      },
    ],
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
  const { properties, common, app } = state || {};
  const { localizationLabels } = app;
  const { cities } = common;
  const { generalMDMSDataById } = state.common || {};
  const { propertiesById, receipts } = properties;
  const selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];
  const existingPropertyId = selProperty && selProperty.oldPropertyId;
  const latestPropertyDetails = selProperty && getLatestPropertyDetails(selProperty.propertyDetails);
  const totalAmountToPay = receipts && get(receipts[receipts.length - 1], "Bill[0].billDetails[0].totalAmount");
  const rawReceiptDetails = receipts && receipts[0];
  const receiptUIDetails = selProperty && cities && createReceiptUIInfo(selProperty, rawReceiptDetails, cities, totalAmountToPay);
  const receiptDetails =
    selProperty &&
    rawReceiptDetails &&
    cities &&
    createReceiptDetails(selProperty, latestPropertyDetails, rawReceiptDetails, localizationLabels, cities, totalAmountToPay);
  return { receiptUIDetails, receiptDetails, cities, existingPropertyId, generalMDMSDataById };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
    fetchReceipts: (queryObject) => dispatch(fetchReceipts(queryObject)),
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSuccess);

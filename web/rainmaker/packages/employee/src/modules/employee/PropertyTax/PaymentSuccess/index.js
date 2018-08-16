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
import get from "lodash/get";
import Label from "egov-ui-kit/utils/translationNode";

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
    const { fetchProperties, fetchReceipts, match } = this.props;
    fetchProperties([{ key: "ids", value: match.params.propertyId }, { key: "tenantId", value: match.params.tenantId }]);
    fetchReceipts([
      { key: "tenantId", value: match.params.tenantId },
      { key: "consumerNo", value: `${match.params.propertyId}:${match.params.assessmentId}` },
    ]);
  };

  goToHome = () => {
    this.props.history.push("/property-tax");
  };

  render() {
    const { match } = this.props;
    const messages = match.params.assessmentYear && this.successMessages(match.params.assessmentYear);
    return (
      <Screen>
        <PaymentStatus
          receiptUIDetails={this.props.receiptUIDetails}
          receiptDetails={this.props.receiptDetails}
          floatingButtonColor="#22b25f"
          icon={this.icon}
          messages={messages}
          buttons={this.buttons}
          primaryAction={this.goToHome}
        />
      </Screen>
    );
  }
}

const createReceiptUIInfo = (property, receiptDetails, cities) => {
  const { owners: ownerDetails } = property.propertyDetails[0];
  return {
    propertyInfo: property && [
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
        value: "2018-19", // To be API integrated
      },
      {
        key: "Date:",
        value: receiptDetails && getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      },
      {
        key: "Payable Amount:",
        value: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].totalAmount").toString(),
      },
      {
        key: "Amount Paid:",
        value: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString(),
      },
      {
        key: "Amount Due:",
        value:
          receiptDetails &&
          (get(receiptDetails, "Bill[0].billDetails[0].totalAmount") - get(receiptDetails, "Bill[0].billDetails[0].amountPaid")).toString(),
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
  const { propertiesById, receipts } = properties;
  const selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];
  const financialYear = selProperty && selProperty;
  const latestPropertyDetails = selProperty && getLatestPropertyDetails(selProperty.propertyDetails);
  const rawReceiptDetails = receipts && receipts[0];
  const receiptUIDetails = selProperty && cities && createReceiptUIInfo(selProperty, rawReceiptDetails, cities);
  const receiptDetails =
    selProperty && rawReceiptDetails && createReceiptDetails(selProperty, latestPropertyDetails, rawReceiptDetails, localizationLabels);

  return { receiptUIDetails, receiptDetails, cities };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
    fetchReceipts: (queryObject) => dispatch(fetchReceipts(queryObject)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSuccess);

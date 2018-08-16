import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import Label from "egov-ui-kit/utils/translationNode";

const buttons = {
  button2: "Retry",
};

const failureMessages = (billAmount) => {
  return {
    Message1: <Label containerStyle={{ paddingTop: "30px" }} fontSize={16} label={"PT_OOPS"} labelStyle={{ color: "#484848", fontWeight: 500 }} />,
    Message2: (
      <div>
        <div>
          {billAmount ? (
            <div class="rainmaker-displayInline" style={{ justifyContent: "center" }}>
              <Label
                containerStyle={{ paddingTop: "10px" }}
                fontSize={16}
                label={"PT_RECEIPT_FAILURE_MESSAGE1"}
                labelStyle={{ color: "#484848", fontWeight: 500 }}
              />
              <Label
                containerStyle={{ paddingTop: "10px", margin: "0 3px" }}
                fontSize={16}
                label={billAmount}
                labelStyle={{ color: "#484848", fontWeight: 500 }}
              />
              <Label
                containerStyle={{ paddingTop: "10px" }}
                fontSize={16}
                label={"PT_RECEIPT_FAILURE_MESSAGE2"}
                labelStyle={{ color: "#484848", fontWeight: 500 }}
              />
            </div>
          ) : (
            <div>
              <Label
                containerStyle={{ paddingTop: "10px" }}
                fontSize={16}
                label={"PT_RECEIPT_FAILURE_MESSAGE"}
                labelStyle={{ color: "#484848", fontWeight: 500 }}
              />
            </div>
          )}
        </div>
        <Label
          containerStyle={{ paddingTop: "10px" }}
          fontSize={16}
          label={"PT_RECEIPT_FAILURE_MESSAGE3"}
          labelStyle={{ color: "#484848", fontWeight: 500 }}
        />
      </div>
    ),
  };
};

const getMessage2 = () => {
  return;
};

const icon = <Icon action="navigation" name="close" />;

class PaymentFailure extends Component {
  state = {
    bill: [],
  };
  getBill = async (tenantId, assessmentNumber, assessmentYear, propertyId) => {
    const queryObj = [
      { key: "propertyId", value: propertyId },
      { key: "assessmentNumber", value: assessmentNumber },
      { key: "assessmentYear", value: assessmentYear },
      { key: "tenantId", value: tenantId },
    ];
    try {
      const payload = await httpRequest("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});
      this.setState({ bill: payload["Bill"] });
    } catch (e) {
      console.log(e);
    }
    return;
  };
  componentDidMount = () => {
    const { fetchProperties, match } = this.props;
    const { tenantId, assessmentNumber, assessmentYear, propertyId } = match.params;
    fetchProperties([{ key: "ids", value: match.params.propertyId }, { key: "tenantId", value: match.params.tenantId }]);
    this.getBill(tenantId, assessmentNumber, assessmentYear, propertyId);
  };

  createReceiptUIInfo = (receiptDetails) => {
    return (
      receiptDetails && {
        receiptInfo: [
          {
            key: "Assessment No.: ",
            value: get(receiptDetails[0], "billDetails[0].consumerCode").split(":")[1],
          },
          {
            key: "Receipt No:",
            value: get(receiptDetails[0], "billDetails[0].receiptNumber"),
          },
          {
            key: "Payment Term:",
            value: "2018-19", // To be API integrated
          },
          {
            key: "Date:",
            value: getDateFromEpoch(get(receiptDetails[0], "billDetails[0].billDate")),
          },
          {
            key: "Payable Amount:",
            value: get(receiptDetails[0], "billDetails[0].totalAmount").toString(),
          },
          {
            key: "Amount Paid:",
            value: get(receiptDetails[0], "billDetails[0].amountPaid") ? get(receiptDetails[0], "billDetails[0].amountPaid").toString() : "0",
          },
          {
            key: "Amount Due:",
            value: (
              get(receiptDetails[0], "billDetails[0].totalAmount") -
              (get(receiptDetails, "billDetails[0].amountPaid") ? get(receiptDetails, "billDetails[0].amountPaid") : 0)
            ).toString(),
          },
        ],
      }
    );
  };

  redirectToReview = () => {
    const { match, history } = this.props;
    const { assessmentNumber, assessmentYear, propertyId } = match.params;
    history.push(`/property-tax/assessment-form?FY=${assessmentYear}&assessmentId=${assessmentNumber}&isReassesment=true&propertyId=${propertyId}`);
  };

  render() {
    const { bill } = this.state;
    const billAmount = get(bill[0], "billDetails[0].billAmount");
    const receiptUIInfo = bill && bill.length && this.createReceiptUIInfo(this.state.bill);
    const receiptUIDetails = {
      propertyInfo: this.props.propertyInfo ? this.props.propertyInfo : [],
      receiptInfo: receiptUIInfo.receiptInfo ? receiptUIInfo.receiptInfo : [],
    };
    const messages = failureMessages(billAmount);
    return (
      <Screen>
        <PaymentStatus
          receiptUIDetails={receiptUIDetails}
          floatingButtonColor="#e74c3c"
          icon={icon}
          messages={messages}
          buttons={buttons}
          primaryAction={this.redirectToReview}
        />
      </Screen>
    );
  }
}

const createPropertyUIInfo = (property, cities) => {
  const { owners: ownerDetails } = property.propertyDetails[0];
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
  };
};

const mapStateToProps = (state, ownProps) => {
  const { properties, common } = state || {};
  const { cities } = common;
  const { propertiesById } = properties;
  const selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];
  const { propertyInfo } = (selProperty && selProperty && createPropertyUIInfo(selProperty, cities)) || {};
  return { propertyInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentFailure);

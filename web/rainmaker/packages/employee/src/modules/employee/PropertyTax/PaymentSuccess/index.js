import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "egov-ui-kit/common/propertyTax/PaymentStatus";
import { fetchProperties, fetchReceipts } from "egov-ui-kit/redux/properties/actions";
import { createReceiptDetails, createReceiptUIInfo } from "egov-ui-kit/common/propertyTax/PaymentStatus/Components/createReceipt";
import Label from "egov-ui-kit/utils/translationNode";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import get from "lodash/get";

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    imageUrl: "",
  };

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
    this.convertImgToDataURLviaCanvas(
      this.createImageUrl(match.params.tenantId),
      function(data) {
        console.log(this);
        this.setState({ imageUrl: data });
      }.bind(this)
    );
  };

  goToHome = () => {
    this.props.history.push("/property-tax");
  };

  convertImgToDataURLviaCanvas = (url, callback, outputFormat) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  };

  createImageUrl = (tenantId) => {
    return `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${tenantId}/logo.png`;
  };

  render() {
    const { generalMDMSDataById } = this.props;
    const { assessmentYear } = this.props.match.params;
    const { imageUrl } = this.state;
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
          receiptImageUrl={imageUrl && imageUrl}
        />
      </Screen>
    );
  }
}

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
  const receiptUIDetails = selProperty && cities && createReceiptUIInfo(selProperty, rawReceiptDetails, cities, totalAmountToPay, true);
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

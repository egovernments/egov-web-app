import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";
import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { fetchProperties, fetchReceipts } from "egov-ui-kit/redux/properties/actions";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
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

  successMessages = {
    Message1: "Thank you !",
    Message2: "Payment has been made successfully!",
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
    return (
      <Screen>
        <PaymentStatus
          receiptUIDetails={this.props.receiptUIDetails}
          receiptDetails={this.props.receiptDetails}
          floatingButtonColor="#22b25f"
          icon={this.icon}
          messages={this.successMessages}
          buttons={this.buttons}
          primaryAction={this.goToHome}
        />
      </Screen>
    );
  }
}

const createReceiptUIInfo = (property, receiptDetails) => {
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
        value: getCommaSeperatedAddress(property.address.buildingName, property.address.street),
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

const getTaxInfo = (billAccountDetails, totalAmount) => {
  const taxArray = billAccountDetails.reduce(
    (result, current) => {
      result[0].push({ text: current.accountDescription.split("-")[0] });
      result[1].push({ text: current.crAmountToBePaid });
      return result;
    },
    [[], []]
  );
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

const createReceiptDetails = (property, propertyDetails, receiptDetails) => {
  return {
    ReceiptNo: get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    header: {
      header: "AMRITSAR MUNICIPAL CORPORATION",
      subheader: "Property Tax Payment Receipt (Citizen Copy)",
      logo: msevaLogo,
    },
    taxNew: receiptDetails && getTaxInfo(receiptDetails.Bill[0].billDetails[0].billAccountDetails, receiptDetails.Bill[0].billDetails[0].totalAmount),
    tax: {
      AmountPaid: "100",
      fireCess: "10",
      rebate: "10",
      total: "100",
    },
    receipts: {
      AmountPaid: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].amountPaid"),
      transactionId: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      bankName: "AXIS",
      payMode: "Net Banking",
      pendingAmt:
        receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].totalAmount") - get(receiptDetails, "Bill[0].billDetails[0].amountPaid"),
      paymentDate: receiptDetails && getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
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

const ReceiptFromAPI = {
  tenantId: null,
  page: {
    totalResults: 10,
    totalPages: 14,
    pageSize: 10,
    currentPage: 0,
    offset: 0,
  },
  ResponseInfo: {
    apiId: "Rainmaker",
    ver: ".01",
    ts: "Tue Jul 31 15:09:04 IST 2018",
    resMsgId: "uief87324",
    msgId: "20170310130900|en_IN",
    status: "200",
  },
  Receipt: [
    {
      tenantId: "default",
      id: "1221",
      transactionId: "DEFA1013112711",
      Bill: [
        {
          id: null,
          payeeName: "9098888888",
          payeeAddress: null,
          payeeEmail: "mail@gmail.com",
          isActive: null,
          isCancelled: null,
          paidBy: "73",
          billDetails: [
            {
              id: "1221",
              bill: null,
              billDate: null,
              billDescription: "PT Consumer Code: AP-PT-2017/07/30-000009-11",
              billNumber: "1875",
              consumerCode: "PB-PT-2018-08-02-000158:PB-AS-2018-08-02-000165",
              consumerType: null,
              minimumAmount: 100,
              totalAmount: 50,
              collectionModesNotAllowed: [""],
              tenantId: "default",
              businessService: "Property Tax",
              displayMessage: null,
              callBackForApportioning: null,
              receiptNumber: "07/2018-19/000012",
              receiptDate: 1532335355311,
              receiptType: "BILLBASED",
              channel: null,
              voucherHeader: null,
              collectionType: "COUNTER",
              boundary: null,
              reasonForCancellation: null,
              amountPaid: 50,
              cancellationRemarks: null,
              status: "Approved",
              billAccountDetails: [
                {
                  id: "8615",
                  tenantId: "pb.amritsar",
                  billDetail: "1895",
                  glcode: "1405015",
                  order: 1,
                  accountDescription: "PT_OWNER_EXEMPTION-1522540800000-1554076799000",
                  crAmountToBePaid: 0,
                  creditAmount: null,
                  debitAmount: null,
                  isActualDemand: true,
                  purpose: "OTHERS",
                },
                {
                  id: "8616",
                  tenantId: "pb.amritsar",
                  billDetail: "1895",
                  glcode: "1405013",
                  order: 1,
                  accountDescription: "PT_TAX-1522540800000-1554076799000",
                  crAmountToBePaid: 400,
                  creditAmount: null,
                  debitAmount: null,
                  isActualDemand: true,
                  purpose: "CURRENT_AMOUNT",
                },
                {
                  id: "8617",
                  tenantId: "pb.amritsar",
                  billDetail: "1895",
                  glcode: "1405019",
                  order: 1,
                  accountDescription: "PT_TIME_INTEREST-1522540800000-1554076799000",
                  crAmountToBePaid: 0,
                  creditAmount: null,
                  debitAmount: null,
                  isActualDemand: true,
                  purpose: "OTHERS",
                },
                {
                  id: "8618",
                  tenantId: "pb.amritsar",
                  billDetail: "1895",
                  glcode: "1405013",
                  order: 1,
                  accountDescription: "PT_TIME_PENALTY-1522540800000-1554076799000",
                  crAmountToBePaid: 0,
                  creditAmount: null,
                  debitAmount: null,
                  isActualDemand: true,
                  purpose: "OTHERS",
                },
                {
                  id: "8619",
                  tenantId: "pb.amritsar",
                  billDetail: "1895",
                  glcode: "1405016",
                  order: 1,
                  accountDescription: "PT_TIME_REBATE-1522540800000-1554076799000",
                  crAmountToBePaid: -52,
                  creditAmount: null,
                  debitAmount: null,
                  isActualDemand: true,
                  purpose: "OTHERS",
                },
                {
                  id: "8620",
                  tenantId: "pb.amritsar",
                  billDetail: "1895",
                  glcode: "1405019",
                  order: 1,
                  accountDescription: "PT_UNIT_USAGE_EXEMPTION-1522540800000-1554076799000",
                  crAmountToBePaid: 0,
                  creditAmount: null,
                  debitAmount: null,
                  isActualDemand: true,
                  purpose: "OTHERS",
                },
              ],
              manualReceiptNumber: "",
              stateId: null,
              partPaymentAllowed: null,
            },
          ],
          tenantId: "default",
          mobileNumber: null,
        },
      ],
      auditDetails: null,
      instrument: {
        id: "692690e0ed4d4de092d26156083f69de",
        transactionNumber: "657837232",
        transactionDate: "24-04-2018",
        transactionDateInput: null,
        amount: 100,
        instrumentType: {
          id: null,
          name: "DD",
          description: null,
          active: null,
          instrumentTypeProperties: [],
        },
        instrumentDate: null,
        instrumentNumber: null,
        bank: {
          id: 1770,
          code: null,
          name: null,
          description: null,
          active: null,
          type: null,
        },
        branchName: "Bangalore",
        bankAccount: {
          id: null,
          bankBranch: null,
          accountNumber: null,
          accountType: null,
          description: null,
          active: null,
          payTo: null,
          type: null,
          createdBy: null,
          createdDate: null,
          lastModifiedBy: null,
          lastModifiedDate: null,
          tenantId: null,
        },
        transactionType: "Debit",
        payee: null,
        drawer: null,
        surrendarReason: null,
        serialNo: null,
        instrumentVouchers: [],
        tenantId: "default",
      },
      onlinePayment: null,
      stateId: null,
      WorkflowDetails: null,
    },
  ],
};

const mapStateToProps = (state, ownProps) => {
  const { properties } = state || {};
  const { propertiesById, receipts } = properties;
  const selProperty = propertiesById && propertiesById[ownProps.match.params.propertyId];

  const latestPropertyDetails = selProperty && getLatestPropertyDetails(selProperty.propertyDetails);
  const rawReceiptDetails = receipts && receipts[0];
  console.log(rawReceiptDetails);
  const receiptUIDetails = selProperty && createReceiptUIInfo(selProperty, rawReceiptDetails);
  const receiptDetails = selProperty && createReceiptDetails(selProperty, latestPropertyDetails, rawReceiptDetails);
  console.log(receiptUIDetails);
  return { receiptUIDetails, receiptDetails };
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("modules/common");

var _components = require("components");

var _PaymentStatus = require("../common/PaymentStatus");

var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var receiptDetails = {
  ReceiptNo: "PT03-067-03-117",
  TransactionID: "AB-879-67",
  payedDate: "24.04.18",
  OwnerName: "Harishikesh Anand",
  PropertyID: "PID-78-567",
  Property: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  AmountPaid: "1432.47",
  button1: "Link previous payments",
  button2: "Finish",
  oldPropertyId: "oldPropertyId",
  propertyId: "PB-PT-2018_07_19-000016",
  header: {
    header: "AMRITSAR MUNICIPAL CORPORATION",
    subheader: "Property Tax Payment Receipt (Citizen Copy)",
    logo: _pblogo2.default
  },
  tax: {
    AmountPaid: "100",
    fireCess: "10",
    rebate: "10",
    total: "100"
  },
  receipts: {
    AmountPaid: "60",
    transactionId: "TR123",
    bankName: "ICICI",
    payMode: "Net Banking",
    pendingAmt: "40",
    paymentDate: "24/07/2018"
  },
  propertyDetails: [{
    noOfFloors: 2,
    landArea: 10,
    propertySubType: "INDEPENDENTBUILDING",
    financialYear: "2017-18",
    assessmentDate: 1531987969654,
    assessmentNumber: "PB-PT-2018_07_19-000019",
    documents: [{
      name: "aadhar",
      id: "12345"
    }],
    units: [{
      floorNo: "1",
      occupancyType: "RENTED",
      usageCategoryDetail: "GROCERYSTORE",
      usageCategoryMajor: "NONRESIDENTIAL",
      usageCategoryMinor: "COMMERCIAL",
      usageCategorySubMinor: "RETAIL",
      unitArea: 10,
      arv: 100.1
    }, {
      floorNo: "2",
      occupancyType: "SELFOCCUPIED",
      usageCategoryDetail: "GROCERYSTORE",
      usageCategoryMajor: "NONRESIDENTIAL",
      usageCategoryMinor: "COMMERCIAL",
      usageCategorySubMinor: "RETAIL",
      unitArea: 90,
      arv: 200
    }]
  }],
  address: {
    buildingName: "Springfield",
    city: "amritsar",
    locality: {
      code: "abc"
    },

    street: "Sarjapur Road",
    doorNo: "1/11"
  },
  owners: {
    mobileNumber: "9000000007",
    OwnershipType: "Individual",
    name: "testseven",
    ownerType: "WIDOW",

    correspondenceAddress: "bangalore"
  }
};

var buttons = {
  button1: "Link previous payments",
  button2: "Finish"
};

var successMessages = {
  Message1: "Thank you !",
  Message2: "PT_RECEIPT_SUCCESS_MESSAGE"
};

var icon = _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" });

var PaymentSuccess = function PaymentSuccess() {
  return _react2.default.createElement(
    _common.Screen,
    null,
    _react2.default.createElement(_PaymentStatus2.default, { receiptDetails: receiptDetails, floatingButtonColor: "#22b25f", icon: icon, messages: successMessages, buttons: buttons })
  );
};

exports.default = PaymentSuccess;
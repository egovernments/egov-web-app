"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReceiptDetails = exports.createReceiptUIInfo = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

var _commons = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTaxInfo = function getTaxInfo(billAccountDetails, totalAmount, localizationLabels) {
  var headersFromAPI = billAccountDetails.map(function (item) {
    return item.accountDescription && item.accountDescription.split("-")[0];
  });
  var headers = ["PT_TAX", "PT_FIRE_CESS", "PT_CANCER_CESS", "PT_TIME_PENALTY", "PT_TIME_REBATE", "PT_TIME_INTEREST", "PT_UNIT_USAGE_EXEMPTION", "PT_OWNER_EXEMPTION", "PT_ADHOC_PENALTY", "PT_ADHOC_REBATE", "PT_ADVANCE_CARRYFORWARD", "PT_DECIMAL_CEILING", "PT_DECIMAL_CEILING_CREDIT", "PT_DECIMAL_CEILING_CREDIT_DEBIT", "PT_DECIMAL_CEILING_DEBIT"];
  var negativeHeaders = ["PT_ADHOC_REBATE", "PT_ADVANCE_CARRYFORWARD", "PT_DECIMAL_CEILING_CREDIT_DEBIT", "PT_DECIMAL_CEILING_DEBIT", "PT_OWNER_EXEMPTION", "PT_TIME_REBATE", "PT_UNIT_USAGE_EXEMPTION"];
  var transformedHeaders = headers.reduce(function (result, current) {
    if (headersFromAPI.indexOf(current) > -1) {
      result.push(current);
    }
    return result;
  }, []);
  var taxArray = transformedHeaders.reduce(function (result, current) {
    result[0].push({ text: (0, _commons.getTranslatedLabel)(current, localizationLabels) });
    // result[0].push({ text: getTranslatedLabel(current.accountDescription.split("-")[0], localizationLabels) });
    var taxHeadContent = billAccountDetails.filter(function (item) {
      return item.accountDescription && item.accountDescription.split("-")[0] === current;
    });
    taxHeadContent && taxHeadContent[0] && result[1].push({
      text: taxHeadContent[0] ? taxHeadContent[0].debitAmount ? "-" + taxHeadContent[0].debitAmount : taxHeadContent[0].crAmountToBePaid ? taxHeadContent[0].crAmountToBePaid : "0" : "NA"
    });
    return result;
  }, [[], []]);
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

var getHeaderDetails = function getHeaderDetails(property, cities) {
  var propertyTenant = cities.filter(function (item) {
    return item.code === property.tenantId;
  });

  return {
    header: propertyTenant[0].name + " MUNICIPAL CORPORATION",
    subheader: "Property Tax Payment Receipt",
    logo: _pblogo2.default,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl
  };
};

var createReceiptDetails = function createReceiptDetails(property, propertyDetails, receiptDetails, localizationLabels, cities, totalAmountToPay) {
  return {
    ReceiptNo: (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    header: getHeaderDetails(property, cities),
    taxNew: receiptDetails && getTaxInfo(receiptDetails.Bill[0].billDetails[0].billAccountDetails, receiptDetails.Bill[0].billDetails[0].totalAmount, localizationLabels),
    tax: {
      AmountPaid: "100",
      fireCess: "10",
      rebate: "10",
      total: "100"
    },
    receipts: {
      AmountPaid: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString(),
      transactionId: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      bankName: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.bank.name", "NA"),
      payMode: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.instrumentType.name", "Net Banking"),
      pendingAmt: receiptDetails && (totalAmountToPay - (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid")).toString(),
      paymentDate: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      transactionNo: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.transactionNumber"),
      transactionDate: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "instrument.transactionDateInput")),
      bankNameBranch: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.bank.name") + ", " + (0, _get2.default)(receiptDetails, "instrument.branchName"),
      G8receiptNo: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].manualReceiptNumber"),
      G8receiptDate: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].manualReceiptDate") && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].manualReceiptDate"))
    },
    propertyDetails: [(0, _extends3.default)({}, propertyDetails)],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId
  };
};

var createReceiptUIInfo = function createReceiptUIInfo(property, receiptDetails, cities, totalAmountToPay, success) {
  var _property$propertyDet = property.propertyDetails[0],
      ownerDetails = _property$propertyDet.owners,
      financialYear = _property$propertyDet.financialYear;

  var ownerInfo = ownerDetails.map(function (item, index) {
    return {
      key: "Owner" + (ownerDetails.length > 1 ? index + 1 : "") + " name:",
      value: item.name
    };
  });
  return {
    propertyInfo: property && [].concat((0, _toConsumableArray3.default)(ownerInfo), [{
      key: "Existing Property ID:",
      value: property.oldPropertyId
    }, {
      key: "Property Tax Unique ID:",
      value: property.propertyId
    }, {
      key: "Property Address:",
      value: (0, _commons.getCommaSeperatedAddress)(property.address, cities)
    }]),
    receiptInfo: [{
      key: "Assessment No.: ",
      value: receiptDetails && (0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].consumerCode" : "billDetails[0].consumerCode").split(":")[1]
    }, {
      key: "Receipt No:",
      value: receiptDetails && (0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].receiptNumber" : "billDetails[0].receiptNumber")
    }, {
      key: "Payment Term:",
      value: financialYear
    }, {
      key: "Date:",
      value: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].receiptDate" : "billDetails[0].billDate"))
    }, {
      key: "Payable Amount:",
      value: totalAmountToPay ? totalAmountToPay.toString() : 0
    }, {
      key: "Amount Paid:",
      value: receiptDetails && success ? (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString() : "0"
    }, {
      key: "Amount Due:",
      value: receiptDetails && (totalAmountToPay - (success ? (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid") : 0)).toString()
    }]
  };
};

exports.createReceiptUIInfo = createReceiptUIInfo;
exports.createReceiptDetails = createReceiptDetails;
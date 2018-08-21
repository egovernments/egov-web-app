"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

var _commons = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTaxInfo = function getTaxInfo(billAccountDetails, totalAmount, localizationLabels) {
  var taxArray = billAccountDetails.reduce(function (result, current) {
    current.accountDescription && result[0].push({ text: (0, _commons.getTranslatedLabel)(current.accountDescription.split("-")[0], localizationLabels) });
    current.accountDescription && result[1].push({ text: current.crAmountToBePaid });
    return result;
  }, [[], []]);
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

var getBase64FromImageUrl = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
    var img, dataURL;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            img = new Image();

            img.setAttribute("crossOrigin", "anonymous");

            _context.next = 4;
            return function () {
              var canvas = document.createElement("canvas");
              canvas.width = this.width;
              canvas.height = this.height;

              var ctx = canvas.getContext("2d");
              ctx.drawImage(this, 0, 0);

              dataURL = canvas.toDataURL("image/png");

              dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            };

          case 4:
            img.onload = _context.sent;
            return _context.abrupt("return", dataURL);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getBase64FromImageUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();
// const url = `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${property.tenantId}/logo.png`;
var getHeaderDetails = function getHeaderDetails(property, cities) {
  var propertyTenant = cities.filter(function (item) {
    return item.code === property.tenantId;
  });
  return {
    header: propertyTenant[0].name + " MUNICIPAL CORPORATION",
    subheader: "Property Tax Payment Receipt (Citizen Copy)",
    logo: propertyTenant[0].imageId || _pblogo2.default,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl
  };
};

var createReceiptDetails = function createReceiptDetails(property, propertyDetails, receiptDetails, localizationLabels, cities) {
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
      AmountPaid: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid"),
      transactionId: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      bankName: "AXIS",
      payMode: "Net Banking",
      pendingAmt: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].totalAmount") - (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid"),
      paymentDate: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber")
    },
    propertyDetails: [(0, _extends3.default)({}, propertyDetails)],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId
  };
};

exports.default = createReceiptDetails;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var receiptDetails = {
  OwnerName: "Harishikesh Anand",
  PropertyID: "PID-78-567",
  Property: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  PropertyTaxDue: "1432.47"
};

var buttons = {
  button2: "Retry"
};

var failureMessages = {
  Message1: "OOPS !",
  Message2: "PT_RECEIPT_FAILURE_MESSAGE"
};

var icon = _react2.default.createElement(_components.Icon, { action: "navigation", name: "close" });

var PaymentSuccess = function PaymentSuccess() {
  return _react2.default.createElement(
    _common.Screen,
    null,
    _react2.default.createElement(_PaymentStatus2.default, { receiptDetails: receiptDetails, floatingButtonColor: "#e74c3c", icon: icon, messages: failureMessages, buttons: buttons })
  );
};

exports.default = PaymentSuccess;
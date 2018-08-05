"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _common = require("modules/common");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _receiptsPDF = require("./Components/receiptsPDF");

var _receiptsPDF2 = _interopRequireDefault(_receiptsPDF);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
  fontWeight: 500
};

var PaymentStatus = function PaymentStatus(_ref) {
  var receiptDetails = _ref.receiptDetails,
      floatingButtonColor = _ref.floatingButtonColor,
      icon = _ref.icon,
      messages = _ref.messages,
      buttons = _ref.buttons;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { style: { marginBottom: "50px" }, className: "col-md-offset-4 col-lg-offset-4 col-md-4 col-lg-4" },
      _react2.default.createElement(_components.Card, {
        className: "pt-success-receipt ",
        textChildren: _react2.default.createElement(
          "div",
          { className: "pt-reciept-top-cont" },
          _react2.default.createElement(
            _FloatingActionButton2.default,
            { className: "floating-button", style: { boxShadow: 0 }, backgroundColor: floatingButtonColor },
            icon
          ),
          _react2.default.createElement(_translationNode2.default, { containerStyle: { paddingTop: "30px" }, label: messages.Message1, labelStyle: { color: "#484848", fontWeight: 900 } }),
          _react2.default.createElement(_translationNode2.default, { containerStyle: { paddingTop: "10px" }, label: messages.Message2, labelStyle: { color: "#484848", fontWeight: 900 } })
        )
      }),
      _react2.default.createElement(_components.Card, {
        className: "pt-success-receipt",
        textChildren: _react2.default.createElement(
          "div",
          null,
          receiptDetails.ReceiptNo && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_RECEIPT_NO" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.ReceiptNo })
          ),
          receiptDetails.TransactionID && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_DATE" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.TransactionID })
          ),
          receiptDetails.payedDate && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_DATE" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.payedDate })
          ),
          _react2.default.createElement(_components.Divider, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } }),
          receiptDetails.OwnerName && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_OWNER_NAME" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.OwnerName })
          ),
          receiptDetails.OwnerName && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_PROPERTY" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.PropertyID })
          ),
          receiptDetails.Property && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_PROPERTY" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.Property })
          ),
          _react2.default.createElement(_components.Divider, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } }),
          receiptDetails.PaymentTerm && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_PAYMENT_TERM" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.PaymentTerm })
          ),
          receiptDetails.AmountPaid && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_AMOUNT_PAID" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.AmountPaid })
          ),
          receiptDetails.PropertyTaxDue && _react2.default.createElement(
            "div",
            { className: "row pt-reciept-label" },
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: "PT_RECEIPT_PROPERTY_TAX_DUE" }),
            _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: receiptDetails.PropertyTaxDue })
          )
        )
      }),
      receiptDetails.ReceiptNo && _react2.default.createElement(
        "div",
        {
          onClick: function onClick() {
            (0, _receiptsPDF2.default)("pt-reciept-citizen", receiptDetails);
          }
        },
        _react2.default.createElement(_translationNode2.default, {
          label: "DOWNLOAD RECEIPT",
          color: "#fe7a51",
          labelStyle: { textAlign: "center", fontWeight: 500, fontSize: "16px", cursor: "pointer" }
        })
      )
    ),
    _react2.default.createElement(_common.ActionFooter, { label1: buttons.button1, label2: buttons.button2 })
  );
};

exports.default = PaymentStatus;
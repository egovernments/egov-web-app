"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _ActionFooter = require("../../common/ActionFooter");

var _ActionFooter2 = _interopRequireDefault(_ActionFooter);

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
  var generalMDMSDataById = _ref.generalMDMSDataById,
      noExistingPropertyId = _ref.noExistingPropertyId,
      receiptUIDetails = _ref.receiptUIDetails,
      receiptDetails = _ref.receiptDetails,
      floatingButtonColor = _ref.floatingButtonColor,
      icon = _ref.icon,
      messages = _ref.messages,
      buttons = _ref.buttons,
      primaryAction = _ref.primaryAction,
      tenantId = _ref.tenantId,
      receiptImageUrl = _ref.receiptImageUrl;

  console.log(receiptImageUrl);
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
          _react2.default.createElement(
            "div",
            null,
            messages.Message1
          ),
          _react2.default.createElement(
            "div",
            null,
            messages.Message2
          )
        )
      }),
      noExistingPropertyId && _react2.default.createElement(
        "div",
        {
          className: "rainmaker-displayInline",
          style: { padding: "12px 12px 12px 12px", border: "1px solid #5aaafa", borderLeft: "5px solid #5aaafa" }
        },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_components.Icon, { action: "action", name: "info", color: "#30588c" })
        ),
        _react2.default.createElement(
          "div",
          { style: { marginLeft: 16 } },
          _react2.default.createElement(_translationNode2.default, { fontSize: "14px", color: "#484848", label: "PT_FORM1_INFORMATION_MESSAGE" })
        )
      ),
      receiptUIDetails && receiptUIDetails.propertyInfo.length && receiptUIDetails.receiptInfo.length ? _react2.default.createElement(_components.Card, {
        className: "pt-success-receipt",
        textChildren: _react2.default.createElement(
          "div",
          null,
          receiptUIDetails && receiptUIDetails.propertyInfo && receiptUIDetails.propertyInfo.map(function (item) {
            return _react2.default.createElement(
              "div",
              { className: "row pt-reciept-label" },
              _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: item.key }),
              _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: item.value || "NA" })
            );
          }),
          _react2.default.createElement(_components.Divider, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } }),
          receiptUIDetails && receiptUIDetails.receiptInfo && receiptUIDetails.receiptInfo.map(function (item) {
            return _react2.default.createElement(
              "div",
              { className: "row pt-reciept-label" },
              _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", label: item.key }),
              _react2.default.createElement(_translationNode2.default, { className: "col-xs-6", labelStyle: labelStyle, label: item.value || item.value === "0" ? item.value : "NA" })
            );
          })
        )
      }) : null,
      receiptDetails && receiptDetails.ReceiptNo && _react2.default.createElement(
        "div",
        {
          onClick: function onClick() {
            (0, _receiptsPDF2.default)("pt-reciept-citizen", receiptDetails, generalMDMSDataById, receiptImageUrl);
          }
        },
        _react2.default.createElement(_translationNode2.default, {
          label: "DOWNLOAD RECEIPT",
          color: "#fe7a51",
          labelStyle: { textAlign: "center", fontWeight: 500, fontSize: "16px", cursor: "pointer" }
        })
      )
    ),
    _react2.default.createElement(_ActionFooter2.default, { label2: buttons.button2, primaryAction: primaryAction })
  );
};

exports.default = PaymentStatus;
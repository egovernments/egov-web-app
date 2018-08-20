"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

var _AssessmentInfoTable = require("../AssessmentInfoTable");

var _AssessmentInfoTable2 = _interopRequireDefault(_AssessmentInfoTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReceiptItems = function ReceiptItems(_ref) {
  var items = _ref.items,
      propertyTaxAssessmentID = _ref.propertyTaxAssessmentID;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "receipt-displayInline" },
      _react2.default.createElement(_components.Icon, { action: "action", name: "assignment", color: "#767676" }),
      _react2.default.createElement(_translationNode2.default, {
        bold: true,
        label: "Property Tax Assessment ID.: " + propertyTaxAssessmentID,
        containerStyle: { marginLeft: "13px" },
        labelStyle: { letterSpacing: 0 },
        color: "#767676"
      })
    ),
    _react2.default.createElement(_components.Divider, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } }),
    _react2.default.createElement(
      "div",
      null,
      items.map(function (item, index) {
        return _react2.default.createElement(
          "div",
          { key: index },
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "receipt-displayInline" },
              _react2.default.createElement(_components.Icon, { action: item.iconAction, name: item.iconName, color: "#767676" }),
              _react2.default.createElement(_translationNode2.default, { label: item.heading, containerStyle: { marginLeft: "13px" }, bold: true, dark: true, labelStyle: { letterSpacing: 0.6 } })
            ),
            item.showTable ? _react2.default.createElement(_AssessmentInfoTable2.default, { items: item.items, tableHeaderItems: item.tableHeaderItems }) : item.nestedItems ? item.items.map(function (nestedItem, nestedIndex) {
              return _react2.default.createElement(_components.Receipt, { receiptItems: nestedItem.items, header: item.items.length > 1 && "Owner " + (nestedIndex + 1) });
            }) : _react2.default.createElement(_components.Receipt, { receiptItems: item.items })
          ),
          _react2.default.createElement(_components.Divider, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } })
        );
      })
    ),
    _react2.default.createElement(
      "div",
      { className: "text-center" },
      _react2.default.createElement(_components.Button, {
        className: "receipt-button",
        primary: true,
        label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "ASSESS & PAY" }),
        style: {
          height: 36,
          lineHeight: "auto",
          minWidth: "inherit"
        },
        labelStyle: {
          padding: "0 31px",
          letterSpacing: "0.6px",
          display: "inline-block",
          height: "22px",
          lineHeight: "22px",
          fontSize: "14px"
        },
        onClick: function onClick(e) {
          // this.props.redirectToMap(true);
        }
      })
    )
  );
};

exports.default = ReceiptItems;
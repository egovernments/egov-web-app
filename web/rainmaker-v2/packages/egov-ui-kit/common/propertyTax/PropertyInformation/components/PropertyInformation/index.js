"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Receipt = require("egov-ui-kit/components/Receipt");

var _Receipt2 = _interopRequireDefault(_Receipt);

var _Icon = require("egov-ui-kit/components/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _Divider = require("egov-ui-kit/components/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _AssessmentInfoTable = require("../AssessmentInfoTable");

var _AssessmentInfoTable2 = _interopRequireDefault(_AssessmentInfoTable);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReceiptItems = function ReceiptItems(_ref) {
  var items = _ref.items,
      propertyTaxAssessmentID = _ref.propertyTaxAssessmentID,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "receipt-displayInline" },
      _react2.default.createElement(_Icon2.default, { action: "action", name: "assignment", color: "#767676" }),
      _react2.default.createElement(_translationNode2.default, {
        bold: true,
        label: "Property Tax Assessment ID.: " + propertyTaxAssessmentID,
        containerStyle: { marginLeft: "13px" },
        labelStyle: { letterSpacing: 0 },
        color: "#767676"
      })
    ),
    _react2.default.createElement(_Divider2.default, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } }),
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
              _react2.default.createElement(_Icon2.default, { action: item.iconAction, name: item.iconName, color: "#767676" }),
              _react2.default.createElement(_translationNode2.default, { label: item.heading, containerStyle: { marginLeft: "13px" }, bold: true, dark: true, labelStyle: { letterSpacing: 0.6 } })
            ),
            item.showTable ? _react2.default.createElement(_AssessmentInfoTable2.default, { items: item.items, tableHeaderItems: item.tableHeaderItems }) : item.nestedItems ? item.items.map(function (nestedItem, nestedIndex) {
              return _react2.default.createElement(_Receipt2.default, { receiptItems: nestedItem.items, header: item.items.length > 1 && "Owner " + (nestedIndex + 1) });
            }) : _react2.default.createElement(_Receipt2.default, { receiptItems: item.items })
          ),
          _react2.default.createElement(_Divider2.default, { className: "reciept-divider", inset: true, lineStyle: { marginLeft: 0, marginRight: 0 } })
        );
      })
    )
  );
};

exports.default = ReceiptItems;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _PastPaymentDetailsForm = require("modules/citizen/PropertyTax/LinkPastPayments/PastPaymentDetailsForm");

var _PastPaymentDetailsForm2 = _interopRequireDefault(_PastPaymentDetailsForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getListItems = function getListItems(items) {
  return items.map(function (item, index) {
    return {
      primaryText: _react2.default.createElement(_translationNode2.default, { label: item.primaryText, fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
      secondaryText: _react2.default.createElement(_translationNode2.default, { label: item.secondaryText, fontSize: "14px", color: "#484848", containerStyle: { marginTop: "15px" } }),
      route: item.route,
      nestedItems: [{
        secondaryText: _react2.default.createElement(_PastPaymentDetailsForm2.default, {
          formKey: "pastPayments",
          path: "PropertyTaxPay",
          extraFields: { "year": { "value": item.primaryText } },
          index: index,
          copyName: "pastPayments_" + index
        }),
        disabled: true,
        listContainerStyle: { padding: 0 }
      }]
    };
  });
};

var PastPaymentList = function PastPaymentList(_ref) {
  var history = _ref.history,
      items = _ref.items,
      header = _ref.header,
      subHeader = _ref.subHeader;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_translationNode2.default, {
      label: header,
      containerStyle: { paddingBottom: "11px", marginLeft: "16px" },
      dark: true,
      bold: true,
      labelStyle: { letterSpacing: 0 },
      fontSize: "20px"
    }),
    _react2.default.createElement(_translationNode2.default, {
      label: subHeader,
      containerStyle: { paddingBottom: "5px", marginLeft: "16px" },
      dark: true,
      bold: true,
      labelStyle: { letterSpacing: 0 },
      fontSize: "16px"
    }),
    _react2.default.createElement(_components.List, {
      items: getListItems(items),
      primaryTogglesNestedList: true,
      onItemClick: function onItemClick(item, index) {
        history && history.push(item.route);
      }
    })
  );
};

exports.default = PastPaymentList;
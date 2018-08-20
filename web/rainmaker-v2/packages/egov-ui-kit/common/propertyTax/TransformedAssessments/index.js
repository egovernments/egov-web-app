"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransformedItems = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _commons = require("egov-ui-kit/utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 5
};

var getTransformedItems = exports.getTransformedItems = function getTransformedItems(propertiesById) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "INR 1300.00", fontSize: "16px", color: "#484848", bold: true, labelStyle: primaryTextLabelStyle }),

        secondaryText: _react2.default.createElement(
          "div",
          { style: { height: "auto", marginTop: 0 } },
          _react2.default.createElement(_translationNode2.default, {
            label: item && item.financialYear,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: (0, _commons.getCommaSeperatedAddress)(curr.address.buildingName, curr.address.street),
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "Assessment No.: " + item.assessmentNumber,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          })
        ),
        date: (0, _commons.getDateFromEpoch)(item.assessmentDate),
        status: "Paid",

        receipt: true
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};
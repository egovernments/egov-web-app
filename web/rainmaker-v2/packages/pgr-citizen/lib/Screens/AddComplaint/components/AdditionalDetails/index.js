"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdditionalDetailsCard = function AdditionalDetailsCard(_ref) {
  var _ref$additionalDetail = _ref.additionalDetails,
      additionalDetails = _ref$additionalDetail === undefined ? {} : _ref$additionalDetail,
      handleFieldChange = _ref.handleFieldChange;

  return _react2.default.createElement(
    "div",
    { className: "additional-details-main-cont" },
    _react2.default.createElement(_components.Card, {
      className: "additional-details-card common-padding-for-new-complaint-card",
      textChildren: _react2.default.createElement(_components.TextField, (0, _extends3.default)({
        id: "addComplaint-additional-details"
      }, additionalDetails, {
        onChange: function onChange(e, value) {
          return handleFieldChange("additionalDetails", value);
        },
        name: "additional-details",
        multiLine: true
      }))
    })
  );
};

exports.default = AdditionalDetailsCard;
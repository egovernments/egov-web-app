"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleButton = function SingleButton(_ref) {
  var label = _ref.label,
      handleClose = _ref.handleClose;

  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: "/property-tax/assessment-form#0" },
    _react2.default.createElement(_components.Button, { className: "year-range-button", label: label, labelColor: "#00bbd3", buttonStyle: { borderRadius: "50px", border: "1px solid #00bbd3" } })
  );
};

exports.default = SingleButton;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var style = { marginLeft: 10, marginTop: 2 };

var Breadcrumbs = function Breadcrumbs(_ref) {
  var url = _ref.url;

  return _react2.default.createElement(
    "div",
    { className: "rainmaker-displayInline", style: { paddingLeft: 15 } },
    _react2.default.createElement(_Icon2.default, {
      action: "action",
      name: "home",
      color: "#fe7a51"
    }),
    url &&
      url.map(function(item, index) {
        return _react2.default.createElement(
          "div",
          { className: "rainmaker-displayInline" },
          _react2.default.createElement("div", { style: style }, "\u276F"),
          _react2.default.createElement("div", { style: style }, item)
        );
      })
  );
};

exports.default = Breadcrumbs;

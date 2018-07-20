"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Image = require("../Image");

var _Image2 = _interopRequireDefault(_Image);

var _MsevaLogo = require("egov-ui-kit/assets/images/Mseva logo.png");

var _MsevaLogo2 = _interopRequireDefault(_MsevaLogo);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageStyle = {
  height: "auto",
  width: "76px"
};

var spanStyle = {
  fontSize: "16px",
  width: "54px"
};

var Logo = function Logo() {
  return _react2.default.createElement(
    "div",
    { style: { display: "flex", justifyContent: "center" } },
    _react2.default.createElement(
      "div",
      { className: "mseva-image-container" },
      _react2.default.createElement(_Image2.default, { className: "mseva-logo-style", source: "" + _MsevaLogo2.default, style: imageStyle })
    ),
    _react2.default.createElement(
      "div",
      { className: "mseva-text-container" },
      _react2.default.createElement(
        "span",
        { style: spanStyle },
        " Punjab"
      )
    )
  );
};

exports.default = Logo;
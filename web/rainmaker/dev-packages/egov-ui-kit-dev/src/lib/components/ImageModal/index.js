"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Image = require("../Image");

var _Image2 = _interopRequireDefault(_Image);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageModal = function ImageModal(_ref) {
  var imageSource = _ref.imageSource,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style,
      className = _ref.className,
      onCloseClick = _ref.onCloseClick,
      hide = _ref.hide;

  return _react2.default.createElement(
    "div",
    { className: "modal", style: hide ? { display: "none" } : { display: "flex" } },
    _react2.default.createElement(_Image2.default, { source: imageSource, width: width, height: height, style: hide ? { width: "0%" } : { width: "100%" }, className: className }),
    _react2.default.createElement(
      "div",
      { className: "modal-close-cont", onClick: onCloseClick },
      _react2.default.createElement(_Icon2.default, { action: "navigation", name: "close", color: "#ffffff" })
    )
  );
};

exports.default = ImageModal;
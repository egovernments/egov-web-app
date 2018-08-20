"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextAreaComponent = function TextAreaComponent(_ref) {
  var hintText = _ref.hintText,
      onChange = _ref.onChange,
      value = _ref.value;

  return _react2.default.createElement(_components.TextArea, {
    id: "feedback-comments",
    hintText: hintText,
    style: { marginTop: "10px" },
    underlineShow: true,
    hintStyle: { letterSpacing: "0.7px" },
    rowsMax: 3,
    onChange: onChange,
    value: value
  });
};

exports.default = TextAreaComponent;
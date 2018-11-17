"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hintStyle = {
  color: "rgba(0, 0, 0, 0.3799999952316284)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "0.3px"
};

var TextAreaUi = function TextAreaUi(_ref) {
  var onChange = _ref.onChange,
      hintText = _ref.hintText,
      value = _ref.value;

  return _react2.default.createElement(_components.TextArea, {
    id: "reopencomplaint-comment-field",
    hintText: hintText,
    hintStyle: hintStyle,
    rowsMax: 2,
    onChange: onChange,
    underlineShow: true,
    underlineStyle: { borderColor: "#e0e0e0" },
    underlineFocusStyle: { borderColor: "#e0e0e0" },
    value: value
  });
};

exports.default = TextAreaUi;
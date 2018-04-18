"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelText = function labelText(label, labelStyle, labelClassName) {
  return label && label.length ? _react2.default.createElement(
    "div",
    { className: "label-text " + labelClassName, style: labelStyle },
    label
  ) : "";
};

var Label = function Label(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      label = _ref.label,
      color = _ref.color,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === undefined ? 14 : _ref$fontSize,
      _ref$dark = _ref.dark,
      dark = _ref$dark === undefined ? false : _ref$dark,
      _ref$upperCase = _ref.upperCase,
      upperCase = _ref$upperCase === undefined ? false : _ref$upperCase,
      _ref$bold = _ref.bold,
      bold = _ref$bold === undefined ? false : _ref$bold,
      _ref$containerStyle = _ref.containerStyle,
      containerStyle = _ref$containerStyle === undefined ? {} : _ref$containerStyle,
      _ref$labelStyle = _ref.labelStyle,
      labelStyle = _ref$labelStyle === undefined ? {} : _ref$labelStyle,
      _ref$labelClassName = _ref.labelClassName,
      labelClassName = _ref$labelClassName === undefined ? "" : _ref$labelClassName,
      _ref$buttonLabel = _ref.buttonLabel,
      buttonLabel = _ref$buttonLabel === undefined ? false : _ref$buttonLabel,
      id = _ref.id;

  var additionalStyles = {};

  if (color) {
    additionalStyles.color = color;
  }
  if (!color && buttonLabel) {
    additionalStyles.color = "#ffffff";
  }
  if (dark) {
    additionalStyles.color = "#484848";
  }
  if (bold) {
    additionalStyles.fontWeight = 500;
  }
  if (fontSize) {
    additionalStyles.fontSize = fontSize;
  }
  if (upperCase) {
    additionalStyles.textTransform = "uppercase";
  }

  if (Object.keys(labelStyle).length || Object.keys(additionalStyles).length) {
    labelStyle = Object.assign({}, labelStyle, additionalStyles);
  }

  return _react2.default.createElement(
    "div",
    { id: id, style: containerStyle, className: buttonLabel ? "button-label-container " + className : "label-container " + className },
    labelText(label, labelStyle, labelClassName)
  );
};

Label.propTypes = {
  label: _propTypes2.default.string,
  color: _propTypes2.default.string,
  bold: _propTypes2.default.bool,
  upperCase: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  containerStyle: _propTypes2.default.object,
  labelStyle: _propTypes2.default.object,
  labelClassName: _propTypes2.default.string
};

exports.default = Label;
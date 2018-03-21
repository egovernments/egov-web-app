"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require("../TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// can we pull the existing textfield


var containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box"
};

var getStyles = function getStyles(iconPosition, textFieldProps) {
  var textFieldStyle = {};

  var iconStyle = {
    position: "absolute",
    color: "#969696",
    zIndex: 2,
    bottom: 15
  };
  iconStyle[iconPosition === "before" ? "left" : "right"] = 0;
  textFieldStyle["textIndent"] = iconPosition === "before" ? 40 : 0;

  if (textFieldProps.floatingLabelText) {
    iconStyle.top = 30;
  }

  return {
    iconStyle: iconStyle,
    textFieldStyle: textFieldStyle
  };
};

var TextFieldIcon = function TextFieldIcon(_ref) {
  var Icon = _ref.Icon,
      _ref$iconStyle = _ref.iconStyle,
      iconStyle = _ref$iconStyle === undefined ? {} : _ref$iconStyle,
      onClick = _ref.onClick,
      _ref$textFieldStyle = _ref.textFieldStyle,
      textFieldStyle = _ref$textFieldStyle === undefined ? {} : _ref$textFieldStyle,
      _ref$iconPosition = _ref.iconPosition,
      iconPosition = _ref$iconPosition === undefined ? "after" : _ref$iconPosition,
      textFieldProps = _objectWithoutProperties(_ref, ["Icon", "iconStyle", "onClick", "textFieldStyle", "iconPosition"]);

  var style = getStyles(iconPosition, textFieldProps);
  return _react2.default.createElement(
    "div",
    { onClick: onClick, style: containerStyle },
    _react2.default.createElement(Icon, { style: _extends({}, style.iconStyle, iconStyle) }),
    _react2.default.createElement(_TextField2.default, _extends({ name: "textfield-icon", style: _extends({}, style.textFieldStyle, textFieldStyle), fullWidth: false }, textFieldProps))
  );
};

TextFieldIcon.propTypes = {
  onClick: _propTypes2.default.func,
  iconPosition: _propTypes2.default.string,
  textFieldStyle: _propTypes2.default.object,
  iconProps: _propTypes2.default.object,
  iconStyle: _propTypes2.default.object
};

exports.default = TextFieldIcon;
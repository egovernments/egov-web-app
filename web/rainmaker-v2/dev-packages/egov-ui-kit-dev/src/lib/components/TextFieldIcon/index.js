"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require("../TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box",
  fontSize: 0
};
// can we pull the existing textfield


var getStyles = function getStyles(iconPosition, textFieldProps) {
  var textFieldStyle = {},
      inputStyle = {};

  var iconStyle = {
    position: "absolute",
    color: "#969696",
    zIndex: 2,
    bottom: 0,
    top: 0,
    margin: "auto"
  };
  iconStyle[iconPosition === "before" ? "left" : "right"] = 0;
  textFieldStyle["textIndent"] = iconPosition === "before" ? 40 : 0;
  inputStyle["width"] = iconPosition === "after" ? "90%" : "100%";

  if (textFieldProps.floatingLabelText) {
    iconStyle.top = 30;
  }

  return {
    iconStyle: iconStyle,
    textFieldStyle: textFieldStyle,
    inputStyle: inputStyle
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
      autoFocus = _ref.autoFocus,
      className = _ref.className,
      textFieldProps = (0, _objectWithoutProperties3.default)(_ref, ["Icon", "iconStyle", "onClick", "textFieldStyle", "iconPosition", "autoFocus", "className"]);

  var style = getStyles(iconPosition, textFieldProps);
  return _react2.default.createElement(
    "div",
    { onClick: onClick, style: containerStyle },
    _react2.default.createElement(Icon, { style: (0, _extends3.default)({}, style.iconStyle, iconStyle) }),
    _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
      autoFocus: autoFocus,
      name: "textfield-icon",
      className: className,
      style: (0, _extends3.default)({}, style.textFieldStyle, textFieldStyle),
      inputStyle: (0, _extends3.default)({}, style.inputStyle)
    }, textFieldProps))
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
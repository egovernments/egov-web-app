"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(
  _objectWithoutProperties2
);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _translationNode = require("../../utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _TextField = require("../TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _search = require("material-ui/svg-icons/action/search");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
  inputStyle["width"] = iconPosition === "after" ? "90%" : "90%";

  if (textFieldProps.floatingLabelText) {
    iconStyle.top = 24;
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
    text = _ref.text,
    onClick = _ref.onClick,
    onIconClick = _ref.onIconClick,
    _ref$textFieldStyle = _ref.textFieldStyle,
    textFieldStyle =
      _ref$textFieldStyle === undefined ? {} : _ref$textFieldStyle,
    _ref$iconPosition = _ref.iconPosition,
    iconPosition =
      _ref$iconPosition === undefined ? "after" : _ref$iconPosition,
    autoFocus = _ref.autoFocus,
    className = _ref.className,
    inputStyle = _ref.inputStyle,
    disabled = _ref.disabled,
    textFieldProps = (0, _objectWithoutProperties3.default)(_ref, [
      "Icon",
      "iconStyle",
      "onClick",
      "onIconClick",
      "textFieldStyle",
      "iconPosition",
      "autoFocus",
      "className",
      "inputStyle",
      "disabled"
    ]);

  var TargetIcon = Icon || _search2.default;
  var style = getStyles(iconPosition, textFieldProps);
  return _react2.default.createElement(
    "div",
    { onClick: onClick, style: containerStyle },
    text
      ? _react2.default.createElement(
          "div",
          { onClick: onIconClick },
          _react2.default.createElement(_translationNode2.default, {
            className: "textfield-text",
            label: text,
            labelStyle: (0, _extends3.default)({}, style.iconStyle, iconStyle, {
              top: 36
            })
          })
        )
      : _react2.default.createElement(TargetIcon, {
          onClick: onIconClick,
          style: (0, _extends3.default)({}, style.iconStyle, iconStyle)
        }),
    _react2.default.createElement(
      _TextField2.default,
      (0, _extends3.default)(
        {
          autoFocus: autoFocus,
          name: "textfield-icon",
          className: className,
          style: (0, _extends3.default)(
            {},
            style.textFieldStyle,
            textFieldStyle
          ),
          inputStyle: (0, _extends3.default)({}, style.inputStyle, inputStyle),
          disabled: disabled
        },
        textFieldProps
      )
    )
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

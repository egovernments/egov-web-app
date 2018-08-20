"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "#b3b3b3"
};

var floatingLabelBaseStyle = {
  top: 30,
  fontSize: "14px",
  letterSpacing: "0.6px"
};

var floatingLabelBaseShrinkStyle = {
  fontSize: "12px",
  color: "#00bcd1",
  transform: "scale(1) translate(0px, -16px)",
  fontWeight: 500
};

var inputBaseStyle = {
  paddingBottom: 10,
  fontSize: "16px",
  color: "#484848",
  letterSpacing: "0.7px"
};

var requiredStyle = {
  color: "red"
};

var underlineFocusBaseStyle = {
  borderColor: "#e0e0e0"
};

var TextField = function TextField(_ref) {
  var style = _ref.style,
      onChange = _ref.onChange,
      id = _ref.id,
      disabled = _ref.disabled,
      _ref$floatingLabelSty = _ref.floatingLabelStyle,
      floatingLabelStyle = _ref$floatingLabelSty === undefined ? {} : _ref$floatingLabelSty,
      hintText = _ref.hintText,
      errorText = _ref.errorText,
      _ref$errorStyle = _ref.errorStyle,
      errorStyle = _ref$errorStyle === undefined ? {} : _ref$errorStyle,
      _ref$fullWidth = _ref.fullWidth,
      fullWidth = _ref$fullWidth === undefined ? true : _ref$fullWidth,
      _ref$hintStyle = _ref.hintStyle,
      hintStyle = _ref$hintStyle === undefined ? {} : _ref$hintStyle,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? "" : _ref$value,
      floatingLabelText = _ref.floatingLabelText,
      _ref$underlineShow = _ref.underlineShow,
      underlineShow = _ref$underlineShow === undefined ? true : _ref$underlineShow,
      _ref$inputStyle = _ref.inputStyle,
      inputStyle = _ref$inputStyle === undefined ? {} : _ref$inputStyle,
      _ref$underlineFocusSt = _ref.underlineFocusStyle,
      underlineFocusStyle = _ref$underlineFocusSt === undefined ? {} : _ref$underlineFocusSt,
      required = _ref.required,
      type = _ref.type,
      autoFocus = _ref.autoFocus,
      maxLength = _ref.maxLength,
      multiLine = _ref.multiLine;

  return _react2.default.createElement(_TextField2.default, {
    errorText: errorText,
    errorStyle: errorStyle,
    value: value,
    onChange: onChange,
    disabled: disabled,
    inputStyle: (0, _extends3.default)({}, inputBaseStyle, inputStyle),
    className: "textfield " + className,
    style: style,
    id: id,
    floatingLabelShrinkStyle: floatingLabelBaseShrinkStyle,
    fullWidth: fullWidth,
    hintText: hintText,
    hintStyle: (0, _extends3.default)({}, hintBaseStyle, hintStyle),
    floatingLabelText: [floatingLabelText, required ? _react2.default.createElement(
      "span",
      { key: "error-" + className, style: requiredStyle },
      " ",
      "*"
    ) : null],
    floatingLabelStyle: (0, _extends3.default)({}, floatingLabelBaseStyle, floatingLabelStyle),
    underlineFocusStyle: (0, _extends3.default)({}, underlineFocusBaseStyle, { underlineFocusStyle: underlineFocusStyle }),
    underlineShow: underlineShow,
    floatingLabelFixed: true,
    type: type,
    autoFocus: autoFocus,
    maxLength: maxLength,
    autoComplete: type === "password" ? "new-password" : "off",
    multiLine: multiLine
  });
};

TextField.propTypes = {
  onChange: _propTypes2.default.func,
  errorText: _propTypes2.default.string,
  errorStyle: _propTypes2.default.object,
  value: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  hintText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  required: _propTypes2.default.bool,
  hide: _propTypes2.default.bool,
  floatingLabelText: _propTypes2.default.string,
  className: _propTypes2.default.string
};

exports.default = TextField;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
  backgroundColor: "transparent"
};
var TextAreaUi = function TextAreaUi(_ref) {
  var className = _ref.className,
      style = _ref.style,
      underlineShow = _ref.underlineShow,
      onChange = _ref.onChange,
      errorMessage = _ref.errorMessage,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? "" : _ref$value,
      disabled = _ref.disabled,
      isRequired = _ref.isRequired,
      hide = _ref.hide,
      rows = _ref.rows,
      hintText = _ref.hintText,
      hintStyle = _ref.hintStyle,
      textareaStyle = _ref.textareaStyle,
      rowsMax = _ref.rowsMax,
      underlineStyle = _ref.underlineStyle,
      underlineFocusStyle = _ref.underlineFocusStyle;

  return _react2.default.createElement(_TextField2.default, {
    className: className,
    fullWidth: true,
    multiLine: true,
    rows: rows,
    rowsMax: rowsMax,
    disabled: disabled,
    onChange: onChange,
    style: _extends({}, defaultStyle, style),
    hintText: hintText,
    hintStyle: hintStyle,
    textareaStyle: textareaStyle,
    underlineShow: underlineShow,
    underlineStyle: underlineStyle,
    underlineFocusStyle: underlineFocusStyle
  });
};

TextAreaUi.propTypes = {
  onChange: _propTypes2.default.func,
  style: _propTypes2.default.object,
  errorMessage: _propTypes2.default.string,
  value: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  isRequired: _propTypes2.default.bool,
  hide: _propTypes2.default.bool,
  className: _propTypes2.default.string
};

exports.default = TextAreaUi;
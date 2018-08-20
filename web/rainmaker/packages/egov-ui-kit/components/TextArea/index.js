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

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
  backgroundColor: "transparent"
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
var underlineDisabledStyle = {
  borderBottom: "1px solid #e0e0e0"
};

var TextAreaUi = function TextAreaUi(_ref) {
  var className = _ref.className,
      style = _ref.style,
      underlineShow = _ref.underlineShow,
      inputStyle = _ref.inputStyle,
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
      underlineFocusStyle = _ref.underlineFocusStyle,
      _ref$floatingLabelSty = _ref.floatingLabelStyle,
      floatingLabelStyle = _ref$floatingLabelSty === undefined ? {} : _ref$floatingLabelSty,
      jsonPath = _ref.jsonPath,
      id = _ref.id,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["className", "style", "underlineShow", "inputStyle", "onChange", "errorMessage", "value", "disabled", "isRequired", "hide", "rows", "hintText", "hintStyle", "textareaStyle", "rowsMax", "underlineStyle", "underlineFocusStyle", "floatingLabelStyle", "jsonPath", "id"]);

  return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
    className: className,
    id: id,
    fullWidth: true,
    multiLine: true,
    rows: rows,
    rowsMax: rowsMax,
    disabled: disabled,
    onChange: onChange,
    style: (0, _extends3.default)({}, defaultStyle, style),
    hintText: hintText,
    inputStyle: inputStyle,
    hintStyle: hintStyle,
    textareaStyle: textareaStyle,
    underlineShow: underlineShow,
    underlineStyle: underlineStyle,
    underlineFocusStyle: underlineFocusStyle,
    floatingLabelStyle: (0, _extends3.default)({}, floatingLabelBaseStyle, floatingLabelStyle),
    value: value,
    underlineDisabledStyle: underlineDisabledStyle
  }, rest));
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
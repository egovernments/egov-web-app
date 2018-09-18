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

var _DatePicker = require("material-ui/DatePicker");

var _DatePicker2 = _interopRequireDefault(_DatePicker);

require("./index.css");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  fontWeight: 500,
  zIndex: 0
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

var underlineDisabledStyle = {
  borderBottom: "1px solid #e0e0e0"
};

var underlineFocusBaseStyle = {
  borderColor: "#e0e0e0"
};

var DatePickerUi = function DatePickerUi(_ref) {
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
      multiLine = _ref.multiLine,
      ErrorText = _ref.ErrorText,
      formatDate = _ref.formatDate,
      errorMessage = _ref.errorMessage,
      dropDownData = _ref.dropDownData,
      dataFetchConfig = _ref.dataFetchConfig,
      jsonPath = _ref.jsonPath,
      toolTip = _ref.toolTip,
      updateDependentFields = _ref.updateDependentFields,
      toolTipMessage = _ref.toolTipMessage,
      textFieldStyle = _ref.textFieldStyle,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["style", "onChange", "id", "disabled", "floatingLabelStyle", "hintText", "errorText", "errorStyle", "fullWidth", "hintStyle", "className", "value", "floatingLabelText", "underlineShow", "inputStyle", "underlineFocusStyle", "required", "type", "autoFocus", "maxLength", "multiLine", "ErrorText", "formatDate", "errorMessage", "dropDownData", "dataFetchConfig", "jsonPath", "toolTip", "updateDependentFields", "toolTipMessage", "textFieldStyle"]);

  return _react2.default.createElement(_DatePicker2.default, (0, _extends3.default)({
    errorText: errorText,
    errorStyle: errorStyle,
    value: value,
    onChange: onChange,
    disabled: disabled,
    inputStyle: (0, _extends3.default)({}, inputBaseStyle, inputStyle),
    className: "textfield " + className,
    formatDate: formatDate,
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
    textFieldStyle: textFieldStyle,
    autoComplete: type === "password" ? "new-password" : "off",
    multiLine: multiLine,
    underlineDisabledStyle: underlineDisabledStyle
  }, rest));
};

exports.default = DatePickerUi;


DatePickerUi.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
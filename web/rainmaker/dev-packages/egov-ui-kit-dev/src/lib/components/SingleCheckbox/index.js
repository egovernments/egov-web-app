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

var _Checkbox = require("material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLabelStyle = {
  fontFamily: "Roboto, sans-serif"
};

var defaultStyle = {
  marginBottom: "21px"
};

var selectedLabelStyle = {
  color: "#00bcd1"
};
var SingleCheckboxUi = function SingleCheckboxUi(_ref) {
  var defaultValue = _ref.defaultValue,
      value = _ref.value,
      floatingLabelText = _ref.floatingLabelText,
      labelStyle = _ref.labelStyle,
      onCheck = _ref.onCheck,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      checkedIcon = _ref.checkedIcon,
      iconStyle = _ref.iconStyle,
      containerClassName = _ref.containerClassName,
      id = _ref.id;

  var renderCheckbox = function renderCheckbox() {
    return _react2.default.createElement(_Checkbox2.default, {
      id: id,
      defaultValue: defaultValue,
      label: floatingLabelText,
      onCheck: onCheck,
      style: (0, _extends3.default)({}, defaultStyle, style),
      iconStyle: iconStyle,
      checked: typeof value === "boolean" ? value : value === "true" ? true : false,
      checkedIcon: checkedIcon,
      labelStyle: (0, _extends3.default)({}, defaultLabelStyle, labelStyle, selectedLabelStyle)
    });
  };

  return _react2.default.createElement(
    "div",
    { className: containerClassName + " checkbox-container" },
    renderCheckbox()
  );
};

SingleCheckboxUi.propTypes = {
  floatingLabelText: _propTypes2.default.node.isRequired,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]).isRequired,
  defaultValue: _propTypes2.default.string,
  onCheck: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = SingleCheckboxUi;
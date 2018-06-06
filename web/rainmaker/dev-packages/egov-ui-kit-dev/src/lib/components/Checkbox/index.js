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
var CheckboxUi = function CheckboxUi(_ref) {
  var options = _ref.options,
      defaultValue = _ref.defaultValue,
      labelStyle = _ref.labelStyle,
      _onCheck = _ref.onCheck,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      checkedIcon = _ref.checkedIcon,
      iconStyle = _ref.iconStyle,
      containerClassName = _ref.containerClassName,
      selected = _ref.selected,
      id = _ref.id;

  var renderCheckboxOptions = function renderCheckboxOptions() {
    return options.map(function (option, index) {
      return _react2.default.createElement(_Checkbox2.default, {
        key: index,
        id: id + index,
        value: option.value,
        label: option.label,
        onCheck: function onCheck() {
          _onCheck(option.value);
        },
        style: (0, _extends3.default)({}, defaultStyle, style),
        iconStyle: iconStyle,
        checkedIcon: checkedIcon,
        selected: selected,
        labelStyle: selected.indexOf(option.label) > -1 ? (0, _extends3.default)({}, defaultLabelStyle, labelStyle, selectedLabelStyle) : (0, _extends3.default)({}, defaultLabelStyle, labelStyle)
      });
    });
  };

  return _react2.default.createElement(
    "div",
    { className: containerClassName + " checkbox-container" },
    renderCheckboxOptions()
  );
};

CheckboxUi.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired
  }).isRequired),
  defaultValue: _propTypes2.default.string,
  onCheck: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = CheckboxUi;
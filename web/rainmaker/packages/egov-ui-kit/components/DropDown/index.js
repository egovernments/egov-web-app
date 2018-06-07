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

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floatingLabelStyle = {
  fontSize: "12px",
  color: "#00bcd1",
  fontWeight: 500,
  transform: "scale(1) translate(0px, -16px)",
  top: 30
};

var floatingLabelBaseShrinkStyle = {
  fontSize: "12px",
  color: "#00bcd1",
  transform: "scale(1) translate(0px, -16px)",
  fontWeight: 500
};

var hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "#b3b3b3"
};

var requiredStyle = {
  color: "red"
};

var underlineFocusBaseStyle = {
  borderColor: "#e0e0e0"
};

var DropDownUi = function DropDownUi(_ref) {
  var className = _ref.className,
      value = _ref.value,
      _ref$fullWidth = _ref.fullWidth,
      fullWidth = _ref$fullWidth === undefined ? false : _ref$fullWidth,
      labelStyle = _ref.labelStyle,
      required = _ref.required,
      dropDownData = _ref.dropDownData,
      children = _ref.children,
      selected = _ref.selected,
      onChange = _ref.onChange,
      id = _ref.id,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      floatingLabelText = _ref.floatingLabelText,
      underlineStyle = _ref.underlineStyle,
      hintText = _ref.hintText,
      hintStyle = _ref.hintStyle;

  var renderSelectMenuItems = function renderSelectMenuItems() {
    return dropDownData.map(function (option, index) {
      return _react2.default.createElement(_MenuItem2.default, { key: index, value: option.value, primaryText: option.label });
    });
  };

  return _react2.default.createElement(
    _SelectField2.default,
    {
      className: "dropdown " + className,
      id: id,
      style: style,
      fullWidth: fullWidth,
      dropDownMenuProps: {
        targetOrigin: { horizontal: "left", vertical: "top" }
      },
      labelStyle: labelStyle,
      onChange: onChange,
      selected: "Select",
      value: value,
      hintText: hintText,
      floatingLabelShrinkStyle: floatingLabelBaseShrinkStyle,
      floatingLabelFixed: true,
      floatingLabelText: [floatingLabelText, required ? _react2.default.createElement(
        "span",
        { key: "error-" + className, style: requiredStyle },
        " ",
        "*"
      ) : null],
      floatingLabelStyle: floatingLabelStyle,
      iconStyle: { fill: "#484848" },
      underlineStyle: (0, _extends3.default)({}, underlineFocusBaseStyle, underlineStyle),
      hintStyle: (0, _extends3.default)({}, hintBaseStyle, hintStyle)
    },
    renderSelectMenuItems()
  );
};

DropDownUi.propTypes = {
  fullWidth: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  selected: _propTypes2.default.string
};

exports.default = DropDownUi;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  top: 28,
  color: "#6090ae",
  fontSize: "16px",
  fontWeight: 500
};

var DropDownUi = function DropDownUi(_ref) {
  var value = _ref.value,
      _ref$fullWidth = _ref.fullWidth,
      fullWidth = _ref$fullWidth === undefined ? false : _ref$fullWidth,
      labelStyle = _ref.labelStyle,
      dropDownData = _ref.dropDownData,
      children = _ref.children,
      selected = _ref.selected,
      onChange = _ref.onChange,
      id = _ref.id,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      floatingLabelText = _ref.floatingLabelText;

  var renderSelectMenuItems = function renderSelectMenuItems() {
    return dropDownData.map(function (option, index) {
      return _react2.default.createElement(_MenuItem2.default, { key: index, value: option.value, primaryText: option.label });
    });
  };

  return _react2.default.createElement(
    _SelectField2.default,
    {
      className: "dropdown",
      id: id,
      style: style,
      fullWidth: fullWidth,
      dropDownMenuProps: {
        targetOrigin: { horizontal: "left", vertical: "bottom" }
      },
      labelStyle: labelStyle,
      onChange: onChange,
      selected: "Select",
      value: value,
      floatingLabelText: floatingLabelText,
      floatingLabelStyle: floatingLabelStyle,
      iconStyle: { fill: "#484848" },
      underlineStyle: { borderBottom: "none" }
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
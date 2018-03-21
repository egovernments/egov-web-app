"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonGroup = function ButtonGroup(_ref) {
  var items = _ref.items,
      _onClick = _ref.onClick,
      selected = _ref.selected,
      multiple = _ref.multiple,
      _ref$defaultStyle = _ref.defaultStyle,
      defaultStyle = _ref$defaultStyle === undefined ? {} : _ref$defaultStyle,
      _ref$selectedStyle = _ref.selectedStyle,
      selectedStyle = _ref$selectedStyle === undefined ? {} : _ref$selectedStyle,
      _ref$selectedLabelSty = _ref.selectedLabelStyle,
      selectedLabelStyle = _ref$selectedLabelSty === undefined ? {} : _ref$selectedLabelSty,
      _ref$defaultLabelStyl = _ref.defaultLabelStyle,
      defaultLabelStyle = _ref$defaultLabelStyl === undefined ? {} : _ref$defaultLabelStyl;

  return items.map(function (item, index) {
    return _react2.default.createElement(_FlatButton2.default, {
      className: "button-item",
      multiple: multiple,
      key: index,
      label: item.label,
      style: !multiple ? item.value === selected ? _extends({}, defaultStyle, selectedStyle) : defaultStyle : selected.indexOf(item.value) > -1 ? _extends({}, defaultStyle, selectedStyle) : defaultStyle,
      hoverColor: "none",
      onClick: function onClick() {
        _onClick(item.value, multiple);
      },
      labelStyle: !multiple ? item.value === selected ? _extends({}, defaultLabelStyle, selectedLabelStyle) : defaultLabelStyle : selected.indexOf(item.value) > -1 ? _extends({}, defaultLabelStyle, selectedLabelStyle) : defaultLabelStyle
    });
  });
};

ButtonGroup.prototype = {
  onClick: _propTypes2.default.func,
  multiple: _propTypes2.default.bool,
  defaultStyle: _propTypes2.default.object,
  selectedStyle: _propTypes2.default.object,
  selectedLabelStyle: _propTypes2.default.object,
  defaultLabelStyle: _propTypes2.default.object
};

exports.default = ButtonGroup;
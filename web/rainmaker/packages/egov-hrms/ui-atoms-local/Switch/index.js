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

var _Switch = require("@material-ui/core/Switch");

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MUISwitch = function MUISwitch(props) {
  var checked = props.checked,
      value = props.value,
      rest = (0, _objectWithoutProperties3.default)(props, ["checked", "value"]);

  return _react2.default.createElement(_Switch2.default, (0, _extends3.default)({ checked: checked, value: value }, rest));
};

exports.default = MUISwitch;
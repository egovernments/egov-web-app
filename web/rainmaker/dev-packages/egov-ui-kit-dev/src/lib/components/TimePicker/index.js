"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TimePicker = require("material-ui/TimePicker");

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// {onChange,autoOk,floatingLabelText}
var TimePickerUi = function TimePickerUi(props) {
  return _react2.default.createElement(_TimePicker2.default, props);
};

exports.default = TimePickerUi;


TimePickerUi.propTypes = {
  props: _propTypes2.default.object
};
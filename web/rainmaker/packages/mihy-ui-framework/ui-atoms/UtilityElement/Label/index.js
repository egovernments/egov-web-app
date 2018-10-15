"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = function Label(_ref) {
  var label = _ref.label,
      jsonPath = _ref.jsonPath,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["label", "jsonPath"]);
  return _react2.default.createElement(
    "span",
    rest,
    label ? label : label === 0 ? 0 : "NA"
  );
};

exports.default = Label;
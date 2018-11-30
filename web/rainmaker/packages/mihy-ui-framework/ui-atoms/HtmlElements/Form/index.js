"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function Form(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ["children"]);

  return _react2.default.createElement(
    "form",
    rest,
    children
  );
};

exports.default = Form;
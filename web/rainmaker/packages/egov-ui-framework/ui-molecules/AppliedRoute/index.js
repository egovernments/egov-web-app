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

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var C = _ref.component,
      cProps = _ref.props,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["component", "props"]);
  return _react2.default.createElement(_reactRouterDom.Route, (0, _extends3.default)({}, rest, { render: function render(props) {
      return _react2.default.createElement(C, (0, _extends3.default)({}, props, cProps));
    } }));
};
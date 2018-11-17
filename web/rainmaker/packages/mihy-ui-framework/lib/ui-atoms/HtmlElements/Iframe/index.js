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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Iframe = function Iframe(_ref) {
  var url = _ref.url,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["url"]);

  return _react2.default.createElement("iframe", (0, _extends3.default)({ src: url, title: "iframe", width: "100%", height: "500px" }, rest));
};

exports.default = Iframe;
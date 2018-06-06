"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Screen = function Screen(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      loading = _ref.loading;

  return _react2.default.createElement(
    "div",
    { className: "screen col-xs-12 col-sm-12 col-md-12 col-lg-12  " + className },
    children,
    loading && _react2.default.createElement(_components.LoadingIndicator, null)
  );
};

exports.default = Screen;
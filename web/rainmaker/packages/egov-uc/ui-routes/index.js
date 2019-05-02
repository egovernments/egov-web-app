"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RenderRoutes = require("egov-ui-framework/ui-molecules/RenderRoutes");

var _RenderRoutes2 = _interopRequireDefault(_RenderRoutes);

var _uiConfig = require("../ui-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainRoutes = function MainRoutes(childProps) {
  return _react2.default.createElement(
    "main",
    null,
    _react2.default.createElement(_RenderRoutes2.default, { routes: _uiConfig.appRoutes, childProps: childProps })
  );
};

exports.default = MainRoutes;
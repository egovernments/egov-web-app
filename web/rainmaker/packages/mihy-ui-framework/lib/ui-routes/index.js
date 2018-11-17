"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiMolecules = require("../ui-molecules");

var _uiConfig = require("../ui-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainRoutes = function MainRoutes(childProps) {
  return _react2.default.createElement(
    "main",
    null,
    _react2.default.createElement(_uiMolecules.RenderRoutes, { routes: _uiConfig.appRoutes, childProps: childProps })
  );
};

exports.default = MainRoutes;
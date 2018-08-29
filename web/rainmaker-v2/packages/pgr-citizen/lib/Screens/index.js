"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PGR = function PGR(_ref) {
  var match = _ref.match,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? [] : _ref$routes;

  return _react2.default.createElement(_common.RenderRoutes, { match: match, routes: routes });
};

exports.default = PGR;
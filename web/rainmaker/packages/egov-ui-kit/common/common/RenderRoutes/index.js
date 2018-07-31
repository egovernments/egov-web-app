"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderRoutes = function RenderRoutes(_ref) {
  var match = _ref.match,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? [] : _ref$routes;

  return _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    routes.map(function (route, index) {
      var Component = route.component,
          path = route.path;

      return _react2.default.createElement(_reactRouterDom.Route, {
        key: index,
        exact: true,
        path: match.path === "/" ? path === "/" ? "/" : "/" + path : baseUrl + "/" + path,
        render: function render(props) {
          return _react2.default.createElement(Component, props);
        }
      });
    })
  );
};

exports.default = RenderRoutes;
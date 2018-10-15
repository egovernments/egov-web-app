"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("../../ui-atoms");

var _reactRouterDom = require("react-router-dom");

var _AppliedRoute = require("../AppliedRoute");

var _AppliedRoute2 = _interopRequireDefault(_AppliedRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderRoutes = function RenderRoutes(_ref) {
  var _ref$basePath = _ref.basePath,
      basePath = _ref$basePath === undefined ? "" : _ref$basePath,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? [] : _ref$routes,
      childProps = _ref.childProps;

  return _react2.default.createElement(
    _uiAtoms.Div,
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      routes.map(function (route, index) {
        if (route.isRedirect) {
          var from = route.from,
              to = route.to;

          return _react2.default.createElement(_reactRouterDom.Redirect, { key: index, from: from, to: to });
        } else {
          var Component = route.component,
              path = route.path,
              isExact = route.isExact;

          return _react2.default.createElement(_AppliedRoute2.default, {
            key: index,
            exact: isExact ? true : false,
            path: basePath === "" ? path : basePath === "/" ? path : "" + basePath + path,
            component: Component,
            props: childProps
          });
        }
      })
    )
  );
};

exports.default = RenderRoutes;
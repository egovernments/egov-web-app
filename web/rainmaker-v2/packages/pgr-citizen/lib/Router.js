"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _index = require("./Screens/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main(_ref) {
  var routes = _ref.routes;

  return _react2.default.createElement(
    "main",
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, {
        path: "/",
        render: function render(props) {
          return _react2.default.createElement(_index2.default, { match: props.match, routes: routes.pgr });
        }
      }),
      _react2.default.createElement(_reactRouterDom.Redirect, { from: "/", to: "/user/register" })
    )
  );
};

exports.default = Main;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _withAuthorization = require("egov-ui-kit/hocs/withAuthorization");

var _withAuthorization2 = _interopRequireDefault(_withAuthorization);

var _withoutAuthorization = require("egov-ui-kit/hocs/withoutAuthorization");

var _withoutAuthorization2 = _interopRequireDefault(_withoutAuthorization);

var _pgrRoutes = require("./pgr-routes");

var _pgrRoutes2 = _interopRequireDefault(_pgrRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapRoutes = function mapRoutes(routes) {
  return routes.map(function (route, index) {
    var component = route.component,
        options = route.options,
        redirectionUrl = route.redirectionUrl,
        needsAuthentication = route.needsAuthentication;

    return (0, _extends3.default)({}, route, {
      component: needsAuthentication ? (0, _withAuthorization2.default)(options)(component) : (0, _withoutAuthorization2.default)(redirectionUrl)(component)
    });
  });
};

var routes = { pgr: mapRoutes(_pgrRoutes2.default) };
exports.default = routes;
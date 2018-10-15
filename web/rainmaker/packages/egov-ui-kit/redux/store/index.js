"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _middlewares = require("egov-ui-kit/redux/form/middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

var _middleware = require("egov-ui-kit/redux/auth/middleware");

var _middleware2 = _interopRequireDefault(_middleware);

var _middleware3 = require("egov-ui-kit/redux/app/middleware");

var _middleware4 = _interopRequireDefault(_middleware3);

var _middlewares3 = require("mihy-ui-framework/ui-redux/screen-configuration/middlewares");

var _middlewares4 = _interopRequireDefault(_middlewares3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [];

middlewares = middlewares.concat(_middleware2.default);
middlewares = middlewares.concat(_middlewares2.default);
middlewares = middlewares.concat(_middleware4.default);
middlewares = middlewares.concat(_middlewares4.default);
middlewares = middlewares.concat(_reduxThunk2.default);

if (process.env.NODE_ENV === "development") {
  var _require = require("redux-logger"),
      logger = _require.logger;

  middlewares = middlewares.concat(logger);
}

exports.default = { rootReducer: _reducer2.default, middlewares: middlewares };
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _middlewares = require("../screen-configuration/middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

var _middlewares3 = require("../auth/middlewares");

var _middlewares4 = _interopRequireDefault(_middlewares3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import appMiddleware from "../app/middleware";

var middlewares = [];

middlewares = middlewares.concat(_middlewares4.default);
middlewares = middlewares.concat(_middlewares2.default);
// middlewares = middlewares.concat(appMiddleware);
middlewares = middlewares.concat(_reduxThunk2.default);

if (process.env.NODE_ENV === "development") {
  var _require = require("redux-logger"),
      logger = _require.logger;

  middlewares = middlewares.concat(logger);
}

var store = (0, _redux.createStore)((0, _redux.combineReducers)((0, _extends3.default)({}, _reducer2.default)), _redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares)));

exports.default = store;
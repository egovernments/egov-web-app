"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require("redux");

var _store = require("egov-ui-kit/redux/store");

var _store2 = _interopRequireDefault(_store);

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = _store2.default.rootReducer,
    middlewares = _store2.default.middlewares;


var store = (0, _redux.createStore)((0, _redux.combineReducers)((0, _extends3.default)({}, rootReducer)), _redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares)));

exports.default = store;
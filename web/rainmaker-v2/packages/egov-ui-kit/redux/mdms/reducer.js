"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require("babel-runtime/helpers/extends");

var _extends5 = _interopRequireDefault(_extends4);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  specs: {},
  data: {}
};

var mdmsReducer = function mdmsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      moduleName = action.moduleName,
      masterName = action.masterName;

  switch (type) {
    case actionTypes.SPECS_FETCH_PENDING:
      return (0, _extends5.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.DATA_FETCH_PENDING:
      return (0, _extends5.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.SPECS_FETCH_COMPLETE:
      return (0, _extends5.default)({}, state, {
        loading: false,
        specs: (0, _defineProperty3.default)({}, moduleName, (0, _extends5.default)({}, state[moduleName], (0, _defineProperty3.default)({}, masterName, action.payload)))
      });
    case actionTypes.DATA_FETCH_COMPLETE:
      return (0, _extends5.default)({}, state, {
        loading: false,
        data: (0, _defineProperty3.default)({}, moduleName, (0, _extends5.default)({}, state[moduleName], (0, _defineProperty3.default)({}, masterName, action.payload.MdmsRes[moduleName][masterName]))),
        moduleName: moduleName,
        masterName: masterName
      });
    case actionTypes.SPECS_FETCH_ERROR:
      return (0, _extends5.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.DATA_FETCH_ERROR:
      return (0, _extends5.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    default:
      return state;
  }
};

exports.default = mdmsReducer;
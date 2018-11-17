"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("../actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleScreenConfigurationFieldChange = function handleScreenConfigurationFieldChange(store) {
  return function (next) {
    return function (action) {
      var type = action.type;

      if (type === screenActionTypes.HANDLE_SCREEN_CONFIGURATION_FIELD_CHANGE && action.property === "props.value") {
        var screenKey = action.screenKey,
            componentJsonpath = action.componentJsonpath,
            value = action.value;

        var dispatch = store.dispatch;
        var state = store.getState();
        var componentObject = (0, _get2.default)(state, "screenConfiguration.screenConfig." + screenKey + "." + componentJsonpath);
        (0, _utils.validate)(screenKey, (0, _extends3.default)({}, componentObject, { value: value }), dispatch);
        next(action);
      } else {
        next(action);
      }
    };
  };
};

exports.default = handleScreenConfigurationFieldChange;
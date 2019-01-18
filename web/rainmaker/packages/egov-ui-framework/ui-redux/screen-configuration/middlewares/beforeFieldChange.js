"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("../actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var beforeFieldChange = function beforeFieldChange(store) {
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
        if (typeof (0, _get2.default)(componentObject, "beforeFieldChange") === "function") {
          componentObject.beforeFieldChange(action, state, dispatch);
        }
        next(action);
      } else {
        next(action);
      }
    };
  };
};

exports.default = beforeFieldChange;
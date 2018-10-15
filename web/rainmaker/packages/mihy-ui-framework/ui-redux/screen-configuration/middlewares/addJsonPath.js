"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uiUtils = require("../../../ui-utils");

var _actionTypes = require("../actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var addJsonPath = function addJsonPath(store) {
  return function (next) {
    return function (action) {
      var type = action.type;

      if (type === screenActionTypes.INIT_SCREEN) {
        (0, _uiUtils.addComponentJsonpath)(action.screenConfig.components);
        next(action);
      } else {
        next(action);
      }
    };
  };
};

exports.default = addJsonPath;
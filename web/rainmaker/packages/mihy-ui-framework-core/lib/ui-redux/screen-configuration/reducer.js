"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require("babel-runtime/helpers/extends");

var _extends5 = _interopRequireDefault(_extends4);

var _actionTypes = require("./actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intialState = {
  screenConfig: {},
  preparedFinalObject: {}
};

var screenConfiguration = function screenConfiguration() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case screenActionTypes.INIT_SCREEN:
      return (0, _extends5.default)({}, state, {
        screenConfig: (0, _extends5.default)({}, state.screenConfig, (0, _defineProperty3.default)({}, action.screenKey, (0, _extends5.default)({}, action.screenConfig)))
      });
    case screenActionTypes.HANDLE_SCREEN_CONFIGURATION_FIELD_CHANGE:
      var updatedScreenConfig = (0, _utils.updateObjectWithComponentJsonPath)(state.screenConfig[action.screenKey], action.componentJsonpath, action.property, action.value);
      return (0, _extends5.default)({}, state, {
        screenConfig: (0, _extends5.default)({}, state.screenConfig, (0, _defineProperty3.default)({}, action.screenKey, (0, _extends5.default)({}, updatedScreenConfig)))
      });

    case screenActionTypes.PREPARE_FINAL_OBJECT:
      var updatedPreparedFinalObject = (0, _utils.prepareFinalObject)(state.preparedFinalObject, action.jsonPath, action.value);
      return (0, _extends5.default)({}, state, {
        preparedFinalObject: updatedPreparedFinalObject
      });

    default:
      return state;
  }
};

exports.default = screenConfiguration;
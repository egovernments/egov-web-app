"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareFinalQueryData = exports.prepareFinalBodyData = exports.prepareFinalObject = exports.updateObjectWithComponentJsonPath = exports.validate = exports.validateForm = exports.validateField = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require("./actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateField = exports.validateField = function validateField(field) {
  var required = field.required,
      pattern = field.pattern,
      minLength = field.minLength,
      maxLength = field.maxLength,
      minValue = field.minValue,
      maxValue = field.maxValue,
      visible = field.visible;


  if (visible) {
    return { isFieldValid: true, errorText: "" };
  }

  var value = field.value ? typeof field.value === "string" ? field.value.trim() : field.value : null;
  var errorText = "",
      isFieldValid = true,
      fieldLength = 0;

  if (required && !value) {
    isFieldValid = false;
    errorText = field.requiredmessage || "Required";
  }

  if (value) {
    fieldLength = value.length;
  }

  if (isFieldValid && fieldLength && pattern && !new RegExp(pattern).test(value)) {
    isFieldValid = false;
  }
  if (isFieldValid && minLength && maxLength && !(fieldLength >= minLength && fieldLength <= maxLength)) {
    isFieldValid = false;
  }
  if (isFieldValid && minValue && maxValue && !(value >= minValue && value <= maxValue)) {
    isFieldValid = false;
  }

  errorText = !isFieldValid ? errorText.length ? errorText : field.errorMessage || "Invalid field" : "";

  return { isFieldValid: isFieldValid, errorText: errorText };
};

var validateForm = exports.validateForm = function validateForm(screenKey, components, dispatch) {
  var isFormValid = true;
  var travelComponents = function travelComponents(components) {
    for (var variable in components) {
      if (components.hasOwnProperty(variable)) {
        if (components[variable].children && !(0, _isEmpty2.default)(components[variable].children)) {
          travelComponents(components[variable].children);
        } else {
          if (components[variable].jsonPath && !validate(screenKey, components[variable], dispatch)) {
            isFormValid = false;
          }
        }
      }
    }
  };
  travelComponents(components);
  return isFormValid;
};

var validate = exports.validate = function validate(screenKey, componentObject, dispatch) {
  var validatedObject = validateField(componentObject);
  var isFormValid = true;
  if (componentObject.jsonPath && validatedObject.isFieldValid) {
    dispatch((0, _actions.prepareFinalObject)(componentObject.jsonPath, componentObject.value));
    if (!componentObject.isFieldValid) {
      isFormValid = true;
      dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentObject.componentJsonpath + ".props", "error", false));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentObject.componentJsonpath + ".props", "helperText", validatedObject.errorText));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, "" + componentObject.componentJsonpath, "isFieldValid", true));
    }
  } else {
    isFormValid = false;
    dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentObject.componentJsonpath + ".props", "error", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentObject.componentJsonpath + ".props", "helperText", validatedObject.errorText));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, "" + componentObject.componentJsonpath, "isFieldValid", false));
  }
  return isFormValid;
};

var updateObjectWithComponentJsonPath = exports.updateObjectWithComponentJsonPath = function updateObjectWithComponentJsonPath(screenConfig, componentJsonpath, property, value) {
  (0, _set2.default)(screenConfig, componentJsonpath + "." + property, value);
  return screenConfig;
};

var prepareFinalObject = exports.prepareFinalObject = function prepareFinalObject(preparedFinalOject, jsonPath, value) {
  (0, _set2.default)(preparedFinalOject, jsonPath, value);
  return preparedFinalOject;
};

var prepareFinalBodyData = exports.prepareFinalBodyData = function prepareFinalBodyData(body, bodyObjectsJsonPaths) {
  var screenConfigBodyData = {};
  if (bodyObjectsJsonPaths.length > 0) {
    for (var i = 0; i < bodyObjectsJsonPaths.length; i++) {
      var object = (0, _get2.default)(body, bodyObjectsJsonPaths[i]);
      screenConfigBodyData = (0, _extends3.default)({}, screenConfigBodyData, {
        object: object
      });
    }
  } else {
    screenConfigBodyData = (0, _extends3.default)({}, body);
  }
  return screenConfigBodyData;
};

var prepareFinalQueryData = exports.prepareFinalQueryData = function prepareFinalQueryData(query, queryObjectJsonPath) {
  var screenConfigQueryData = [];
  if (queryObjectJsonPath.length > 0) {
    for (var i = 0; i < queryObjectJsonPath.length; i++) {
      var object = (0, _get2.default)(query, queryObjectJsonPath[i]);
      screenConfigQueryData = [].concat((0, _toConsumableArray3.default)(screenConfigQueryData), [object]);
    }
  } else {
    screenConfigQueryData = (0, _extends3.default)({}, query);
  }
  return screenConfigQueryData;
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDependentFields = undefined;

var _actions = require("egov-ui-kit/redux/form/actions");

var setDependentFields = exports.setDependentFields = function setDependentFields(fields, dispatch, formKey, isEnabled) {
  var propertyId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "hideField";
  return fields.forEach(function (fieldName) {
    dispatch((0, _actions.setFieldProperty)(formKey, fieldName, propertyId, isEnabled));
  });
};
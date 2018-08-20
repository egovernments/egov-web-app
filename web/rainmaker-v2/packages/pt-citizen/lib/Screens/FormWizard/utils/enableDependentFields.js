"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDependentFields = undefined;

var _actions = require("egov-ui-kit/redux/form/actions");

var setDependentFields = exports.setDependentFields = function setDependentFields(fields, dispatch, formKey, isEnabled) {
  return fields.forEach(function (fieldName) {
    dispatch((0, _actions.setFieldProperty)(formKey, fieldName, "hideField", isEnabled));
  });
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("../actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("../actions");

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var formValidation = function formValidation(store) {
  return function (next) {
    return function (action) {
      var type = action.type,
          fieldKey = action.fieldKey,
          formKey = action.formKey;

      var dispatch = store.dispatch;

      if (type == actionTypes.FIELD_CHANGE) {
        next(action);
        var state = store.getState();
        var form = state.form[formKey] || {};
        var field = (0, _utils.getFormField)(form, fieldKey);
        var required = field.required,
            pattern = field.pattern;

        if (pattern || required) {
          var validationObject = (0, _utils.validateField)(field);
          var errorText = validationObject.errorText;

          dispatch((0, _actions.setFieldValidation)(formKey, fieldKey, errorText));
        }
      } else {
        next(action);
      }
    };
  };
};

exports.default = formValidation;
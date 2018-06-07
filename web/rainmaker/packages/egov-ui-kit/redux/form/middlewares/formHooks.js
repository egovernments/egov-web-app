"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("../actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("egov-ui-kit/redux/app/actions");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var formValidation = function formValidation(store) {
  return function (next) {
    return function (action) {
      var formKey = action.formKey,
          type = action.type,
          value = action.value,
          fieldKey = action.fieldKey;

      var dispatch = store.dispatch;
      var state = store.getState();

      if (type === actionTypes.FIELD_CHANGE) {
        try {
          var hook = require("config/forms/hooks/" + formKey).default;
          hook = hook.fieldChange;
          if (hook && typeof hook === "function") {
            hook(fieldKey, formKey, value, state, dispatch);
          }
        } catch (e) {}
        // the exceptions are assumed to be thrown only due to absence of a hook


        //for populating dependent dropdowns.
        try {
          var form = state.form;
          var fields = form[formKey].fields;

          if (fields[fieldKey].dataFetchConfig && fields[fieldKey].dataFetchConfig.dependants) {
            var dependants = fields[fieldKey].dataFetchConfig.dependants;

            dependants.forEach(function (item) {
              if (fields[item.fieldKey].dataFetchConfig) {
                (0, _commons.fetchDropdownData)(dispatch, fields[item.fieldKey].dataFetchConfig, formKey, item.fieldKey);
              }
            });
          }
        } catch (error) {
          var message = error.message;

          dispatch((0, _actions.toggleSnackbarAndSetText)(true, message, true));
          return;
        }
      }
      next(action);
    };
  };
};

exports.default = formValidation;
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
      var formKey = action.formKey,
          type = action.type;

      var dispatch = store.dispatch;
      var state = store.getState();

      if (type === actionTypes.FIELD_CHANGE) {
        try {
          var hook = require("config/forms/hooks/" + formKey).default;
          hook = hook.fieldChange;
          if (hook && typeof hook === "function") {
            var fieldKey = action.fieldKey,
                value = action.value;

            hook(fieldKey, formKey, value, state, dispatch);
          }
        } catch (e) {
          // the exceptions are assumed to be thrown only due to absence of a hook
        }
      }
      next(action);
    };
  };
};

exports.default = formValidation;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("../actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actionTypes2 = require("egov-ui-kit/redux/app/actionTypes");

var _commons = require("egov-ui-kit/utils/commons");

var _actions = require("../actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var translatedFormFields = function translatedFormFields(localizationLabels, form) {
  var fields = form.fields;

  fields = Object.keys(fields).reduce(function (translatedField, fieldKey) {
    var field = Object.keys(fields[fieldKey]).reduce(function (field, fieldName) {
      var fieldValue = fields[fieldKey][fieldName];
      if (fieldName === "hintText" || fieldName === "floatingLabelText" || fieldName === "errorMessage") {
        fieldValue = (0, _commons.getTranslatedLabel)(fieldValue, localizationLabels);
      }
      field[fieldName] = fieldValue;
      return field;
    }, {});

    // a bit hacky; instead of asking user to write it in config putting it here; other way to do it would be to iterate through fields which have required and add this field dynamically
    field["requiredMessage"] = (0, _commons.getTranslatedLabel)("CORE_COMMON_REQUIRED_ERRMSG", localizationLabels);
    translatedField[fieldKey] = field;

    return translatedField;
  }, {});

  var submit = {};

  if (form.submit && form.submit.label) {
    var label = (0, _commons.getTranslatedLabel)(form.submit.label, localizationLabels);
    submit = (0, _extends3.default)({}, form.submit, { label: label });
  }
  return (0, _extends3.default)({}, form, { fields: fields, submit: submit });
};

var translateFieldText = function translateFieldText(store) {
  return function (next) {
    return function (action) {
      var type = action.type,
          form = action.form;

      var state = store.getState();
      var localizationLabels = state.app.localizationLabels;


      if (type === _actionTypes2.ADD_LOCALIZATION) {
        var newState = store.getState();
        var _localizationLabels = (0, _commons.transformLocalizationLabels)(action.localizationLabels);
        var forms = newState.form;

        Object.keys(forms).forEach(function (formKey) {
          var translatedForm = translatedFormFields(_localizationLabels, forms[formKey]);
          translatedForm = (0, _extends3.default)({}, translatedForm, { name: formKey });
          store.dispatch((0, _actions.initForm)(translatedForm));
        });
        action.localizationLabels = _localizationLabels;
      }
      if (type === actionTypes.INIT_FORM) {
        action.form = translatedFormFields(localizationLabels, form);
      }
      next(action);
    };
  };
};

exports.default = translateFieldText;
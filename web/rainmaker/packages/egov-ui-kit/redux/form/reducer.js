"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends13 = require("babel-runtime/helpers/extends");

var _extends14 = _interopRequireDefault(_extends13);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intialState = {};

var setFormProperty = function setFormProperty(state, formKey, propertyKey, propertyValue) {
  var form = state[formKey] || {};
  return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, form, (0, _defineProperty3.default)({}, propertyKey, propertyValue))));
};

var setFieldProperty = function setFieldProperty(state, formKey, fieldKey, propertyKey, propertyValue) {
  var form = state[formKey] || {};
  var fields = form.fields || {};
  var field = fields[fieldKey] || {};
  return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, form, {
    fields: (0, _extends14.default)({}, fields, (0, _defineProperty3.default)({}, fieldKey, (0, _extends14.default)({}, field, (0, _defineProperty3.default)({}, propertyKey, propertyValue))))
  })));
};

var displayFieldErrors = function displayFieldErrors(state, formKey) {
  var form = state[formKey] || {};
  var formFields = (0, _utils.getFormFields)(form);
  for (var key in formFields) {
    var field = formFields[key];

    var _validateField = (0, _utils.validateField)(field),
        errorText = _validateField.errorText,
        isFieldValid = _validateField.isFieldValid;

    if (!isFieldValid) {
      state = setFieldProperty(state, formKey, key, "errorText", errorText);
    }
  }
  return state;
};

var mergeFields = function mergeFields() {
  var oldFields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.keys(newFields).reduce(function (mergedFields, fieldKey) {
    mergedFields[fieldKey] = (0, _extends14.default)({}, oldFields[fieldKey], newFields[fieldKey]);
    return mergedFields;
  }, {});
};

var resetFields = function resetFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(fields).reduce(function (resetFields, fieldKey) {
    if (fields && fields[fieldKey] && !fields[fieldKey].dontReset) {
      resetFields[fieldKey] = (0, _extends14.default)({}, fields[fieldKey], { value: "" });
    } else {
      resetFields[fieldKey] = (0, _extends14.default)({}, fields[fieldKey]);
    }
    return resetFields;
  }, {});
};

var fileUploadStarted = function fileUploadStarted(state, formKey, fieldKey, fileObject) {
  var files = (0, _utils.getFiles)(state, formKey, fieldKey);
  return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, state[formKey], { files: (0, _defineProperty3.default)({}, fieldKey, files.concat((0, _extends14.default)({}, fileObject, { loading: true }))) })));
};
var fileUploadCompleted = function fileUploadCompleted(state, formKey, fieldKey, fileStoreId, fileName) {
  var files = (0, _utils.getFiles)(state, formKey, fieldKey);
  return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, state[formKey], {
    files: (0, _defineProperty3.default)({}, fieldKey, files.map(function (fileObject) {
      return fileObject.file.name === fileName ? (0, _extends14.default)({}, fileObject, { fileStoreId: fileStoreId, loading: false }) : fileObject;
    }))
  })));
};
// error message
var fileUploadError = function fileUploadError(state, formKey, fieldKey, error, fileName) {
  var files = (0, _utils.getFiles)(state, formKey, fieldKey);
  return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, state[formKey], {
    files: (0, _defineProperty3.default)({}, fieldKey, files.filter(function (fileObject) {
      return fileObject.file.name !== fileName;
    }))
  })));
};

var removeFile = function removeFile(state, formKey, fieldKey, fileIndex) {
  var files = (0, _utils.getFiles)(state, formKey, fieldKey);
  return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, state[formKey], { files: (0, _defineProperty3.default)({}, fieldKey, files.filter(function (f, index) {
      return index !== fileIndex;
    })) })));
};

var form = function form() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];
  var type = action.type,
      formKey = action.formKey,
      fieldKey = action.fieldKey;

  switch (type) {
    case actionTypes.INIT_FORM:
      var _action$form = action.form,
          name = _action$form.name,
          _form = (0, _objectWithoutProperties3.default)(_action$form, ["name"]);

      var currentForm = state[name] || {};
      var mergedFields = mergeFields(currentForm.fields, action.form.fields);
      return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, name, (0, _extends14.default)({}, currentForm, _form, { fields: mergedFields })));
    case actionTypes.RESET_FORM:
      var oldForm = state[formKey] || {};
      var fieldsAfterReset = resetFields(oldForm.fields);
      return (0, _extends14.default)({}, state, (0, _defineProperty3.default)({}, formKey, (0, _extends14.default)({}, oldForm, { fields: fieldsAfterReset })));
    case actionTypes.FIELD_CHANGE:
      var value = action.value;

      return setFieldProperty(state, formKey, fieldKey, "value", value);
    case actionTypes.SET_FIELD_PROPERTY:
      var propertyName = action.propertyName,
          propertyValue = action.propertyValue;

      return setFieldProperty(state, formKey, fieldKey, propertyName, propertyValue);
    case actionTypes.VALIDATE_FIELD:
      var errorText = action.errorText;

      return setFieldProperty(state, formKey, fieldKey, "errorText", errorText);
    case actionTypes.VALIDATE_FORM:
      var isFormValid = action.isFormValid;

      return setFormProperty(state, formKey, "isFormValid", isFormValid);
    case actionTypes.SET_REDIRECTION:
      var redirectionRoute = action.redirectionRoute;

      return setFormProperty(state, formKey, "redirectionRoute", redirectionRoute);
    case actionTypes.DISPLAY_FORM_ERRORS:
      return displayFieldErrors(state, formKey);
    case actionTypes.SUBMIT_FORM_PENDING:
      return setFormProperty(state, formKey, "loading", true);
    case actionTypes.SUBMIT_FORM_COMPLETE:
      return setFormProperty(state, formKey, "loading", false);
    case actionTypes.SUBMIT_FORM_ERROR:
      state = setFormProperty(state, formKey, "loading", false);
      return setFormProperty(state, formKey, "error", true);
    // file related reducers
    case actionTypes.FILE_UPLOAD_STARTED:
      return fileUploadStarted(state, formKey, fieldKey, action.fileObject);
    case actionTypes.FILE_UPLOAD_COMPLETED:
      return fileUploadCompleted(state, formKey, fieldKey, action.fileStoreId, action.fileName);
    case actionTypes.FILE_UPLOAD_ERROR:
      return fileUploadError(state, formKey, fieldKey, action.error, action.fileName);
    case actionTypes.FILE_REMOVE:
      return removeFile(state, formKey, fieldKey, action.fileIndex);
    // end of file reducers
    default:
      return state;
  }
};

exports.default = form;
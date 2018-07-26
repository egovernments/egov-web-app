"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePTForms = exports.deleteForm = exports.setFieldProperty = exports.fileUpload = exports.resetFiles = exports.removeFile = exports.submitForm = exports.submitFormError = exports.submitFormComplete = exports.submitFormPending = exports.setFieldValidation = exports.setFormValidation = exports.displayFormErrors = exports.handleFieldChange = exports.removeForm = exports.resetForm = exports.initForm = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("egov-ui-kit/redux/app/actions");

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _utils = require("./utils");

var _transformers = require("config/forms/transformers");

var _transformers2 = _interopRequireDefault(_transformers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initForm = exports.initForm = function initForm(form, recordData) {
  return {
    type: actionTypes.INIT_FORM,
    form: form,
    recordData: recordData
  };
};

var resetForm = exports.resetForm = function resetForm(formKey) {
  return { type: actionTypes.RESET_FORM, formKey: formKey };
};

var removeForm = exports.removeForm = function removeForm(formKey) {
  return { type: actionTypes.REMOVE_FORM, formKey: formKey };
};

var handleFieldChange = exports.handleFieldChange = function handleFieldChange(formKey, fieldKey, value) {
  return {
    type: actionTypes.FIELD_CHANGE,
    formKey: formKey,
    fieldKey: fieldKey,
    value: value
  };
};

var displayFormErrors = exports.displayFormErrors = function displayFormErrors(formKey) {
  return { type: actionTypes.DISPLAY_FORM_ERRORS, formKey: formKey };
};

var setFormValidation = exports.setFormValidation = function setFormValidation(formKey, isFormValid) {
  return { type: actionTypes.VALIDATE_FORM, isFormValid: isFormValid, formKey: formKey };
};

var setFieldValidation = exports.setFieldValidation = function setFieldValidation(formKey, fieldKey, errorText) {
  return { type: actionTypes.VALIDATE_FIELD, formKey: formKey, fieldKey: fieldKey, errorText: errorText };
};

var submitFormPending = exports.submitFormPending = function submitFormPending(formKey) {
  return { type: actionTypes.SUBMIT_FORM_PENDING, formKey: formKey };
};

var submitFormComplete = exports.submitFormComplete = function submitFormComplete(formKey, payload, saveUrl) {
  return { type: actionTypes.SUBMIT_FORM_COMPLETE, formKey: formKey, payload: payload };
};

var submitFormError = exports.submitFormError = function submitFormError(formKey, error) {
  return { type: actionTypes.SUBMIT_FORM_ERROR, formKey: formKey, error: error };
};

var submitForm = exports.submitForm = function submitForm(formKey, saveUrl) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
      var state, form, isFormValid, action, formData, formResponse, message;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = getState();
              form = state.form[formKey];

              if (!form.loading) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              isFormValid = (0, _utils.validateForm)(form);

              if (!isFormValid) {
                _context.next = 38;
                break;
              }

              dispatch(submitFormPending(formKey));
              action = form.action;
              _context.prev = 8;
              _context.next = 11;
              return (0, _transformers2.default)("viewModelToBusinessModelTransformer", formKey, form, state);

            case 11:
              formData = _context.sent;
              formResponse = {};
              // this will eventually moved out to the auth action; bit messy

              if (!formData.hasOwnProperty("login")) {
                _context.next = 19;
                break;
              }

              _context.next = 16;
              return (0, _api.loginRequest)(formData.login.username, formData.login.password);

            case 16:
              formResponse = _context.sent;
              _context.next = 28;
              break;

            case 19:
              if (!formData.hasOwnProperty("employee")) {
                _context.next = 25;
                break;
              }

              _context.next = 22;
              return (0, _api.loginRequest)(formData.employee.username, formData.employee.password, "", "password", formData.employee.tenantId);

            case 22:
              formResponse = _context.sent;
              _context.next = 28;
              break;

            case 25:
              _context.next = 27;
              return (0, _api.httpRequest)(saveUrl, action, [], formData);

            case 27:
              formResponse = _context.sent;

            case 28:
              dispatch(submitFormComplete(formKey, formResponse, saveUrl));
              _context.next = 36;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](8);
              message = _context.t0.message;
              // throw new Error(error);

              dispatch(submitFormError(formKey, message));
              dispatch((0, _actions.toggleSnackbarAndSetText)(true, message, true));

            case 36:
              _context.next = 39;
              break;

            case 38:
              dispatch(displayFormErrors(formKey));

            case 39:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[8, 31]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

// file actions
var fileUploadPending = function fileUploadPending(formKey, fieldKey, fileObject) {
  return { type: actionTypes.FILE_UPLOAD_STARTED, formKey: formKey, fieldKey: fieldKey, fileObject: fileObject };
};

// for profile if a file exists, dispatch
var fileUploadCompleted = function fileUploadCompleted(formKey, fieldKey, fileStoreId, fileName) {
  return { type: actionTypes.FILE_UPLOAD_COMPLETED, formKey: formKey, fieldKey: fieldKey, fileStoreId: fileStoreId, fileName: fileName };
};

var fileUploadError = function fileUploadError(formKey, fieldKey, error, fileName) {
  return { type: actionTypes.FILE_UPLOAD_ERROR, formKey: formKey, fieldKey: fieldKey, error: error, fileName: fileName };
};

var removeFile = exports.removeFile = function removeFile(formKey, fieldKey, fileIndex) {
  return { type: actionTypes.FILE_REMOVE, fieldKey: fieldKey, formKey: formKey, fileIndex: fileIndex };
};

var resetFiles = exports.resetFiles = function resetFiles(formKey) {
  return { type: actionTypes.RESET_FILES, formKey: formKey };
};

// currently supports only single file upload at a time, although the API has support for multiple file upload
// TODO : can the upload happen at a later point in time? Challenge is to intimate the user if in case of a failure
var fileUpload = exports.fileUpload = function fileUpload(formKey, fieldKey, fileObject, fileIndex) {
  var fileName = fileObject.file.name;

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, getState) {
      var fileStoreId;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch(fileUploadPending(formKey, fieldKey, fileObject));
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _api.uploadFile)(_endPoints.FILE_UPLOAD.POST.URL, fileObject.module, fileObject.file);

            case 4:
              fileStoreId = _context2.sent;

              dispatch(fileUploadCompleted(formKey, fieldKey, fileStoreId, fileName));
              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);

              dispatch(fileUploadError(formKey, fieldKey, _context2.t0.message, fileName));
              dispatch((0, _actions.toggleSnackbarAndSetText)(true, _context2.t0.message, true));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 8]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var setFieldProperty = exports.setFieldProperty = function setFieldProperty(formKey, fieldKey, propertyName, propertyValue) {
  return { type: actionTypes.SET_FIELD_PROPERTY, formKey: formKey, fieldKey: fieldKey, propertyName: propertyName, propertyValue: propertyValue };
};

var deleteForm = exports.deleteForm = function deleteForm(formKey) {
  return {
    type: actionTypes.DELETE_FORM,
    formKey: formKey
  };
};

var updatePTForms = exports.updatePTForms = function updatePTForms(forms) {
  return {
    type: actionTypes.UPDATE_FORM,
    forms: forms
  };
};
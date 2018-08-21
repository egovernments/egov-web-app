"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformer = function transformer(formKey, form, state, recordData) {
  var transformers = {
    profile: function profile() {
      var userInfo = state.auth.userInfo;
      var name = userInfo.name,
          emailId = userInfo.emailId,
          permanentCity = userInfo.permanentCity,
          tenantId = userInfo.tenantId,
          imageUri = userInfo.photo;

      var transformedForm = (0, _extends3.default)({}, form, {
        fields: (0, _extends3.default)({}, form.fields, {
          email: (0, _extends3.default)({}, form.fields.email, { value: emailId || "" }),
          city: (0, _extends3.default)({}, form.fields.city, { value: permanentCity || tenantId }),
          name: (0, _extends3.default)({}, form.fields.name, { value: name })
        }),
        files: (0, _defineProperty3.default)({}, "photo", [{
          imageUri: imageUri
        }])
      });
      return transformedForm;
    },
    profileEmployee: function profileEmployee() {
      var userInfo = state.auth.userInfo;
      var name = userInfo.name,
          mobileNumber = userInfo.mobileNumber,
          emailId = userInfo.emailId,
          imageUri = userInfo.photo;


      var transformedForm = (0, _extends3.default)({}, form, {
        fields: (0, _extends3.default)({}, form.fields, {
          email: (0, _extends3.default)({}, form.fields.email, { value: emailId || "" }),
          phonenumber: (0, _extends3.default)({}, form.fields.phonenumber, { value: mobileNumber }),
          name: (0, _extends3.default)({}, form.fields.name, { value: name })
        }),
        files: (0, _defineProperty3.default)({}, "photo", [{
          imageUri: imageUri
        }])
      });

      return transformedForm;
    }
  };

  if (formKey in transformers) {
    try {
      return transformers[formKey]();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return form;
};

exports.default = transformer;
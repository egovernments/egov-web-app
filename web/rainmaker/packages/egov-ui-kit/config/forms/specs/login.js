"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "login",
  fields: {
    phone: {
      id: "person-phone",
      type: "mobilenumber",
      jsonPath: "otp.mobileNumber",
      required: true,
      floatingLabelText: "CORE_COMMON_MOBILE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "CORE_COMMON_PHONE_NUMBER_PLACEHOLDER",
      pattern: "^([0-9]){10}$",
      value: "abcd"
    },
    type: {
      id: "otp-type",
      jsonPath: "otp.type",
      value: "login"
    },
    city: {
      id: "person-city",
      jsonPath: "otp.tenantId",
      value: _common2.default.tenantId
    }
  },
  submit: {
    type: "submit",
    label: "CORE_COMMON_CONTINUE",
    id: "login-submit-action"
  },
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/user/otp",
  action: "token"
};

exports.default = formConfig;
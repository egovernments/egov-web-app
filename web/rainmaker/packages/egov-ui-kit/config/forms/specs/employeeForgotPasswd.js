"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "employeeForgotPasswd",
  fields: {
    username: {
      id: "person-phone",
      jsonPath: "otp.mobileNumber",
      required: true,
      floatingLabelText: "CORE_LOGIN_USERNAME",
      errorMessage: "CORE_COMMON_USERNAME_INVALIDMSG",
      hintText: "CORE_LOGIN_USERNAME_PLACEHOLDER",
      pattern: "^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$"
    },
    type: {
      id: "otp-type",
      jsonPath: "otp.type",
      value: "passwordreset"
    },
    tenantId: {
      id: "employee-forgot-password-tenantId",
      jsonPath: "otp.tenantId",
      value: _common2.default.forgotPasswordTenant
    }
  },
  submit: {
    type: "submit",
    label: "CORE_COMMON_CONTINUE",
    id: "employee-forgot-password-submit-action"
  },
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/user/otp",
  action: "token"
};
exports.default = formConfig;
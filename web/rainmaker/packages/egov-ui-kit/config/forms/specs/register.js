"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "register",
  fields: {
    name: {
      id: "person-name",
      type: "textfield",
      jsonPath: "otp.name",
      required: true,
      floatingLabelText: "CORE_COMMON_NAME",
      errorMessage: "CORE_COMMON_NAME_VALIDMSG",
      hintText: "CORE_COMMON_NAME_PLACEHOLDER",
      pattern: "^([^-!#$%&()*,./:;?@[\\]_{|}¨ˇ“”€+<=>§°\\d\\s¤®™©]| )+$"
    },
    city: {
      id: "person-city",
      jsonPath: "otp.permanentCity",
      required: true,
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "CORE_COMMON_CITY_PLACEHOLDER"
    },
    tenant: {
      jsonPath: "otp.tenantId",
      value: _common2.default.tenantId
    },
    phone: {
      id: "person-phone",
      required: true,
      type: "mobilenumber",
      jsonPath: "otp.mobileNumber",
      floatingLabelText: "CORE_COMMON_MOBILE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "CORE_COMMON_PHONE_NUMBER_PLACEHOLDER",
      pattern: "^([0-9]){10}$"
    },
    type: {
      id: "otp-type",
      jsonPath: "otp.type",
      value: "register"
    }
  },
  submit: {
    label: "CORE_COMMON_CONTINUE",
    id: "login-submit-action",
    type: "submit"
  },
  action: "_send",
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/user/otp"
};

exports.default = formConfig;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _email;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "profile",
  fields: {
    name: {
      id: "profile-form-name",
      className: "profile-form-field",
      type: "textfield",
      jsonPath: "user.name",
      required: true,
      floatingLabelText: "CORE_COMMON_NAME",
      errorMessage: "CORE_COMMON_NAME_VALIDMSG",
      hintText: "CORE_COMMON_NAME_PLACEHOLDER",
      pattern: "^([^-!#$%&()*,./:;?@[\\]_{|}¨ˇ“”€+<=>§°\\d\\s¤®™©]| )+$"
    },
    city: {
      id: "profile-form-city",
      jsonPath: "user.location.city",
      required: true,
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "CORE_COMMON_CITY_PLACEHOLDER"
    },
    email: (_email = {
      id: "profile-form-email",
      className: "profile-form-field",
      type: "name"
    }, (0, _defineProperty3.default)(_email, "type", "textfield"), (0, _defineProperty3.default)(_email, "jsonPath", "user.contact.email"), (0, _defineProperty3.default)(_email, "floatingLabelText", "CS_PROFILE_EMAIL"), (0, _defineProperty3.default)(_email, "hintText", "CS_PROFILE_EMAIL_PLACEHOLDER"), (0, _defineProperty3.default)(_email, "errorMessage", "CS_PROFILE_EMAIL_ERRORMSG"), (0, _defineProperty3.default)(_email, "pattern", "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"), _email)
  },
  submit: {
    label: "CS_PROFILE_SAVE",
    id: "profile-save-action",
    type: "submit"
  },
  toast: "Profile is Successfully Updated",
  saveUrl: "/user/profile/_update"
};

exports.default = formConfig;
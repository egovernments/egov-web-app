const formConfig = {
  name: "employeeChangePassword",
  fields: {
    existingPassword: {
      id: "employee-password",
      jsonPath: "existingPassword",
      required: true,
      floatingLabelText: "CORE_CHANGEPASSWORD_EXISTINGPASSWORD",
      errorMessage: "CORE_CHANGEPASSWORD_EXISTINGPASSWORD_INVALIDMSG",
      hintText: "CORE_CHANGEPASSWORD_EXISTINGPASSWORD_PLACEHOLDER",
      pattern: "^([a-zA-Z0-9@])+$",
      value: "",
    },
    newpassword: {
      id: "employee-password",
      jsonPath: "newPassword",
      required: true,
      floatingLabelText: "CORE_LOGIN_NEW_PASSWORD",
      errorMessage: "CORE_LOGIN_PASSWORD_ERRORMSG",
      hintText: "CORE_LOGIN_NEW_PASSWORD_PLACEHOLDER",
      pattern: "^([a-zA-Z0-9@])+$",
      value: "",
    },
    confirmnewpassword: {
      id: "employee-password",
      jsonPath: "newPassword",
      required: true,
      floatingLabelText: "CORE_LOGIN_CONFIRM_NEW_PASSWORD",
      errorMessage: "CORE_LOGIN_PASSWORD_ERRORMSG",
      hintText: "CORE_LOGIN_CONNFIRM_NEW_PASSWORD_PLACEHOLDER",
      pattern: "^([a-zA-Z0-9@])+$",
      value: "",
    },
  },
  submit: {
    label: "CORE_COMMON_CHANGE_PASSWORD",
    id: "password-submit-action",
  },
  saveUrl: "/user/password/_update",
  redirectionRoute: "/employee/all-complaints",
  action: "_update",
};

export default formConfig;

const formConfig = {
  name: "employeeChangePassword",
  fields: {
    username: {
      id: "employee-phone",
      jsonPath: "employee.username",
      required: true,
      floatingLabelText: "CORE_LOGIN_USERNAME",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "CORE_LOGIN_USERNAME_PLACEHOLDER",
      pattern: "^([0-9])+$",
      value: "",
    },
    newpassword: {
      id: "employee-password",
      jsonPath: "employee.password",
      required: true,
      floatingLabelText: "CORE_LOGIN_NEW_PASSWORD",
      errorMessage: "CORE_LOGIN_PASSWORD_ERRORMSG",
      hintText: "CORE_LOGIN_NEW_PASSWORD_PLACEHOLDER",
      pattern: "^([a-zA-Z0-9@])+$",
      value: "",
    },
    confirmnewpassword: {
      id: "employee-password",
      jsonPath: "employee.password",
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
  saveUrl: "",
  redirectionRoute: "",
  action: "",
};

export default formConfig;

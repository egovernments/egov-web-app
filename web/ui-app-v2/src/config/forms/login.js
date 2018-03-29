const formConfig = {
  name: "login",
  fields: {
    phone: {
      id: "person-phone",
      jsonPath: "otp.mobileNumber",
      required: true,
      floatingLabelText: "CORE_COMMON_PHONE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "CORE_COMMON_PHONE_NUMBER_PLACEHOLDER",
      pattern: "^([0-9])+$",
      value: "",
    },
    type: {
      id: "otp-type",
      jsonPath: "otp.type",
      value: "login",
    },
    city: {
      id: "person-city",
      jsonPath: "otp.tenantId",
      value: "pb",
    },
  },
  submit: {
    label: "CORE_COMMON_LOGIN",
    id: "login-submit-action",
  },
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/citizen/user/otp",
  action: "token"
};

export default formConfig;

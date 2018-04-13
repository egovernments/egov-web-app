const formConfig = {
  name: "otp",
  fields: {
    otp: {
      id: "otp",
      required: true,
      jsonPath: "User.otpReference",
      floatingLabelText: "CORE_OTP_OTP",
      errorMessage: "CORE_OTP_ERRORMSG",
      hintText: "CORE_OTP_PLACEHOLDER",
      pattern: "^([0-9]){6}$",
    },
  },
  submit: {
    label: "CORE_OTP_GET_STARTED",
    id: "otp-start",
  },
  action: "_create",
  saveUrl: "/user/citizen/_create",
  redirectionRoute: "/citizen/user/login",
};

export default formConfig;

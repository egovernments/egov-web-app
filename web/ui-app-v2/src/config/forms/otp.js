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
      pattern: "^([0-9]){5}$",
    },
  },
  action: "_create",
  saveUrl: "/user/citizen/_create",
  redirectionRoute: "/citizen",
};

export default formConfig;

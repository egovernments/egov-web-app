const formConfig = {
  name: "otp",
  fields: {
    otp: {
      id: "otp",
      required: true,
      jsonPath: "User.otpReference",
      floatingLabelText: "OTP",
      hintText: "Enter OTP",
      pattern: "^([0-9]){5}$",
      errorMessage: "Please enter a valid OTP",
    },
  },
  action: "_create",
  saveUrl: "/user/citizen/_create",
  redirectionRoute: "/citizen",
};

export default formConfig;

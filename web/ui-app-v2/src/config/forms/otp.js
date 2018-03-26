const formConfig = {
  name: "otp",
  fields: {
    otp: {
      id: "otp",
      required: true,
      floatingLabelText: "OTP",
      hintText: "Enter OTP",
      pattern: "^([0-9]){6}$",
      errorMessage: "Please enter a valid OTP",
    },
  },
  saveUrl: "/user/validateOTP",
};

export default formConfig;

const formConfig = {
  name: "login",
  fields: {
    phone: {
      id: "person-phone",
      jsonPath: "otp.mobileNumber",
      required: true,
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
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
      value:"pb"
    }
  },
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/citizen/user/otp",
  action: "token",
};

export default formConfig;

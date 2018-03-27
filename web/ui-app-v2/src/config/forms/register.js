const formConfig = {
  name: "register",
  fields: {
    name: {
      id: "person-name",
      jsonPath: "otp.name",
      required: true,
      floatingLabelText: "Name",
      hintText: "Enter Your Name",
      pattern: "^([A-z ])+$",
      errorMessage: "Please enter a valid name",
    },
    city: {
      id: "person-city",
      jsonPath: "otp.tenantId",
      required: true,
      floatingLabelText: "City",
      hintText: "Enter Your City",
    },
    phone: {
      id: "person-phone",
      required: true,
      jsonPath: "otp.mobileNumber",
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
      value: "",
    },
    type: {
      id: "otp-type",
      jsonPath: "otp.type",
      value: "register",
    },
  },
  action: "_send",
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/citizen/user/otp",
};

export default formConfig;

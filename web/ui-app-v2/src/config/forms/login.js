const formConfig = {
  name: "login",
  fields: {
    phone: {
      id: "person-phone",
      jsonPath: "login.username",
      required: true,
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
      value: "",
    },
  },
  saveUrl: "/user/oauth/token",
  redirectionRoute: "/citizen/user/otp",
  action: "token",
};

export default formConfig;

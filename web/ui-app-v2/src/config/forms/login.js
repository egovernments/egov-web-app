const formConfig = {
  name: "login",
  fields: {
    phone: {
      id: "person-phone",
      required: true,
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
      value: "",
    },
  },
  saveUrl: "/user/login",
};

export default formConfig;

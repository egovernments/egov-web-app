const formConfig = {
  name: "register",
  fields: {
    name: {
      id: "person-name",
      jsonPath: "user.name",
      required: true,
      floatingLabelText: "Name",
      hintText: "Enter Your Name",
      pattern: "^([A-z])+$",
      errorMessage: "Please enter a valid name",
    },
    city: {
      id: "person-city",
      jsonPath: "user.location.city",
      required: true,
      floatingLabelText: "City",
      hintText: "Enter Your City",
    },
    phone: {
      id: "person-phone",
      required: true,
      jsonPath: "user.contact.phone",
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
      value: "",
    },
  },
  saveUrl: "/user/register",
};

export default formConfig;

const formConfig = {
  name: "profile",
  fields: {
    name: {
      id: "profile-form-name",
      jsonPath: "user.name",
      required: true,
      floatingLabelText: "Name",
      hintText: "Enter Your Name",
      pattern: "^([A-z])+$",
      errorMessage: "Please enter a valid name",
    },
    city: {
      id: "profile-form-city",
      jsonPath: "user.location.city",
      required: true,
      floatingLabelText: "City",
      hintText: "Enter Your City",
    },
    email: {
      id: "profile-form-email",
      required: true,
      jsonPath: "user.contact.email",
      floatingLabelText: "Email Id",
      hintText: "Enter Your Email Id",
      pattern: "^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$",
      errorMessage: "Please enter a valid email",
      value: "",
    },
  },
  saveUrl: "/user/register",
};

export default formConfig;

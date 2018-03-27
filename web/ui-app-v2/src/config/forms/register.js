const formConfig = {
  name: "register",
  fields: {
    name: {
      id: "person-name",
      jsonPath: "otp.name",
      required: true,
      floatingLabelText: "CORE_COMMON_NAME",
      errorMessage: "Please enter a valid name",
      hintText: "CORE_COMMON_NAME_PLACEHOLDER",
      pattern: "^([A-z ])+$",
    },
    city: {
      id: "person-city",
      jsonPath: "otp.tenantId",
      required: true,
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "CORE_COMMON_CITY_PLACEHOLDER",
    },
    phone: {
      id: "person-phone",
      required: true,
      jsonPath: "otp.mobileNumber",
      floatingLabelText: "CORE_COMMON_PHONE_NUMBER",
      errorMessage: "Please enter a valid phone number",
      hintText: "CORE_COMMON_PHONE_NUMBER_PLACEHOLDER",
      pattern: "^([0-9])+$",
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

// const formConfig = {
//   name: "basicInformation",
//   fields: {
//     typeOfUsage: {
//       id: "typeOfUsage",
//       jsonPath: "",
//       type: "singleValueList",
//       floatingLabelText: "PT_PROPERTY_DETAILS_TYPE_OF_USAGE",
//       hintText: "PT_PROPERTY_DETAILS_CITY_PLACEHOLDER",
//     },
//     typeOfBuilding: {
//       id: "typeOfBuilding",
//       jsonPath: "",
//       type: "singleValueList",
//       floatingLabelText: "PT_PROPERTY_DETAILS_TYPE_OF_BUILDING",
//       hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
//     },
//   },
//   action: "",
//   redirectionRoute: "",
//   saveUrl: "",
// };

// export default formConfig;

const formConfig = {
  name: "basicInformation",
  fields: {
    typeOfUsage: {
      id: "typeOfUsage",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of usage",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      value: "",
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of Buiding",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      value: "",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;

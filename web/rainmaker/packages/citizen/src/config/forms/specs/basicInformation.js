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
      hintText: "Select",
      // dataFetchConfig: {
      //   url: MDMS.GET.URL,
      //   action: MDMS.GET.ACTION,
      //   queryParams: {},
      //   requestBody: {
      //     MdmsCriteria: {
      //       tenantId: "pb",
      //       moduleDetails: [
      //         {
      //           moduleName: "propertyType",
      //           masterDetails: [
      //             {
      //               name: "propertName",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      //   dataPath: `MdmsRes[${moduleName}][${master}]`,
      // },
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of Buiding",
      hintText: "Select",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;

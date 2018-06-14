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
import { MDMS } from "egov-ui-kit/utils/endPoints";

const formConfig = {
  name: "basicInformation",
  fields: {
    typeOfUsage: {
      id: "typeOfUsage",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of usage",
      hintText: "Select",
      dropDownData: [
        { label: "Residential", value: "RESIDENTIAL" },
        { label: "Commercial", value: "COMMERCIAL" },
        { label: "Institutional", value: "INSTITUTIONAL" },
        { label: "Industrial", value: "INDUSTRIAL" },
        { label: "Public Space", value: "PUBLICSPACE" },
        { label: "Religious", value: "RELIGIOUS" },
        { label: "Other", value: "OTHER" },
        { label: "Mixed", value: "MIXED" },
      ],
      // dataFetchConfig: {
      //   url: MDMS.GET.URL,
      //   action: MDMS.GET.ACTION,
      //   queryParams: {},
      //   requestBody: {
      //     MdmsCriteria: {
      //       tenantId: "pb",
      //       moduleDetails: [
      //         {
      //           moduleName: "PropertyTax",
      //           masterDetails: [
      //             {
      //               name: "UsageCategoryMajor",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      //   dataPath: "MdmsRes.PropertyTax.UsageCategoryMajor",
      // },
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of Buiding",
      hintText: "Select",
      dropDownData: [
        { label: "Independent Building", value: "IndependentProperty" },
        { label: "Flat/Part of Building", value: "SharedProperty" },
        { label: "Vacant Land", value: "VACANT" },
      ],
      // dataFetchConfig: {
      //   url: MDMS.GET.URL,
      //   action: MDMS.GET.ACTION,
      //   queryParams: {},
      //   requestBody: {
      //     MdmsCriteria: {
      //       tenantId: "pb",
      //       moduleDetails: [
      //         {
      //           moduleName: "PropertyTax",
      //           masterDetails: [
      //             {
      //               name: "PropertyType",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      //   dataPath: "MdmsRes.PropertyTax.PropertyType",
      // },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;

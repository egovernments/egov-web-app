import { MDMS } from "egov-ui-kit/utils/endPoints";
import { removeFormKey } from "modules/citizen/PropertyTax/FormWizard/utils/removeFloors";

const formConfig = {
  name: "basicInformation",
  fields: {
    typeOfUsage: {
      id: "typeOfUsage",
      jsonPath: "Properties[0].propertyDetails[0].usageCategoryMajor",
      type: "singleValueList",
      floatingLabelText: "Usage Type",
      hintText: "Select",
      required: true,
      updateDependentFields: (formKey, field, dispatch, state) => {
        removeFormKey(formKey, field, dispatch, state);
      },
      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "UsageCategoryMajor",
                  },
                  {
                    name: "UsageCategoryMinor",
                  },
                ],
              },
            ],
          },
        },
        dataPath: ["MdmsRes.PropertyTax.UsageCategoryMajor", "MdmsRes.PropertyTax.UsageCategoryMinor"],
      },
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "Properties[0].propertyDetails[0].propertyType",
      type: "singleValueList",
      floatingLabelText: "Type of Buiding",
      hintText: "Select",
      required: true,
      updateDependentFields: (formKey, field, dispatch, state) => {
        removeFormKey(formKey, field, dispatch, state);
      },
      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "PropertyType",
                  },
                  {
                    name: "PropertySubType",
                  },
                ],
              },
            ],
          },
        },
        dataPath: ["MdmsRes.PropertyTax.PropertyType", "MdmsRes.PropertyTax.PropertySubType"],
      },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;

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

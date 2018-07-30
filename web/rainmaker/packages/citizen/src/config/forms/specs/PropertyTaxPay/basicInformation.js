import { MDMS } from "egov-ui-kit/utils/endPoints";
import { removeFormKey } from "modules/citizen/PropertyTax/FormWizard/utils/removeFloors";
import set from "lodash/set";
import get from "lodash/get";

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
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        removeFormKey(formKey, field, dispatch, state);
      },
      dropDownData: [],
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "Properties[0].propertyDetails[0].propertyType",
      type: "singleValueList",
      floatingLabelText: "Type of Buiding",
      hintText: "Select",
      required: true,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        removeFormKey(formKey, field, dispatch, state);
      },
      dropDownData: [],
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
  beforeInitForm: (action, store) => {
    let state = store.getState();
    console.log(state);
    // action.form.fields.typeOfUsage.dropDownData
    // action=set(action,"form.fields.typeOfUsage.dropDownData",mergeMaster(get(state,"state.common.generalMDMSDataById.UsageCategoryMajor"),get(state,"state.common.generalMDMSDataById.UsageCategoryMinor")))
    return action;
  },
};

export default formConfig;

// mergeMaster = (masterOne, masterTwo, parentName = "") => {
//   let dropDownData = [];
//   let parentList = [];
//   for (var variable in masterTwo) {
//     if (object.hasOwnProperty(variable)) {
//       dropDownData.push({ label: masterTwo[variable].code, value: masterTwo[variable].name });
//     }
//   }
//   return dropDownData;
// };

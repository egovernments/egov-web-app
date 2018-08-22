import { MDMS } from "egov-ui-kit/utils/endPoints";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import { removeFormKey } from "./utils/removeFloors";
import { prepareDropDownData } from "./utils/reusableFields";
import set from "lodash/set";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const formConfig = {
  name: "basicInformation",
  fields: {
    typeOfUsage: {
      id: "typeOfUsage",
      jsonPath: "Properties[0].propertyDetails[0].usageCategoryMinor",
      type: "singleValueList",
      floatingLabelText: "PT_COMMONS_PROPERTY_USAGE_TYPE",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      required: true,
      fullWidth: true,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        removeFormKey(formKey, field, dispatch, state);
        dispatch(prepareFormData(`Properties[0].propertyDetails[0].units`, []));
        let minorObject = get(state, `common.generalMDMSDataById.UsageCategoryMinor[${field.value}]`);
        if (!isEmpty(minorObject)) {
          dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryMajor", minorObject.usageCategoryMajor));
        } else {
          dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryMajor", field.value));
          dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryMinor", null));
        }
      },
      dropDownData: [],
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "Properties[0].propertyDetails[0].propertySubType",
      type: "singleValueList",
      floatingLabelText: "PT_COMMONS_PROPERTY_TYPE",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      required: true,
      fullWidth: true,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        removeFormKey(formKey, field, dispatch, state);
        dispatch(prepareFormData(`Properties[0].propertyDetails[0].units`, []));
        let subTypeObject = get(state, `common.generalMDMSDataById.PropertySubType[${field.value}]`);
        if (!isEmpty(subTypeObject)) {
          dispatch(prepareFormData("Properties[0].propertyDetails[0].propertyType", subTypeObject.propertyType));
        } else {
          dispatch(prepareFormData("Properties[0].propertyDetails[0].propertyType", field.value));
          dispatch(prepareFormData("Properties[0].propertyDetails[0].propertySubType", null));
        }
      },
      dropDownData: [],
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
  beforeInitForm: (action, store) => {
    try {
      let state = store.getState();
      localStorage.setItem("previousFloorNo",-1);
      var masterOne = get(state, "common.generalMDMSDataById.UsageCategoryMajor");
      var masterTwo = get(state, "common.generalMDMSDataById.UsageCategoryMinor");
      set(action, "form.fields.typeOfUsage.dropDownData", mergeMaster(masterOne, masterTwo, "usageCategoryMajor"));
      masterOne = get(state, "common.generalMDMSDataById.PropertyType");
      masterTwo = get(state, "common.generalMDMSDataById.PropertySubType");
      set(action, "form.fields.typeOfBuilding.dropDownData", mergeMaster(masterOne, masterTwo, "propertyType"));
      return action;
    } catch (e) {
      console.log(e);
    }
  },
};

export default formConfig;

const mergeMaster = (masterOne, masterTwo, parentName = "") => {
  let dropDownData = [];
  let parentList = [];
  for (var variable in masterTwo) {
    if (masterTwo.hasOwnProperty(variable)) {
      dropDownData.push({ label: masterTwo[variable].name, value: masterTwo[variable].code });
    }
  }
  let masterOneData = getAbsentMasterObj(prepareDropDownData(masterOne, true), prepareDropDownData(masterTwo, true), parentName);
  // console.log(masterOneData);
  for (var i = 0; i < masterOneData.length; i++) {
    // masterOneData[i][parentName]=masterOneData[i].code;
    dropDownData.push({ label: masterOneData[i].name, value: masterOneData[i].code });
  }
  return dropDownData;
};

const getAbsentMasterObj = (master1Arr, master2Arr, propToCompare) => {
  const propArray = master2Arr.reduce((result, item) => {
    if (item[propToCompare] && result.indexOf(item[propToCompare]) === -1) {
      result.push(item[propToCompare]);
    }
    return result;
  }, []);
  return master1Arr.filter((item) => propArray.indexOf(item.code) === -1);
};

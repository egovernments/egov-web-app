import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
import { removeFormKey } from "modules/citizen/PropertyTax/FormWizard/utils/removeFloors";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import set from "lodash/set";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";

let floorDropDownData = [];

for (var i = 1; i <= 25; i++) {
  floorDropDownData.push({ label: i, value: i });
}

export const floorCount = {
  floorCount: {
    id: "assessment-number-of-floors",
    jsonPath: "Properties[0].propertyDetails[0].noOfFloors",
    type: "singleValueList",
    floatingLabelText: "No. of Floors",
    toolTip: true,
    toolTipMessage: "Total number of built floors in owned property",
    required: true,
    hintText: "Select",
    numcols: 4,
    dropDownData: floorDropDownData,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      removeFormKey(formKey, field, dispatch, state);
    },
  },
};

export const subUsageType = {
  subUsageType: {
    id: "assessment-subUsageType",
    jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryDetail",
    type: "singleValueList",
    floatingLabelText: "Sub Usage Type",
    hintText: "Select",
    dropDownData: [],
    required: true,
    numcols: 4,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      let subUsageMinor=get(state,`common.generalMDMSDataById.UsageCategoryDetail[${field.value}]`);
      if (!isEmpty(subUsageMinor)) {
        dispatch(
          prepareFormData(
            `${field.jsonPath.split("usageCategoryDetail")[0]}usageCategorySubMinor`,
            subUsageMinor.usageCategorySubMinor
          )
        );
      } else {
        dispatch(
          prepareFormData(
            `${field.jsonPath.split("usageCategoryDetail")[0]}usageCategorySubMinor`,
            field.value
          )
        );
        dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryDetail",null));
      }
    }
  },
};

export const occupancy = {
  occupancy: {
    id: "assessment-occupancy",
    jsonPath: "Properties[0].propertyDetails[0].units[0].occupancyType",
    type: "singleValueList",
    floatingLabelText: "Occupancy",
    hintText: "Select",
    required: true,
    numcols: 4,
    dropDownData: [],
    updateDependentFields: ({ formKey, field: sourceField, dispatch }) => {
      const { value } = sourceField;
      const dependentFields1 = ["annualRent"];
      switch (value) {
        case "RENTED":
          setDependentFields(dependentFields1, dispatch, formKey, false);
          break;
        default:
          setDependentFields(dependentFields1, dispatch, formKey, true);
          break;
      }
    },
  },
};

export const builtArea = {
  builtArea: {
    id: "assessment-built-area",
    jsonPath: "Properties[0].propertyDetails[0].units[0].unitArea",
    type: "textfield",
    floatingLabelText: "Built Area(sq yards)",
    hintText: "Enter built-up area",
    ErrorText: "Enter a valid built area size",
    toolTip: true,
    toolTipMessage: "Carpet Area + balcony area + thickness of outer walls",
    required: true,
    hideField: false,
    numcols: 4,
  },
};

export const annualRent = {
  annualRent: {
    id: "assessment-annual-rent",
    jsonPath: "Properties[0].propertyDetails[0].units[0].arv",
    type: "number",
    floatingLabelText: "Total Annual Rent",
    hintText: "Enter annual rent",
    ErrorText: "Enter a valid amount",
    toolTip: true,
    toolTipMessage: "Total Rent collected on your property over a year",
    required: true,
    pattern: "^([0-9]){0,8}$",
    hideField: true,
    numcols: 4,
  },
};

export const plotSize = {
  plotSize: {
    id: "assessment-plot-size",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "Plot Size(sq yards)",
    hintText: "Enter plot size",
    errorMessage: "Plot Size can be maximum 8 digits",
    required: true,
    pattern: "^([0-9]){0,8}$",
    numcols: 4,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      let propertyType=get(state,"common.prepareFormData.Properties[0].propertyDetails[0].propertyType")
      if (propertyType=="VACANT") {
        dispatch(prepareFormData("Properties[0].propertyDetails[0].landArea",field.value));
      }
    },
  },
};

export const measuringUnit = {
  // measuringUnit: {
  //   id: "assessment-plot-unit",
  //   jsonPath: "",
  //   type: "singleValueList",
  //   floatingLabelText: "Measuring unit",
  //   dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
  //   required: true,
  //   numcols: 4,
  //   value: "sq yards",
  // },
};

export const beforeInitForm = {
  beforeInitForm: (action, store) => {
    let state = store.getState();
    let {dispatch}=store;
    var occupancy=get(state,"common.generalMDMSDataById.OccupancyType");
    var usageCategoryMinor=get(state,"common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    if (usageCategoryMinor) {
      var filteredSubUsageMinor=filter(prepareDropDownData(get(state,"common.generalMDMSDataById.UsageCategorySubMinor"),true),(subUsageMinor)=>{
        return subUsageMinor.usageCategoryMinor===get(state,"common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
      });
      var filteredUsageCategoryDetails=getPresentMasterObj(filteredSubUsageMinor,prepareDropDownData(get(state,"common.generalMDMSDataById.UsageCategoryDetail"),true),"usageCategorySubMinor");
      set(action,"form.fields.subUsageType.dropDownData",mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails,"usageCategoryDetail"));
      dispatch(prepareFormData(`${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMinor`,get(state,`common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor`)));
    } else {
      set(action,"form.fields.subUsageType.hideField",true);
    }
    set(action,"form.fields.occupancy.dropDownData",prepareDropDownData(occupancy));
    dispatch(prepareFormData(`${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMajor`,get(state,`common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor`)));
    return action;
  }
};

export const beforeInitFormForPlot = {
  beforeInitForm: (action, store) => {
    let state = store.getState();
    let {dispatch}=store;
    const propertyType=get(state,"form.basicInformation.fields.typeOfBuilding.value");
    if (propertyType!="VACANT") {
      var occupancy=get(state,"common.generalMDMSDataById.OccupancyType");
      var usageCategoryMinor=get(state,"common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
      if (usageCategoryMinor) {
        var filteredSubUsageMinor=filter(prepareDropDownData(get(state,"common.generalMDMSDataById.UsageCategorySubMinor"),true),(subUsageMinor)=>{
          return subUsageMinor.usageCategoryMinor===get(state,"common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
        });
        var filteredUsageCategoryDetails=getPresentMasterObj(filteredSubUsageMinor,prepareDropDownData(get(state,"common.generalMDMSDataById.UsageCategoryDetail"),true),"usageCategorySubMinor");
        set(action,"form.fields.subUsageType.dropDownData",mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails,"usageCategoryDetail"));
        dispatch(prepareFormData(`${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMinor`,get(state,`common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor`)));
      } else {
        set(action,"form.fields.subUsageType.hideField",true);
      }
      set(action,"form.fields.occupancy.dropDownData",prepareDropDownData(occupancy));
      dispatch(prepareFormData(`${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMajor`,get(state,`common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor`)));
    }
    if (propertyType=="VACANT") {
      dispatch(prepareFormData(`Properties[0].propertyDetails[0].noOfFloors`,1));
    }
    if (propertyType=="SHAREDPROPERTY") {
      dispatch(prepareFormData(`Properties[0].propertyDetails[0].noOfFloors`,2));
      dispatch(prepareFormData(`Properties[0].propertyDetails[0].units[0].floorNo`,-1));
    }
    return action;
  },
};



export const prepareDropDownData = (master, withOriginal = false) => {
  let dropDownData = [];
  for (var variable in master) {
    if (master.hasOwnProperty(variable)) {
      if (withOriginal) {
        dropDownData.push(master[variable]);
      } else {
        dropDownData.push({ label: master[variable].name, value: master[variable].code });
      }
    }
  }
  return dropDownData;
};

const getPresentMasterObj = (master1Arr, master2Arr, propToCompare) => {
  const propArray = master2Arr.reduce((result, item) => {
    if (item[propToCompare] && result.indexOf(item[propToCompare]) === -1) {
      result.push(item[propToCompare]);
    }
    return result;
  }, []);
  return master1Arr.filter((item) => propArray.indexOf(item.code) !== -1);
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

const mergeMaster = (masterOne, masterTwo, parentName = "") => {
  let dropDownData = [];
  let parentList = [];
  for (var variable in masterTwo) {
    if (masterTwo.hasOwnProperty(variable)) {
      dropDownData.push({ label: masterTwo[variable].name, value: masterTwo[variable].code });
    }
  }
  let masterOneData=getAbsentMasterObj(prepareDropDownData(masterOne,true),prepareDropDownData(masterTwo,true),parentName);
  // console.log(masterOneData);
  for (var i = 0; i < masterOneData.length; i++) {
    // masterOneData[i][parentName]=masterOneData[i].code;
    dropDownData.push({ label:masterOneData[i].name,value: masterOneData[i].code});
  }
  return dropDownData;
};

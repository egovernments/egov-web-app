import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import { subUsageType, occupancy, builtArea, annualRent, beforeInitForm,mergeMaster,prepareDropDownData,getPresentMasterObj,getAbsentMasterObj,measuringUnit,beforeInitFormForPlot } from "../utils/reusableFields";
import filter from "lodash/filter";
import get from "lodash/get";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";

const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "singleValueList",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "",
      required: true,
      numcols: 4,
      dropDownData: [],
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        let minorObject = get(state, `common.generalMDMSDataById.UsageCategoryMinor[${field.value}]`);
        if (!isEmpty(minorObject)) {
          dispatch(prepareFormData(`${field.jsonPath.split("usageCategoryMinor")[0]}usageCategoryMajor`, minorObject.usageCategoryMajor));
          var filteredSubUsageMinor = filter(
            prepareDropDownData(get(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true),
            (subUsageMinor) => {
              return subUsageMinor.usageCategoryMinor === field.value;
            }
          );
          if (filteredSubUsageMinor.length > 0) {
            var filteredUsageCategoryDetails = getPresentMasterObj(
              prepareDropDownData(get(state, "common.generalMDMSDataById.UsageCategoryDetail"), true),
              filteredSubUsageMinor,
              "usageCategorySubMinor"
            );
            setDependentFields(["subUsageType"], dispatch, formKey, false);
            setDependentFields(["subUsageType"], dispatch, formKey, mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor"),"dropDownData");
          }
        } else {
          dispatch(prepareFormData(`${field.jsonPath.split("usageCategoryMinor")[0]}usageCategoryMajor`, field.value));
          dispatch(prepareFormData(`${field.jsonPath.split("usageCategoryMinor")[0]}usageCategoryMinor`, null));
        }
      }
    },
    ...subUsageType,
    ...occupancy,
    superArea: {
      id: "assessment-super-area",
      jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
      type: "textfield",
      floatingLabelText: "Total Super area",
      hintText: "Enter total super area",
      ErrorText: "Enter a valid super area size",
      toolTip: true,
      toolTipMessage: "Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)",
      required: true,
      numcols: 4,
      hideField: false,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].propertyDetails[0].units[0].unitArea", field.value));
      },
    },
    ...measuringUnit,
    ...annualRent,
  },
  isFormValid: false,
  ...beforeInitFormForPlot,
};

export default formConfig;

import { MDMS } from "egov-ui-kit/utils/endPoints";
import {plotSize,measuringUnit,subUsageType,occupancy,annualRent,beforeInitFormForPlot} from "../utils/reusableFields";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";

const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "singleValueList",
      floatingLabelText: "Usage Type",
      value: "Residential",
      required: true,
      numcols: 4,
      dropDownData: []
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
      hideField: true,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].propertyDetails[0].units[0].unitArea",field.value))
      }
    },
    ...measuringUnit,
    ...annualRent
  },
  isFormValid: false,
  ...beforeInitFormForPlot
};

export default formConfig;

import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/employee/PropertyTax/FormWizard/utils/enableDependentFields";
import {subUsageType,occupancy,builtArea,annualRent,beforeInitForm} from "../utils/reusableFields";

const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "textfield",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "Institutional",
      required: true,
      disabled: true,
      numcols: 4,
    },
    ...subUsageType,
    ...occupancy,
    ...builtArea,
    ...annualRent
  },
  isFormValid: false,
  ...beforeInitForm
};

export default formConfig;

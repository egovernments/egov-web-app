import { MDMS } from "egov-ui-kit/utils/endPoints";
import {subUsageType,occupancy,builtArea,beforeInitForm,annualRent} from "../utils/reusableFields";
const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "textfield",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "RESIDENTIAL",
      required: true,
      numcols: 4,
      disabled: true,
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

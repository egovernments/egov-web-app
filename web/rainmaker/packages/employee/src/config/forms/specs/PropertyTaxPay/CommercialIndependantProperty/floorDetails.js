import { subUsageType, occupancy, builtArea, annualRent, beforeInitForm } from "../utils/reusableFields";
import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/employee/PropertyTax/FormWizard/utils/enableDependentFields";

const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "textfield",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "COMMERCIAL",
      required: true,
      disabled: true,
      numcols: 4,
    },
    ...subUsageType,
    ...occupancy,
    ...builtArea,
    ...annualRent,
  },
  isFormValid: false,
  ...beforeInitForm,
};

export default formConfig;

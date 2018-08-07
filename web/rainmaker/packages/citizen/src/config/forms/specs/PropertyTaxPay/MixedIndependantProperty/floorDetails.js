import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
import { subUsageType, occupancy, builtArea, annualRent, beforeInitForm } from "../utils/reusableFields";

const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "singleValueList",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "MIXED",
      required: true,
      numcols: 4,
      dropDownData: [],
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

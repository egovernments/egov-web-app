import { MDMS } from "egov-ui-kit/utils/endPoints";
import {subUsageType,occupancy,builtArea,beforeInitForm} from "../utils/reusableFields";
const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMajor",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "RESIDENTIAL",
      required: true,
      numcols: 4,
      disabled: true,
    },
    ...subUsageType,
    ...occupancy,
    ...builtArea
  },
  isFormValid: false,
  ...beforeInitForm
};

export default formConfig;

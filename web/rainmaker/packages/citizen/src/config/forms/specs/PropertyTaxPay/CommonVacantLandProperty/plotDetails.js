import {plotSize,measuringUnit} from "../utils/reusableFields";
const formConfig = {
  name: "plotDetails",
  fields: {
    ...plotSize,
    ...measuringUnit
  },
  isFormValid: false,
};

export default formConfig;

import {plotSize,measuringUnit,beforeInitFormForPlot} from "../utils/reusableFields";
const formConfig = {
  name: "plotDetails",
  fields: {
    ...plotSize,
    ...measuringUnit
  },
  isFormValid: false,
};

export default formConfig;

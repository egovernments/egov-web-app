import { prepareDropDownData } from "../utils/reusableFields";
import set from "lodash/set";

const formConfig = {
  name: "customSelect",
  fields: {
    floorName: {
      id: "floorName",
      type: "singleValueList",
      floatingLabelText: "Select Floor",
      hintText: "Select floor",
      numcols: 12,
      errorMessage: "",
      required: true,
      beforeFieldChange: ({ action, dispatch, state }) => {
        const { value } = action;
        // const formKeys = Object.keys(state.form);
        const floorValues = Object.keys(state.form).map((key) => {
          if (key.startsWith("customSelect_")) {
            const form = state.form[key];
            if (form && form.fields.floorName.value) {
              return form.fields.floorName.value;
            }
          }
        });
        const valueExists = floorValues.find((floorvalue) => {
          return floorvalue === value;
        });
        if (valueExists) {
          alert("This floor is already selected, please select another floor");
          action.value = "";
        }
        return action;
      },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
  beforeInitForm: (action, store) => {
    try {
      let state = store.getState();
      const { Floor } = state.common && state.common.generalMDMSDataById;
      set(action, "form.fields.floorName.dropDownData", prepareDropDownData(Floor));
      return action;
    } catch (e) {
      console.log(e);
    }
  },
};

export default formConfig;

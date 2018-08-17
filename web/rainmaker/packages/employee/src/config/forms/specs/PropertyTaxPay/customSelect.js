import { prepareDropDownData } from "./utils/reusableFields";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import set from "lodash/set";
import get from "lodash/get";

const formConfig = {
  name: "customSelect",
  fields: {
    floorName: {
      id: "floorName",
      type: "singleValueList",
      floatingLabelText: "PT_FORM2_SELECT_FLOOR",
      hintText: "PT_FORM2_SELECT_FLOOR",
      numcols: 12,
      errorMessage: "",
      required: true,
      className: "pt-floor-name",
      beforeFieldChange: ({ action, dispatch, state }) => {
        const { value } = action;
        // const formKeys = Object.keys(state.form);
        const floorValues = Object.keys(state.form).reduce((floorValues, key) => {
          if (key.startsWith("customSelect_")) {
            const form = state.form[key];
            if (form && form.fields.floorName.value) {
              floorValues.push(form.fields.floorName.value);
            }
          }
          return floorValues;
        }, []);
        const valueExists = floorValues.find((floorvalue) => {
          return floorvalue === value;
        });
        if (valueExists && get(state, `form[${action.formKey}].fields[${action.fieldKey}].value`) !== action.value) {
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
  beforeInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();
      const { Floor } = state.common && state.common.generalMDMSDataById;
      set(action, "form.fields.floorName.dropDownData", prepareDropDownData(Floor));
      set(action, "form.fields.floorName.value", "");
      if (action.form.name === "customSelect_0") {
        set(action, "form.fields.floorName.value", "0");
        dispatch(setFieldProperty("customSelect_0", "floorName", "disabled", true));
      }
      return action;
    } catch (e) {
      console.log(e);
    }
  },
};

export default formConfig;

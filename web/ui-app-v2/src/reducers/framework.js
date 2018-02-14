import _ from "lodash";

const intialState = {
  specs: {},
  form: {},
  fields: {},
  dropDownData: {},
  moduleAction: "",
  moduleName: "",
  moduleMaster: "",
  loadingStatus: false,
  isFormValid: false
};

const framework = (state = intialState, action) => {
  const { type } = action;
  const { field } = action;

  switch (type) {
    case "HANDLE_CHANGE":
      const jsonPath = field.jsonPath;
      const newForm = _.clone(state.form);
      _.set(newForm, jsonPath, field.value);
      return { ...state, form: newForm };

    case "SET_SPECS":
      const { specs } = action;
      return { ...state, specs };

    case "SET_FORM_DATA":
      const { formData } = action;
      return { ...state, form: formData || {} };

    case "RESET_FORM_DATA":
      return { ...state, form: {} };

    case "SET_FIELD_PROPERTY":
      const { property } = action;
      return {
        ...state,
        fields: { ...state.fields, [field.target]: property }
      };

    case "VALIDATE_FORM":
      let fieldProperty = state.fields[field.target] || {};
      const { isFormValid, errorMessage } = action;

      return {
        ...state,
        fields: {
          ...state.fields,
          [field.target]: {
            ...fieldProperty,
            errorMessage
          }
        },
        isFormValid
      };

    case "SET_ACTION_NAME":
      const { actionName } = action;
      return { ...state, actionName };

    case "SET_MODULE_NAME":
      const { moduleName } = action;
      return { ...state, moduleName };

    case "SET_DROPDOWN_DATA":
      const { dropDownData, target } = action;
      return {
        ...state,
        dropDownData: { ...state.dropDownData, [target]: dropDownData }
      };

    case "LOADING_STATUS":
      const { loadingStatus } = action.loadingStatus;
      return { ...state, loadingStatus };

    default:
      return state;
  }
};

export default framework;

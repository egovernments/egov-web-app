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
  isFormValid: false,
};

const framework = (state = intialState, action) => {
  const { type, field } = action;

  switch (type) {
    case "HANDLE_CHANGE":
      const jsonPath = field.jsonPath;
      const newForm = _.clone(state.form);
      _.set(newForm, jsonPath, field.value);
      return { ...state, form: newForm };

    case "SUBMIT_FORM_DATA":
      return state;

    case "SET_FORM_DATA":
      const { formData } = action;
      return {
        ...state,
        form: formData || {},
      };

    case "RESET_FORM_DATA":
      return { ...state, form: {} };

    case "SET_FIELD_PROPERTY":
      const { property } = action;
      return {
        ...state,
        fields: { ...state.fields, [action.target]: property },
      };

    case "ADD_REQUIRED_FIELDS":
      const { requiredFields } = action;
      return {
        ...state,
        requiredFields,
      };

    case "VALIDATE_FORM":
      const { isFormValid } = action;
      return {
        ...state,
        isFormValid,
      };

    case "VALIDATE_FIELD":
      let fieldProperty = state.fields[field.target] || {};
      const { errorMessage } = action;
      return {
        ...state,
        fields: {
          ...state.fields,
          [field.target]: {
            ...fieldProperty,
            errorMessage,
          },
        },
      };

    case "SET_ROUTE":
      return {
        ...state,
        route: action.route,
      };

    case "SET_MODULE_ACTION":
      const { moduleAction } = action;
      return { ...state, moduleAction };

    case "SET_MODULE_NAME":
      const { moduleName } = action;
      return { ...state, moduleName };

    case "SET_MODULE_MASTER":
      const { moduleMaster } = action;
      return { ...state, moduleMaster };

    case "SET_DROPDOWN_DATA":
      const { dropDownData, target } = action;
      return {
        ...state,
        dropDownData: { ...state.dropDownData, [target]: dropDownData },
      };

    case "LOADING_STATUS":
      const { loadingStatus } = action.loadingStatus;
      return { ...state, loadingStatus };

    default:
      return state;
  }
};

export default framework;

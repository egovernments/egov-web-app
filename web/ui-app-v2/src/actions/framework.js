import { api } from "../utils";

export const setSpecs = specs => {
  return {
    type: "SET_SPECS",
    specs
  };
};

export const setModuleName = moduleName => {
  return {
    type: "SET_MODULE_NAME",
    moduleName
  };
};

export const setActionName = actionName => {
  return {
    type: "SET_ACTION_NAME",
    actionName
  };
};

export const submitFormData = () => {
  return {
    type: "SUBMIT_FORM_DATA"
  };
};

export const resetFormData = () => {
  return {
    type: "RESET_FORM_DATA"
  };
};

export const handleChange = field => {
  return {
    type: "HANDLE_CHANGE",
    field
  };
};

export const setFormData = formData => {
  return {
    type: "SET_FORM_DATA",
    formData
  };
};

export const setDropDownData = (field, dropDownData) => {
  return {
    type: "SET_DROPDOWN_DATA",
    field,
    dropDownData
  };
};

export const displayError = (field, errorMessage) => {
  return {
    type: "DISPLAY_ERROR_MESSAGE",
    field,
    errorMessage
  };
};

export const fetchDropDownData = (url, field, params = "countries") => {
  return async (dispatch, getState) => {
    // api calls go here
    const response = await api(url, field.target);
    dispatch(setDropDownData(field, response));
    // do some transformation
  };
};

export const apiCall = (url, params) => {
  return async (dispatch, getState) => {
    // api calls go here
    const response = await api(url, params);
    console.log(response);
    // dispatch(response)
    // do some transformation
  };
};

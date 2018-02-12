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

export const submitFormData = formData => {
  return {
    type: "SUBMIT_FORM_DATA",
    formData
  };
};

export const resetFormData = () => {
  return {
    type: "RESET_FORM_DATA"
  };
};

export const handleChange = (target, value) => {
  return {
    type: "HANDLE_CHANGE",
    target,
    value
  };
};

export const setFormData = formData => {
  return {
    type: "SET_FORM_DATA",
    formData
  };
};

export const setDropDownData = (target, dropDownData) => {
  return {
    type: "SET_DROPDOWN_DATA",
    target,
    dropDownData
  };
};

export const fetchDropDownData = (url, target, params = "countries") => {
  return async (dispatch, getState) => {
    // api calls go here
    const response = await api(url, target);
    dispatch(setDropDownData(target, response));
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

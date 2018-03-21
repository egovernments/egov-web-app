import { httpRequest } from "../api";

export const setModuleName = (moduleName) => {
  return {
    type: "SET_MODULE_NAME",
    moduleName,
  };
};

export const setActionName = (moduleAction) => {
  return {
    type: "SET_MODULE_ACTION",
    moduleAction,
  };
};

export const setMasterName = (moduleMaster) => {
  return {
    type: "SET_MODULE_MASTER",
    moduleMaster,
  };
};

export const setFieldProperty = (target, property) => {
  return {
    type: "SET_FIELD_PROPERTY",
    target,
    property,
  };
};

// set routes
export const setRoute = (route) => {
  return {
    type: "SET_ROUTE",
    route,
  };
};

// submit form
export const submitFormData = () => {
  return {
    type: "SUBMIT_FORM_DATA",
  };
};

const submitFormDataSuccess = (response) => {
  return {
    type: "SUBMIT_FORM_DATA_SUCCESS",
    response,
  };
};

const submitFormDataFailure = (error) => {
  return {
    type: "SUBMIT_FORM_DATA_FAILURE",
    error,
  };
};

export const resetFormData = () => {
  return {
    type: "RESET_FORM_DATA",
  };
};

// handle change event
export const handleChange = (field) => {
  return {
    type: "HANDLE_CHANGE",
    field,
  };
};

export const setFormData = (formData) => {
  return {
    type: "SET_FORM_DATA",
    formData,
  };
};

export const searchSuccess = (formData) => {
  return {
    type: "SEARCH_SUCCESS",
    formData,
  };
};

export const setDropDownData = (target, dropDownData) => {
  return {
    type: "SET_DROPDOWN_DATA",
    target,
    dropDownData,
  };
};

export const addRequiredFields = (requiredFields) => {
  return {
    type: "ADD_REQUIRED_FIELDS",
    requiredFields,
  };
};

// form field validations
export const setFormValidation = (isFormValid) => {
  return { type: "VALIDATE_FORM", isFormValid };
};

export const setFieldValidation = (field, errorMessage) => {
  return { type: "VALIDATE_FIELD", field, errorMessage };
};

const applicationError = (error) => {
  return {
    type: "APPLICATION_ERROR",
    error,
  };
};

export const saveForm = (url, formData) => {
  return async (dispatch, getState) => {
    try {
      const response = await httpRequest(url, formData);
      dispatch(submitFormDataSuccess(response));
    } catch (error) {
      dispatch(applicationError(error));
    }
  };
};

export const search = (url, params) => {
  return async (dispatch, getState) => {
    try {
      const response = await httpRequest(url);
      dispatch(setFormData(response));
    } catch (error) {
      dispatch(applicationError(error));
    }
  };
};

export const fetchDropDownData = (url, target) => {
  return async (dispatch, getState) => {
    try {
      const dropDownData = await httpRequest(url);
      dispatch(setDropDownData(target, dropDownData));
    } catch (error) {
      dispatch(applicationError(error));
    }
  };
};

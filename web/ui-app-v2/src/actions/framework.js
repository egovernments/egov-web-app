import { api, postData, search, apiForm } from "../utils/api";
import jp from "jsonpath";

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

export const setActionName = moduleAction => {
  return {
    type: "SET_MODULE_ACTION",
    moduleAction
  };
};

export const setMasterName = moduleMaster => {
  return {
    type: "SET_MODULE_MASTER",
    moduleMaster
  };
};

export const setFieldProperty = (target, property) => {
  return {
    type: "SET_FIELD_PROPERTY",
    target,
    property
  };
};

// set routes
export const setRoute = route => {
  return {
    type: "SET_ROUTE",
    route
  };
};

// submit form
const submitFormDataSuccess = response => {
  return {
    type: "SUBMIT_FORM_DATA_SUCCESS",
    response
  };
};

const submitFormDataFailure = error => {
  return {
    type: "SUBMIT_FORM_DATA_FAILURE",
    error
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

export const searchEntitySuccess = formData => {
  return {
    type: "SEARCH_ENTITY_SUCCESS",
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

export const addRequiredFields = requiredFields => {
  return {
    type: "ADD_REQUIRED_FIELDS",
    requiredFields
  };
};

export const setFormValidation = isFormValid => {
  return { type: "VALIDATE_FORM", isFormValid };
};

export const setFieldValidation = (field, errorMessage) => {
  return { type: "VALIDATE_FIELD", field, errorMessage };
};

const applicationError = error => {
  return {
    type: "APPLICATION_ERROR",
    error
  };
};

// calculate the route and dispatch
export const submitFormDataRequest = (url, formData) => {
  return async (dispatch, getState) => {
    try {
      const response = await postData(url, formData);
      dispatch(submitFormDataSuccess(response));
    } catch (error) {
      dispatch(applicationError(error));
    }
  };
};

export const fetchDropDownData = (url, target) => {
  return async (dispatch, getState) => {
    const dropDownData = await apiForm(
      url,
      target
    );

    dispatch(setDropDownData(target, dropDownData));
  };
};
// removonmg
export const searchEntity = (url, params) => {
  return async (dispatch, getState) => {
    // api calls go here
    try {
      const response = await search(url, params);
      dispatch(setFormData(response));
    } catch (error) {
      dispatch(applicationError(error));
    }
  };
};

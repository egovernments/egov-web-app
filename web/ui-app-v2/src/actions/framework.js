import { api, postData, search, apiForm } from "../utils/api";

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

export const setFieldProperty = (target, property) => {
  return {
    type: "SET_FIELD_PROPERTY",
    target,
    property
  };
};

export const setActionName = actionName => {
  return {
    type: "SET_ACTION_NAME",
    actionName
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

export const setFormData = (formData, target) => {
  return {
    type: "SET_FORM_DATA",
    formData
  };
};

// export const setFieldProperty = (target,)

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

export const setFormValidation = (field, errorMessage, isFormValid) => {
  return { type: "VALIDATE_FORM", field, errorMessage, isFormValid };
};

const applicationError = error => {
  return {
    type: "APPLICATION_ERROR",
    error
  };
};

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

export const fetchDropDownData = (dataSourceObj, target) => {
  return async (dispatch, getState) => {
    const dropDownData = await apiForm(
      dataSourceObj,
      dataSourceObj.response.path
    );

    dispatch(setDropDownData(target, dropDownData));
  };
};

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

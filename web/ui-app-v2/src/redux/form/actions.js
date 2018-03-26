import * as actionTypes from "./actionTypes";
import { httpRequest } from "../../utils/api";
import { prepareFormData } from "./utils";

export const initForm = (form) => {
  return {
    type: actionTypes.INIT_FORM,
    form,
  };
};

export const handleFieldChange = (formKey, fieldKey, value) => {
  return {
    type: actionTypes.FIELD_CHANGE,
    formKey,
    fieldKey,
    value,
  };
};

export const displayFormErrors = (formKey) => {
  return { type: actionTypes.DISPLAY_FORM_ERRORS, formKey };
};

export const setFormValidation = (formKey, isFormValid) => {
  return { type: actionTypes.VALIDATE_FORM, isFormValid, formKey };
};

export const setFieldValidation = (formKey, fieldKey, errorText) => {
  return { type: actionTypes.VALIDATE_FIELD, formKey, fieldKey, errorText };
};

export const submitFormPending = (formKey) => {
  return { type: actionTypes.SUBMIT_FORM_PENDING, formKey };
};

export const submitFormComplete = (formKey, payload) => {
  return { type: actionTypes.SUBMIT_FORM_COMPLETE, payload };
};

export const submitFormError = (formKey, error) => {
  return { type: actionTypes.SUBMIT_FORM_ERROR, error };
};
export const submitForm = (formKey) => {
  return async (dispatch, getState) => {
    const state = getState();
    const form = state.form[formKey];
    const { isFormValid } = form;
    if (isFormValid) {
      dispatch(submitFormPending(formKey));
      try {
        const formParams = {};
        const { saveUrl, fields } = form;
        const formData = prepareFormData(fields);
        console.log(formData);
        // const formResponse = await httpRequest(saveUrl,formParams);
        // data transformation will be handled by a custom middleware
        // dispatch(submitFormComplete(formKey, formResponse));
      } catch (error) {
        dispatch(submitFormComplete(formKey, error));
      }
    } else {
      dispatch(displayFormErrors(formKey));
    }
  };
};

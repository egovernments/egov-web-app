import * as actionTypes from "./actionTypes";
import { authenticated } from "../auth/actions";
import { toggleSnackbarAndSetText, setRoute } from "../app/actions";
import { httpRequest, loginRequest } from "../../utils/api";
import { prepareFormData } from "../../utils/commons";

export const initForm = (form) => {
  console.log(form);
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
  return { type: actionTypes.SUBMIT_FORM_COMPLETE, formKey, payload };
};

export const submitFormError = (formKey, error) => {
  return { type: actionTypes.SUBMIT_FORM_ERROR, formKey, error };
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
        const { saveUrl, fields, action, contentType } = form;
        let formData = null;
        try {
          let transformer = require(`../../config/forms/transformers/${formKey}`).default;
          transformer = transformer.viewModelToBusinessModelTransformer;
          if (transformer && typeof transformer === "function") {
            formData = transformer(formKey, state);
          }
        } catch (error) {}
        if (formData === null) {
          formData = prepareFormData(fields);
        }
        let formResponse = {};
        if (formData.hasOwnProperty("login")) {
          formResponse = await loginRequest(formData.login.username, formData.login.password);
        } else {
          //adding tenantId and phone in services. -- to be refactored --
          if (formData.services) {
            formData.services[0].tenantId = localStorage.getItem("tenantId");
            formData.services[0].phone = JSON.parse(localStorage.getItem("user-info")).UserRequest.mobileNumber;
          }
          formResponse = await httpRequest(saveUrl, action, [], formData);
        }
        dispatch(submitFormComplete(formKey, formResponse));
      } catch (error) {
        // console.log(error);
        dispatch(submitFormError(formKey, error));
        toggleSnackbarAndSetText(false, error, false, true);
      }
    } else {
      dispatch(displayFormErrors(formKey));
    }
  };
};

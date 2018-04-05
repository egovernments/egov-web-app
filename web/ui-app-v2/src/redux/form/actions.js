import * as actionTypes from "./actionTypes";
import { authenticated } from "redux/auth/actions";
import { toggleSnackbarAndSetText, setRoute, setUserInfo } from "redux/app/actions";
import { httpRequest, loginRequest, uploadFile } from "utils/api";
import { prepareFormData } from "utils/commons";
import { FILE_UPLOAD } from "utils/endPoints";
import { validateForm } from "./utils";

export const initForm = (form) => {
  return {
    type: actionTypes.INIT_FORM,
    form,
  };
};

export const resetForm = (formKey) => {
  return { type: actionTypes.RESET_FORM, formKey };
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
    const isFormValid = validateForm(form);
    if (isFormValid) {
      dispatch(submitFormPending(formKey));
      try {
        const { saveUrl, action } = form;
        let formData = null;
        try {
          let transformer = require(`config/forms/transformers/${formKey}`).default;
          transformer = transformer.viewModelToBusinessModelTransformer;
          if (transformer && typeof transformer === "function") {
            formData = transformer(form, state);
          }
        } catch (error) {
          // console.log(error);
          // the assumption is that the error occured only because a transformer was not found
          formData = prepareFormData(form);
        }
        let formResponse = {};
        // this will eventually moved out to the auth action
        if (formData.hasOwnProperty("login")) {
          formResponse = await loginRequest(formData.login.username, formData.login.password);
        }else if (formData.hasOwnProperty("employee")) {
          formResponse = await loginRequest(formData.employee.username, formData.employee.password);
        } else {
          formResponse = await httpRequest(saveUrl, action, [], formData);
        }
        dispatch(submitFormComplete(formKey, formResponse));
      } catch (error) {
        dispatch(submitFormError(formKey, error.message));
        toggleSnackbarAndSetText(false, error.message, false, true);
      }
    } else {
      dispatch(displayFormErrors(formKey));
    }
  };
};

// file actions
const fileUploadPending = (formKey, fieldKey) => {
  return { type: actionTypes.FILE_UPLOAD_STARTED, formKey, fieldKey };
};

// for profile if a file exists, dispatch
const fileUploadCompleted = (formKey, fieldKey, fileObject) => {
  return { type: actionTypes.FILE_UPLOAD_COMPLETED, formKey, fieldKey, fileObject };
};

const fileUploadError = (fieldKey, formKey, error) => {
  return { type: actionTypes.FILE_UPLOAD_ERROR, formKey, fieldKey, error };
};

export const removeFile = (formKey, fieldKey, index) => {
  return { type: actionTypes.FILE_REMOVE, fieldKey, formKey, index };
};

// currently supports only single file upload at a time, although the API has support for multiple file upload
export const fileUpload = (formKey, fieldKey, fileObject) => {
  return async (dispatch, getState) => {
    dispatch(fileUploadPending(formKey, fieldKey));
    try {
      const fileStoreId = await uploadFile(FILE_UPLOAD.POST.URL, fileObject.module, fileObject.file);
      dispatch(fileUploadCompleted(formKey, fieldKey, { ...fileObject, fileStoreId }));
    } catch (error) {
      dispatch(fileUploadError(formKey, fieldKey, error.message));
    }
  };
};

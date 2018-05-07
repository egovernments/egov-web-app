import * as actionTypes from "./actionTypes";
import { toggleSnackbarAndSetText } from "redux/app/actions";
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
    const { loading } = form;
    const isFormValid = validateForm(form);
    if (loading) {
      return;
    }
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
            // check if a transformer returns a promise in which case wait for the promise to resolve
            try {
              formData = typeof formData.then === "function" ? await formData : formData;
            } catch (error) {
              const { message } = error;
              dispatch(submitFormError(formKey, message));
              dispatch(toggleSnackbarAndSetText(true, message, true));
              return;
            }
          }
        } catch (error) {
          // TODO: handle the errors appropriately
          // the assumption is that the error occured only because a transformer was not found
          formData = prepareFormData(form);
        }
        let formResponse = {};
        // this will eventually moved out to the auth action; bit messy
        if (formData.hasOwnProperty("login")) {
          formResponse = await loginRequest(formData.login.username, formData.login.password);
        } else if (formData.hasOwnProperty("employee")) {
          formResponse = await loginRequest(formData.employee.username, formData.employee.password);
        } else {
          formResponse = await httpRequest(saveUrl, action, [], formData);
        }
        dispatch(submitFormComplete(formKey, formResponse));
      } catch (error) {
        const { message } = error;
        dispatch(submitFormError(formKey, message));
        dispatch(toggleSnackbarAndSetText(true, message, true));
      }
    } else {
      dispatch(displayFormErrors(formKey));
    }
  };
};

// file actions
const fileUploadPending = (formKey, fieldKey, fileObject) => {
  return { type: actionTypes.FILE_UPLOAD_STARTED, formKey, fieldKey, fileObject };
};

// for profile if a file exists, dispatch
const fileUploadCompleted = (formKey, fieldKey, fileStoreId, fileName) => {
  return { type: actionTypes.FILE_UPLOAD_COMPLETED, formKey, fieldKey, fileStoreId, fileName };
};

const fileUploadError = (formKey, fieldKey, error, fileName) => {
  return { type: actionTypes.FILE_UPLOAD_ERROR, formKey, fieldKey, error, fileName };
};

export const removeFile = (formKey, fieldKey, fileIndex) => {
  return { type: actionTypes.FILE_REMOVE, fieldKey, formKey, fileIndex };
};

// currently supports only single file upload at a time, although the API has support for multiple file upload
// TODO : can the upload happen at a later point in time? Challenge is to intimate the user if in case of a failure
export const fileUpload = (formKey, fieldKey, fileObject, fileIndex) => {
  const { name: fileName } = fileObject.file;
  return async (dispatch, getState) => {
    dispatch(fileUploadPending(formKey, fieldKey, fileObject));
    try {
      const fileStoreId = await uploadFile(FILE_UPLOAD.POST.URL, fileObject.module, fileObject.file);
      dispatch(fileUploadCompleted(formKey, fieldKey, fileStoreId, fileName));
    } catch (error) {
      dispatch(fileUploadError(formKey, fieldKey, error.message, fileName));
      dispatch(toggleSnackbarAndSetText(true, error.message, true));
    }
  };
};

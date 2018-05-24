import * as actionTypes from "../actionTypes";
import { setFieldValidation } from "../actions";
import { validateField, getFormField } from "../utils";

const formValidation = (store) => (next) => (action) => {
  const { type, fieldKey, formKey } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type == actionTypes.FIELD_CHANGE) {
  
    try {
        let transformer = require(`config/forms/transformers/${formKey}`).default;
        // transformer = transformer.r;
        if (transformer && typeof transformer === "function") {
          formData = transformer(form, state);
          // check if a transformer returns a promise in which case wait for the promise to resolve
          try {
            formData = typeof formData.then === "function" ? await formData : formData;
          } catch (error) {
            const { message } = error;
            // this bit of code is duplicated
            dispatch(submitFormError(formKey, message));
            dispatch(toggleSnackbarAndSetText(true, message, true));
            return;
          }
        }
    


  }
  
  next(action);
};

export default formValidation;

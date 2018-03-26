import * as actionTypes from "../actionTypes";
import { setFieldValidation, setFormValidation } from "../actions";
import { validateField, getFormField, getFormFields } from "../utils";

const validateForm = (form) => {
  let isFormValid = true;
  const formFields = getFormFields(form);
  for (let key in formFields) {
    const field = formFields[key];
    if (!validateField(field, field.value).isFieldValid) {
      isFormValid = false;
      break;
    }
  }
  return isFormValid;
};

const formValidation = (store) => (next) => (action) => {
  const { type, fieldKey, formKey } = action;
  const dispatch = store.dispatch;

  if (type == actionTypes.FIELD_CHANGE) {
    next(action);
    const state = store.getState();
    const form = state.form[formKey] || {};
    const field = getFormField(form, fieldKey);
    const { required, pattern } = field;
    if (pattern || required) {
      const validationObject = validateField(field);
      const { errorText } = validationObject;
      dispatch(setFieldValidation(formKey, fieldKey, errorText));
    }
    const isFormValid = validateForm(state.form[formKey]);
    dispatch(setFormValidation(formKey, isFormValid));
  } else {
    next(action);
  }
};

export default formValidation;

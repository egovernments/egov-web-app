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
  const state = store.getState();
  const form = state.form[formKey] || {};
  const field = getFormField(form, fieldKey);

  if (type == actionTypes.FIELD_CHANGE) {
    const { required, pattern } = field;
    if (pattern || required) {
      const validationObject = validateField(field, action.value);
      const { errorText } = validationObject;
      dispatch(setFieldValidation(formKey, fieldKey, errorText));
    }
    next(action);
  } else if (type == actionTypes.VALIDATE_FIELD) {
    next(action);
    const validatedState = store.getState();
    const isFormValid = validateForm(validatedState.form[formKey]);
    dispatch(setFormValidation(formKey, isFormValid));
  } else {
    next(action);
  }
};

export default formValidation;

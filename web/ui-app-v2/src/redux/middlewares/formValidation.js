import * as actionTypes from "../actionTypes/form";
import { setFieldValidation, setFormValidation } from "../actions/form";

const validateForm = (form) => {
  let isFormValid = true;
  for (let key in form) {
    const field = form[key];
    if (!validateField(field, field.value).isFieldValid) {
      isFormValid = false;
      break;
    }
  }
  return isFormValid;
};

const validateField = (field, value = "") => {
  const { minLength, maxLength, required, pattern } = field;

  let errorText = "",
    isFieldValid = true;

  const fieldLength = value.length;

  if (required && !value.length) {
    isFieldValid = false;
    errorText = "Required";
  }

  if ((minLength && fieldLength < minLength) || (maxLength && fieldLength > maxLength) || (pattern && !new RegExp(pattern).test(value))) {
    isFieldValid = false;
    errorText = field.errorMessage;
  }

  return { isFieldValid, errorText };
};

const formValidation = (store) => (next) => (action) => {
  const { type, fieldKey, formKey } = action;
  const dispatch = store.dispatch;
  const state = store.getState();
  const form = state.form[formKey] || {};
  const field = form[fieldKey] || {};

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

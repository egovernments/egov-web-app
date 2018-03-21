import { setFieldValidation, setFormValidation } from "../actions/framework";
import _ from "lodash";
import { isFieldEmpty } from "../utils";

const validateField = (value, field) => {
  const { minLength, maxLength, isRequired, pattern, patternErrorMessage } = field;

  let errorMessage = "",
    isFieldValid = true;

  const fieldLength = value.length;

  if (isRequired && !value.length) {
    isFieldValid = false;
    errorMessage = "Required";
  }

  if ((minLength && fieldLength < minLength) || (maxLength && fieldLength > maxLength) || (pattern && !new RegExp(pattern).test(value))) {
    isFieldValid = false;
    errorMessage = patternErrorMessage;
  }

  return { isFieldValid, errorMessage };
};

const doesFieldHaveError = (field) => {
  const { errorMessage } = field;
  return !(errorMessage && errorMessage.trim().length);
};

const validateForm = (fields, requiredFields) => {
  const fieldKeys = Object.keys(fields);
  let isFormValid = true;

  for (let i = 0; i < fieldKeys.length; i++) {
    const field = fields[fieldKeys[i]];
    const { errorMessage } = field;
    isFormValid = doesFieldHaveError(field);
    if (!isFormValid) {
      break;
    }
  }

  if (isFormValid) {
    for (let index = 0; index < requiredFields.length; index++) {
      const field = requiredFields[index];
      if (isFieldEmpty(field)) {
        isFormValid = false;
        break;
      }
    }
  }

  return isFormValid;
};

const formValidation = (store) => (next) => (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();
  const { field } = action;

  if (type == "HANDLE_CHANGE") {
    const { isRequired, value, pattern } = field;

    if (pattern || isRequired) {
      const validationObject = validateField(value, field);
      const errorMessage = validationObject.errorMessage;
      dispatch(setFieldValidation(field, errorMessage));
    }
    next(action);
  } else if (type == "VALIDATE_FIELD") {
    next(action);
    const validatedState = store.getState();
    const isFormValid = validateForm(validatedState.framework.fields, validatedState.framework.requiredFields);
    dispatch(setFormValidation(isFormValid));
  } else {
    next(action);
  }
};

export default formValidation;

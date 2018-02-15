import { setFieldValidation, setFormValidation } from "../actions/framework";

const validateField = (value, field) => {
  const { isRequired, pattern, patternErrorMessage } = field;
  const regex = new RegExp(pattern);

  let errorMessage = "",
    isFieldValid = true;

  if (isRequired && !value.length) {
    isFieldValid = false;
    errorMessage = "Required";
  }

  if (!regex.test(value)) {
    isFieldValid = false;
    errorMessage = patternErrorMessage;
  }

  return { isFieldValid, errorMessage };
};

const doesFieldHaveError = field => {
  const { errorMessage } = field;
  return !(errorMessage && errorMessage.trim().length);
};

const validateForm = (fields, requiredFields) => {
  const fieldKeys = Object.keys(fields);
  let isFormValid = true;

  if (!Object.keys(fields).length) {
    return false;
  }

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
      const formFieldIndex = fieldKeys.indexOf(field);
      if (formFieldIndex === -1) {
        isFormValid = false;
        break;
      } else {
        const formField = fields[formFieldIndex];
      }
    }
  }

  return isFormValid;
};

const formValidation = store => next => action => {
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
    const isFormValid = validateForm(
      validatedState.framework.fields,
      validatedState.framework.requiredFields
    );
    dispatch(setFormValidation(isFormValid));
  } else {
    next(action);
  }
};

export default formValidation;

import { setFormValidation } from "../actions/framework";

const validateField = (value, isRequired, regex, patternErrorMessage) => {
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

  console.log(isFormValid);
  console.log(requiredFields);

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

  if (type == "HANDLE_CHANGE") {
    const { field } = action;
    const { target, isRequired, value, pattern, patternErrorMessage } = field;
    let isFieldValid = true,
      isFormValid = true,
      errorMessage = "";

    if (pattern || isRequired) {
      const regex = new RegExp(pattern);
      const validationObject = validateField(
        value,
        isRequired,
        regex,
        patternErrorMessage
      );
      isFieldValid = validationObject.isFieldValid;
      errorMessage = validationObject.errorMessage;
      isFormValid =
        isFieldValid &&
        validateForm(state.framework.fields, state.framework.requiredFields);
    }
    // dispatch the form validation
    dispatch(setFormValidation(field, errorMessage, isFormValid));
  }
  next(action);
};

export default formValidation;

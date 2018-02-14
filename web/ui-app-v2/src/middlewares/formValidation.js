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

const validateForm = fields => {
  const fieldKeys = Object.keys(fields);
  let isFormValid = true;

  if (!fieldKeys.length) {
    return false;
  }

  for (let i = 0; i < fieldKeys.length; i++) {
    const field = fields[fieldKeys[i]];
    const { errorMessage } = field;

    if (errorMessage && errorMessage.trim().length > 0) {
      isFormValid = false;
      break;
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
      isFormValid = validateForm(state.framework.fields) && isFieldValid;
    }
    // dispatch the form validation
    dispatch(setFormValidation(field, errorMessage, isFormValid));
  }
  next(action);
};

export default formValidation;

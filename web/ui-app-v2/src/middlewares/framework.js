import { displayError } from "../actions/framework";

const dependentApiCall = (target, value) => {};

const isFieldValid = (value, isRequired, regex, patternErrorMessage) => {
  let errorMessage = "",
    valid = true;

  if (isRequired && !value.length) {
    valid = false;
    errorMessage = "Required";
  }

  if (!regex.test(value)) {
    valid = false;
    errorMessage = patternErrorMessage;
  }

  return { valid, errorMessage };
};

const handleValidation = (field, state, dispatch) => {
  const { target, isRequired, value, pattern, patternErrorMessage } = field;

  if (pattern || isRequired) {
    const regex = new RegExp(pattern);
    const { valid, errorMessage } = isFieldValid(
      value,
      isRequired,
      regex,
      patternErrorMessage
    );

    // do you need to dispatch every time?
    dispatch(displayError(field, errorMessage));
  }
};

const handleFieldVisibilityToggle = (target, value) => {};

const handleEnableDisableToggle = (target, value) => {};

const frameworkMiddleware = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();
  switch (type) {
    case "HANDLE_CHANGE":
      const { field } = action;
      handleValidation(field, state, dispatch);
      break;
    // data to be sent to the server
    case "SUBMIT_FORM_DATA":
      const { form: formData, specs } = state.framework;
      const { transformers } = specs;
      let transformedFormData = Object.assign({}, formData);
      transformers.VToBModelTransform.forEach(transformer => {
        transformedFormData = transformer(transformedFormData);
      });
      // make api call
      break;
    // set form data
    case "SET_FORM_DATA":
      break;
    default:
      break;
  }
  next(action);
};

export default frameworkMiddleware;

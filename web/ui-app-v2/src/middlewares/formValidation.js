import { displayError } from "../actions/framework";

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

const formValidation = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type == "HANDLE_CHANGE") {
    const { field } = action;
    handleValidation(field, state, dispatch);
  }

  next(action);
};

export default formValidation;

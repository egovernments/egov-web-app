const dependentApiCall = (target, value) => {};

const handleValidation = (target, value) => {};

const handleFieldVisibilityToggle = (target, value) => {};

const handleEnableDisableToggle = (target, value) => {};

// should validation be a middleware

const frameworkMiddleware = store => next => action => {
  const { type } = action;
  switch (type) {
    case "HANDLE_CHANGE":
      const { target, value } = action;
      // nbi
      break;
    // data to be sent to the server
    case "SUBMIT_FORM_DATA":
      break;

    case "SET_FORM_DATA":
      break;
    default:
      break;
  }
  next(action);
};

export default frameworkMiddleware;

const dependentApiCall = (target, value) => {};

const handleFieldVisibilityToggle = (target, value) => {};

const handleEnableDisableToggle = (target, value) => {};

const fieldDependency = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type == "HANDLE_CHANGE") {
    const { field } = action;
  }

  next(action);
};

export default fieldDependency;

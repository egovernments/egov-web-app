import { fetchDropDownData } from "../actions/framework";

const dependantApiCall = (dependency, dispatch) => {
  const { dataSource, target } = dependency;
  dispatch(fetchDropDownData(dataSource, target));
};

const handleFieldVisibilityToggle = (dependency, dispatch) => {};

const handleEnableDisableToggle = (target, value) => {};

const fieldDependency = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type == "HANDLE_CHANGE") {
    const { field } = action;
    const { dependencies } = field;

    if (dependencies && dependencies.length) {
      dependencies.forEach(dependency => {
        const { type } = dependency;
        switch (type) {
          case "API_CALL":
            dependantApiCall(dependency, dispatch);
            break;
          case "VISIBILITY_TOGGLE":
            break;
          case "ENABLE_DISABILITY_TOGGLE":
            break;
          default:
            break;
        }
      });

      dependantApiCall(field, dispatch);
    }
  }

  next(action);
};

export default fieldDependency;

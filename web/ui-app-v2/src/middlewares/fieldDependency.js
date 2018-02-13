import { fetchDropDownData, setFieldProperty } from "../actions/framework";

const dependantApiCall = (dependency, dispatch) => {
  const { dataSource, target } = dependency;
  dispatch(fetchDropDownData(dataSource, target));
};

const handleFieldVisibilityToggle = (value, property, dependency, dispatch) => {
  const { affectants } = dependency;
  affectants.forEach(affectant => {
    const { target } = affectant;
    dispatch(setFieldProperty, { hide: true });
  });
};

const fieldDependency = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type == "HANDLE_CHANGE") {
    const { field } = action;
    const { value, dependencies } = field;

    if (dependencies && dependencies.length) {
      dependencies.forEach(dependency => {
        const { type } = dependency;
        switch (type) {
          case "API_CALL":
            dependantApiCall(dependency, dispatch);
            break;
          case "PROPERTY_TOGGLE":
            handleFieldVisibilityToggle(value, dependency, dispatch);
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

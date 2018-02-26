import { fetchDropDownData, setFieldProperty } from "../actions/framework";
import { prepareSearchUrl } from "../utils";

const dependantApiCall = (value, dependency, dispatch) => {
  const { dataSource, target } = dependency;
  const searchUrl = prepareSearchUrl(dataSource, value);
  dispatch(fetchDropDownData(searchUrl, target));
};

const toggleFieldProperty = (dependency, value, dispatch) => {
  const { toggleProperty, targets } = dependency;
  const toggleValue = value == true ? false : true;
  targets.forEach((target) => {
    dispatch(
      setFieldProperty(target, {
        [toggleProperty]: toggleValue,
      })
    );
  });
};

const fieldDependency = (store) => (next) => (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type == "HANDLE_CHANGE") {
    const { field } = action;
    const { value, dependencies } = field;

    if (dependencies && dependencies.length) {
      dependencies.forEach((dependency) => {
        const { type } = dependency;
        switch (type) {
          case "API_CALL":
            dependantApiCall(value, dependency, dispatch);
            break;
          case "PROPERTY_TOGGLE":
            toggleFieldProperty(dependency, value, dispatch);
            break;
          default:
            break;
        }
      });
    }
  }

  next(action);
};

export default fieldDependency;

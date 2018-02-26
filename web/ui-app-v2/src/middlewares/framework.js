import { setRoute } from "../actions/framework";
import _ from "lodash";

const framework = (store) => (next) => (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  switch (type) {
    case "SUBMIT_FORM_DATA_SUCCESS":
      const { response } = action;
      const { framework } = state;
      const { specs, moduleName, moduleMaster } = framework;
      const { idJsonPath } = state.framework.specs;
      let entityId = response ? _.get(response, idJsonPath) : null;
      if (entityId) {
        const route = `/view/${moduleName}/${moduleMaster}/${entityId}`;
        dispatch(setRoute(route));
      }
      break;

    default:
      break;
  }
  next(action);
};

export default framework;

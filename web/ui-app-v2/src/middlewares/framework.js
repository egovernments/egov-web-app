import { setRoute } from "../actions/framework";
import _ from "lodash";

const framework = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  switch (type) {
    // routing handled only for create
    case "SUBMIT_FORM_DATA_SUCCESS":
      let { response } = action;
      const { framework } = state;
      const { specs, moduleName, moduleMaster } = framework;
      const { idJsonPath, objectName } = state.framework.specs;

      response = _.get(response, objectName);
      let entityId = response ? _.get(response, idJsonPath) : null;
      // make it dynamic, have a configuration as to which route needs to be called
      const route = `/view/${moduleName}/${moduleMaster}/${entityId}`;
      action.response = response[0];
      dispatch(setRoute(route));
      break;

    default:
      break;
  }
  next(action);
};

export default framework;

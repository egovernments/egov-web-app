import app from "egov-ui-framework/ui-redux/app/reducer";
import auth from "egov-ui-framework/ui-redux/auth/reducer";
import workflow from "ui-redux/workflow/reducer";
import screenConfiguration from "egov-ui-framework/ui-redux/screen-configuration/reducer";

const rootReducer = {
  app,
  auth,
  workflow,
  screenConfiguration
};

export default rootReducer;

import app from "mihy-ui-framework/ui-redux/app/reducer";
import auth from "mihy-ui-framework/ui-redux/auth/reducer";
import workflow from "ui-redux/workflow/reducer";
import screenConfiguration from "mihy-ui-framework/ui-redux/screen-configuration/reducer";

const rootReducer = {
  app,
  auth,
  workflow,
  screenConfiguration
};

export default rootReducer;

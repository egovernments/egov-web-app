import { fetchData } from "./citizenSearchResource/citizenFunctions";

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-molecules",
      componentPath: "SingleApplication",
      visible: true
    }
  }
};

export default screenConfig;

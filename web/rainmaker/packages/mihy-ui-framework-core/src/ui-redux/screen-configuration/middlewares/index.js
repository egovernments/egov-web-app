import handleScreenConfigurationFieldChange from "./handleScreenConfigurationFieldChange";
import beforeInitScreen from "./beforeInitScreen";
import afterInitScreen from "./afterInitScreen";
import beforeFieldChange from "./beforeFieldChange";
import afterFieldChange from "./afterFieldChange";
import addJsonPath from "./addJsonPath";

const composedMiddleware = [
  beforeInitScreen,
  addJsonPath,
  beforeFieldChange,
  handleScreenConfigurationFieldChange,
  afterFieldChange,
  afterInitScreen
];
export default composedMiddleware;

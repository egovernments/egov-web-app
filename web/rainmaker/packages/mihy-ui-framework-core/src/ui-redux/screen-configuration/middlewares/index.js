import handleScreenConfigurationFieldChange from "./handleScreenConfigurationFieldChange";
import beforeInitScreen from "./beforeInitScreen";
import beforeFieldChange from "./beforeFieldChange";
import afterFieldChange from "./afterFieldChange";



const composedMiddleware = [beforeInitScreen,beforeFieldChange,handleScreenConfigurationFieldChange,afterFieldChange];
export default composedMiddleware;

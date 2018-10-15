import {
  getLabel,
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import tradeLicenseSearchAndResult from "../tradelicence/search";

const header = getCommonHeader({
  labelName: "Trade License",
  labelKey: "TL_COMMON_TL"
});

const screenConfig = {
  beforeInitScreen: (action, state, dispatch) => {
    // console.log(action);
    return action;
  },
  ...tradeLicenseSearchAndResult
};

export default screenConfig;

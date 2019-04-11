import {
  getCommonHeader,
  getCommonContainer,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { abgSearchCard, mergeDownloadButton } from "./searchResource/fireNocApplication";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
// import { pendingApprovals } from "./searchResource/pendingApprovals";
// import { progressStatus } from "./searchResource/progressStatus";
import { searchResults } from "./searchResource/searchResults";

const header = getCommonHeader({
  labelName: "Group Bills",
  labelKey: "NOC_COMMON_NOC"
});

const abgSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            }
          }
        },
        abgSearchCard,
        breakAfterSearch: getBreak(),
        // progressStatus,
        searchResults,
        breakAfterSearchResults: getBreak(),
        mergeDownloadButton
      }
    },
  }
};

export default abgSearchAndResult;

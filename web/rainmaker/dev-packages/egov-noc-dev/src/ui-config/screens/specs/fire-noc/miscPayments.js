import {
    getCommonHeader,
    getCommonContainer,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {payeeInformation} from "./mpResource/payeeDetails";
  import { abgSearchCard, mergeDownloadButton } from "./searchResource/fireNocApplication";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  // import { pendingApprovals } from "./searchResource/pendingApprovals";
  // import { progressStatus } from "./searchResource/progressStatus";
  import { searchResults } from "./searchResource/searchResults";
import { mapProps } from "recompose";
  
  const header = getCommonHeader({
    labelName: "Miscellaneous Payment",
    labelKey: "MP_COMMON_MP"
  });
  
  const mpForm = {
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
          payeeInformation
        //   abgSearchCard,
        //   breakAfterSearch: getBreak(),
        //   // progressStatus,
        //   searchResults,
        //   breakAfterSearchResults: getBreak(),
        //   mergeDownloadButton
        }
      },
    }
  };
  
  export default mpForm;
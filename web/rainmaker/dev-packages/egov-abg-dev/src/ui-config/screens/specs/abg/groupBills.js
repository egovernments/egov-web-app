import {
  getCommonHeader,

  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { abgSearchCard, mergeDownloadButton } from "./groupBillResource/groupBillSearch";
import { searchResults } from "./groupBillResource/searchResults";

const header = getCommonHeader({
  labelName: "Group Bills",
  labelKey: "ABG_COMMON_HEADER"
});

const abgSearchAndResult = {
  uiFramework: "material-ui",
  name: "groupBills",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "groupBills"
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

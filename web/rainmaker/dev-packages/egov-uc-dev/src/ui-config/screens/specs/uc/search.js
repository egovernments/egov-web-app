import {
    getCommonHeader,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {UCSearchCard} from "./universalCollectionResources/ucsearch";
//   import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { searchResults } from "./universalCollectionResources/searchResult";
  
  const header = getCommonHeader({
    labelName: "Universal Collection",
    labelKey: "UC_COMMON_HEADER"
  });
  
  const ucSearchAndResult = {
    uiFramework: "material-ui",
    name: "universalCollection",
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "universalCollection"
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
          UCSearchCard,
          breakAfterSearch: getBreak(),
          searchResults,
        }
      },
    }
  };
  
  export default ucSearchAndResult;
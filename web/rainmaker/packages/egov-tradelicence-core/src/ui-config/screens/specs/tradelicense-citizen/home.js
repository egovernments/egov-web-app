import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonParagraph,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import tradeLicenseSearchAndResult from "../tradelicence/search";

import { searchResults } from "./citizenSearchResource/citizenSearchResults";
import { fetchData } from "./citizenSearchResource/citizenFunctions";

const header = getCommonHeader({
  labelName: "Trade License",
  labelKey: "TL_COMMON_TL"
});

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            card: getCommonCard({
              applicationSuccessContainer: getCommonContainer({
                body: {
                  uiFramework: "custom-atoms",
                  componentPath: "Div",
                  children: {
                    header: getCommonHeader({
                      labelName: "Apply for New Trade License",
                      labelKey: "TL_COMMON_APPL_NEW_LICe"
                    }),
                    paragraph: getCommonParagraph({
                      labelName:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
                    }),
                    collectPaymentButton: {
                      componentPath: "Button",
                      props: {
                        variant: "contained",
                        color: "primary",
                        style: {
                          width: "200px",
                          height: "48px",
                          marginRight: "40px"
                        }
                      },
                      children: {
                        collectPaymentButtonLabel: getLabel({
                          labelName: "APPLY",
                          labelKey: "TL_APPLY"
                        })
                      },
                      onClickDefination: {
                        action: "page_change",
                        path: "/mihy-ui-framework/tradelicense-citizen/apply"
                      },
                      roleDefination: {
                        rolePath: "user-info.roles",
                        roles: ["EMPLOYEE"]
                      }
                    }
                  }
                }
              })
            }),
            break: getBreak(),
            searchResults: searchResults
          }
        }
      }
    }
  }
};

export default tradeLicenseSearchAndResult;

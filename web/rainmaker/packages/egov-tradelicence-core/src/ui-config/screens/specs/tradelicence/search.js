import {
  getCommonHeader,
  getLabel,
  getBreak
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import React from "react";
import { tradeLicenseApplication } from "./searchResource/tradeLicenseApplication";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { pendingApprovals } from "./searchResource/pendingApprovals";
import { progressStatus } from "./searchResource/progressStatus";
import { searchResults } from "./searchResource/searchResults";

const hasButton = getQueryArg(window.location.href, "hasButton");
const hasApproval = getQueryArg(window.location.href, "hasApproval");
let enableInbox,
  enableButton = true;
enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader({
  labelName: "Trade License",
  labelKey: "TL_COMMON_TL"
});
const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
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
            },
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "36px"
                    }
                  }
                },

                buttonLabel: getLabel({
                  labelName: "NEW APPLICATION",
                  labelKey: "TL_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/mihy-ui-framework/tradelicence/apply"
              }
            }
          }
        },
        pendingApprovals,
        tradeLicenseApplication,
        breakAfterSearch: getBreak(),
        progressStatus,
        searchResults
      }
    }
  }
};

export default tradeLicenseSearchAndResult;

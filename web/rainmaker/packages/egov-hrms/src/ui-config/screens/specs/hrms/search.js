import {
  getCommonHeader,
  getLabel,
  getBreak
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { searchForm } from "./searchResource/searchForm";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { pendingApprovals } from "./searchResource/pendingApprovals";
// import { progressStatus } from "./searchResource/progressStatus";
import { searchResults } from "./searchResource/searchResults";
import { httpRequest } from "../../../../ui-utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

const hasButton = getQueryArg(window.location.href, "hasButton");
//const hasApproval = getQueryArg(window.location.href, "hasApproval");
let enableButton = true;
//enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader({
  labelName: "Employee Management",
  labelKey: "HR_COMMON_HEADER"
});

const getMDMSData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: "pb", // Why hardcoded?
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [{ name: "Department" }, { name: "Designation" }]
        }
      ]
    }
  };
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const getData = async (action, state, dispatch) => {
  await getMDMSData(action, state, dispatch);
};

const employeeSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch);
    return action;
  },
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
                      fontSize: "24px"
                    }
                  }
                },

                buttonLabel: getLabel({
                  labelName: "ADD NEW EMPLOYEE",
                  labelKey: "HR_ADD_NEW_EMPLOYEE_BUTTON"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/mihy-ui-framework/hrms/create"
              },
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["SUPERUSER"]
              }
            }
          }
        },
        pendingApprovals,
        searchForm,
        breakAfterSearch: getBreak(),
        // progressStatus,
        searchResults
      }
    }
  }
};

export default employeeSearchAndResult;

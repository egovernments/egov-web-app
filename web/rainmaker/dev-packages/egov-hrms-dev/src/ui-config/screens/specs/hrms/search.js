import {
  getBreak,
  getCommonHeader,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { httpRequest } from "../../../../ui-utils";
import { pendingApprovals } from "./searchResource/pendingApprovals";
import { searchForm } from "./searchResource/searchForm";
import { searchResults } from "./searchResource/searchResults";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

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
  const tenantId = getTenantId();
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [
            { name: "Department", filter: "[?(@.active == true)]" },
            { name: "Designation", filter: "[?(@.active == true)]" }
          ]
        },
        {
          moduleName: "egov-hrms",
          masterDetails: [
            {
              name: "Degree",
              filter: "[?(@.active == true)]"
            },
            {
              name: "EmployeeStatus",
              filter: "[?(@.active == true)]"
            },
            {
              name: "EmployeeType",
              filter: "[?(@.active == true)]"
            },
            {
              name: "DeactivationReason",
              filter: "[?(@.active == true)]"
            },
            {
              name: "EmploymentTest",
              filter: "[?(@.active == true)]"
            },
            {
              name: "Specalization",
              filter: "[?(@.active == true)]"
            }
          ]
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

const gotoCreatePage = (state, dispatch) => {
  get(state.screenConfiguration.preparedFinalObject, "Employee") &&
    dispatch(prepareFinalObject("Employee", []));
  get(
    state.screenConfiguration.preparedFinalObject,
    "hrms.reviewScreen.furnishedRolesList"
  ) && dispatch(prepareFinalObject("hrms.reviewScreen.furnishedRolesList", ""));

  const createUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/hrms/create`
      : `/hrms/create`;
  dispatch(setRoute(createUrl));
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
                  labelName: "Add Employee",
                  labelKey: "HR_ADD_NEW_EMPLOYEE_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: gotoCreatePage
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

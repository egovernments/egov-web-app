import {
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { employeeReviewDetails } from "./viewResource/employee-review";
import { hrViewFooter } from "./viewResource/footer";
import { getEmployeeData } from "./viewResource/functions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { deactivateEmployee } from "./viewResource/deactivate-employee";
import { showHideAdhocPopup } from "../utils";

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `View Employee Information`,
    labelKey: "HR_VIEW_HEADER"
  })
});

const tradeView = employeeReviewDetails(false);

const screenConfig = {
  uiFramework: "material-ui",
  name: "view",
  beforeInitScreen: (action, state, dispatch) => {
    let employeeCode = getQueryArg(window.location.href, "employeeID");
    getEmployeeData(state, dispatch, employeeCode);
    showHideAdhocPopup(state, dispatch);
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
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        tradeView,
        footer: hrViewFooter()
      }
    },
    // deactivateEmployee: {
    //   uiFramework: "custom-molecules-local",
    //   componentPath: "ActionDialog",
    //   props: {
    //     open: false
    //   },
    //   type: "array"
    // },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "view"
      },
      children: {
        popup: deactivateEmployee
      }
    }
  }
};

export default screenConfig;

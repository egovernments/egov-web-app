import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";
import { showHideAdhocPopup } from "../../utils";
import { handleCreateUpdateEmployee } from "./functions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const getCommonCreateFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const hrCommonFooter = () => {
  return getCommonCreateFooter({
    submitButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        submitButtonLabel: getLabel({
          labelName: "SUBMIT",
          labelKey: "HR_SUBMIT_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: handleCreateUpdateEmployee
      }
    }
  });
};

export const hrViewFooter = () => {
  const employeeCode = getQueryArg(window.location.href, "employeeID");
  return getCommonCreateFooter({
    deactivateEmployee: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        deactivateEmployeeButtonLabel: getLabel({
          labelName: "DEACTIVATE EMPLOYEE",
          labelKey: "HR_DEACTIVATE_EMPLOYEE_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: showHideAdhocPopup
      }
    },
    editDetails: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        editDetailsButtonLabel: getLabel({
          labelName: "EDIT DETAILS",
          labelKey: "HR_EDIT_DETAILS_LABEL"
        }),
        editDetailsButtonIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "keyboard_arrow_right"
          }
        }
      },
      onClickDefination: {
        action: "page_change",
        path: `/mihy-ui-framework/hrms/create?employeeCode=${employeeCode}`
      }
    }
  });
};

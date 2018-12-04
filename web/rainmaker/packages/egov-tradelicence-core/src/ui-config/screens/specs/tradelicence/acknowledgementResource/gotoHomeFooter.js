import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const gotoHomeFooter = () => {
  const roleExists = ifUserRoleExists("CITIZEN");
  const redirectionURL = roleExists
    ? "/mihy-ui-framework/tradelicense-citizen/home"
    : "/mihy-ui-framework/tradelicence/search";

  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: getLabel({
          labelName: "GO TO HOME",
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: `${redirectionURL}`
      }
    }
  });
};

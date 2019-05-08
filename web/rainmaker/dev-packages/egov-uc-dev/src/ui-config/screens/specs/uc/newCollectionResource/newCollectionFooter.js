import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
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

export const newCollectionFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "NEXT",
        labelKey: "UC_BUTTON_NEXT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        processDemand(state, dispatch);
      }
    }
  }
});

const processDemand = (state, dispatch) => {
  createDemand(state, dispatch);
  // billGenerate(state, dispatch);
  console.log("state:", state);
};
const createDemand = async (state, dispatch) => {
  const demand = get(state.screenConfiguration.preparedFinalObject, "Demands");
  try {
    const payload = await httpRequest(
      "post",
      "/billing-service-v1/demand/_create",
      "",
      [],
      {
        Demands: demand
      }
    );
  } catch (e) {}
  console.log("Demands:", demand);
};
// const billGenerate = (state, dispatch) => {
//   console.log("state:", state);
// };

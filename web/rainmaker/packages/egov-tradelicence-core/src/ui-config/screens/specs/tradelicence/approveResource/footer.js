import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import {
  getFooterButtons,
  getCommonApplyFooter,
  onClickPreviousButton,
  onClickNextButton
} from "../../utils";
import { updateTradeDetails } from "ui-utils/commons";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";
const queryValue = getQueryArg(window.location.href, "purpose");

const onNextButtonClick = async (state, dispatch) => {
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { Licenses } = preparedFinalObject;
  if (Licenses && Licenses.length > 0) {
    const status = get(Licenses[0], "status");
    switch (queryValue) {
      case "cancel":
        if (status === "APPROVED") {
          set(Licenses[0], "action", "CANCEL");
        }
      case "reject":
        if (status === "APPLIED") {
          set(Licenses[0], "action", "REJECT");
        }
      default:
        if (status === "APPLIED") {
          set(Licenses[0], "action", "APPROVE");
        }
    }
  }
  let response = await updateTradeDetails({ Licenses });
  if (response) {
    const applicationNumber = get(response, "Licenses[0].applicationNumber");
    const tlNumber = get(response, "Licenses[0].licenseNumber");
    const route = onClickNextButton(applicationNumber, tlNumber);
    dispatch(setRoute(route));
  }
};

export const footerApprove = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "BACK",
        labelKey: "TL_COMMON_BUTTON_BACK"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: onClickPreviousButton()
    }
  },

  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getFooterButtons()
    },
    onClickDefination: {
      action: "condition",
      callBack: onNextButtonClick
    }
  }
});

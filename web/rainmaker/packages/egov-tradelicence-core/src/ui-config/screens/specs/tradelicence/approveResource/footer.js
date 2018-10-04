import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import {
  getFooterButtons,
  getCommonApplyFooter,
  onClickPreviousButton,
  onClickNextButton
} from "../../utils";
import { updateTradeDetails } from "ui-utils/commons";

import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";

const onConfirmApprove = async (state, dispatch) => {
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { Licenses } = preparedFinalObject;
  let response = await updateTradeDetails({ Licenses });
  if (response) {
    const applicationNumber = get(response, "Licenses[0].applicationNumber");
    const tlNumber = get(response, "Licenses[0].licenseNumber");
    console.log("payload ......", response);
    let route = onClickNextButton(applicationNumber, tlNumber);
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
      callBack: onConfirmApprove
    }
  }
});

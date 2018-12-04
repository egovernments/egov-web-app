import {
  getCommonContainer,
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { footer } from "./payResource/footer";
import estimateDetails from "./payResource/estimate-details";
import g8Details from "./payResource/g8-details";
import capturePaymentDetails from "./payResource/capture-payment-details";
import { adhocPopup } from "./applyResource/adhocPopup";
import { showHideAdhocPopup, getDialogButton } from "../utils";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { fetchBill } from "../utils";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Payment for New Trade License (2018-2019)",
    labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "applicationNumber")
    }
  }
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: (action, state, dispatch) => {
    fetchBill(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "pay"
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
        formwizardFirstStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            paymentDetails: getCommonCard({
              header: getCommonTitle({
                labelName: "Payment Collection Details",
                labelKey: "TL_PAYMENT_HEAD"
              }),
              // paragraph: getCommonParagraph({
              //   labelName: ""
              // }),
              estimateDetails,
              addPenaltyRebateButton: {
                componentPath: "Button",
                props: {
                  color: "primary",
                  style: {}
                },
                children: {
                  previousButtonLabel: getLabel({
                    labelName: "ADD REBATE/PENALTY",
                    labelKey: "TL_PAYMENT_ADD_RBT_PEN"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: showHideAdhocPopup
                }
              },
              viewBreakupButton: getDialogButton(
                "VIEW BREAKUP",
                "TL_PAYMENT_VIEW_BREAKUP",
                "pay"
              ),
              capturePaymentDetails,
              g8Details
            })
          }
        },
        footer
      }
    },
    adhocDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "md"
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          children: {
            popup: adhocPopup
          }
        }
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "pay"
      }
    }
  }
};

export default screenConfig;

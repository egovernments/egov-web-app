import {
  getCommonContainer,
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { footer } from "./payResource/footer";
import estimateDetails from "./payResource/estimate-details";
import g8Details from "./payResource/g8-details";
import capturePaymentDetails from "./payResource/capture-payment-details";
import { adhocPopup } from "./applyResource/adhocPopup";
import { showHideAdhocPopup, getBill } from "../utils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "ui-utils/commons";
import set from "lodash/set";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Payment for New Trade License (2018-2019)",
    labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const getTaxValue = item => {
  return item
    ? item.debitAmount
      ? -Math.abs(item.debitAmount)
      : item.crAmountToBePaid
        ? item.crAmountToBePaid
        : 0
    : 0;
};

const getEstimateData = Bill => {
  if (Bill && Bill.length) {
    const { billAccountDetails } = Bill[0].billDetails[0];
    const transformedData = billAccountDetails.map(item => {
      return {
        name: {
          labelName: "Default Label",
          labelKey: item.taxHeadCode
        },
        value: getTaxValue(item),
        info: {
          labelName: "Information about NA",
          labelKey: `Information about ${item.taxHeadCode}`
        }
      };
    });

    console.log(transformedData);
    return transformedData;
  }
};

const fetchBill = async (action, state, dispatch) => {
  localStorage.setItem("token", "d2e0cc69-be44-4ae4-aa28-64b1e81181a5");
  const queryParams = [
    { key: "tenantId", value: getQueryArg(window.location.href, "tenantId") },
    {
      key: "consumerCode",
      value: getQueryArg(window.location.href, "applicationNumber")
    },
    {
      key: "businessService",
      value: getQueryArg(window.location.href, "businessService")
    }
  ];
  const payload = await getBill(queryParams);
  const estimateData = getEstimateData(payload.Bill);
  set(state);
  dispatch(
    handleField(
      "pay",
      "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.estimateDetails.children.cardContent.children.estimateSection",
      "props.estimate.fees",
      estimateData
    )
  );
  dispatch(prepareFinalObject("Receipt[0].Bill[0]", payload.Bill[0]));
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: (action, state, dispatch) => {
    // fetchBill(action, state, dispatch);
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
        formwizardFirstStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            paymentDetails: getCommonCard({
              header: getCommonTitle({
                labelName:
                  "Review your estimated fees and enter the payment collection details",
                labelKey: "TL_PAYMENT_HEAD"
              }),
              paragraph: getCommonParagraph({
                labelName:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
              }),
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
        open: false
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          children: {
            popup: adhocPopup
          }
        }
      }
    }
  }
};

export default screenConfig;

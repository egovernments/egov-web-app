import {
  getCommonHeader,
  getCommonCard,
  getCommonParagraph,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
// import { acknowledgementFooter } from "./acknowledgementResource/acknowledgementFooter";
import set from "lodash/set";

const getAcknowledgementCard = (
  state,
  dispatch,
  purpose,
  status,
  receiptNumber,
  secondNumber,
  tenant
) => {
  // const licenseFinancialYear = get(
  //   state,
  //   "screenConfiguration.preparedFinalObject.Licenses[0].financialYear"
  // );
  // const financialYearText = licenseFinancialYear
  //   ? `(${licenseFinancialYear})`
  //   : "";
  // if (purpose === "apply" && status === "success") {
  receiptNumber = "TL-JLD-2018-09-123434";
  return {
    header: getCommonHeader({
      labelName: `new colllection`,
      labelKey: "UC_NEW_COLLECTION_CC"
      // dynamicArray: [financialYearText]
    }),
    applicationSuccessCard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          position: "absolute",
          width: "95%"
        }
      },
      children: {
        card: acknowledgementCard({
          icon: "done",
          backgroundColor: "#39CB74",
          header: {
            labelName: "Payment has been collected successfully!",
            labelKey: "UC_PAYMENT_COLLECTED_SUCCESS_MESSAGE_MAIN"
          },
          body: {
            labelName:
              "A notification regarding Payment Collection has been sent to the consumer at registered Mobile No.",
            labelKey: "UCPAYMENT_SUCCESS_MESSAGE_SUB"
          },
          tailText: {
            labelName: "payment receipt no.",
            labelKey: "UC_PAYMENT_NO_LABEL"
          },
          number: receiptNumber
        })
      }
    },
    iframeForPdf: {
      uiFramework: "custom-atoms",
      componentPath: "Div"
    },
    applicationSuccessFooter: acknowledgementFooter
  };
};
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
export const acknowledgementFooter = getCommonApplyFooter({
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
        labelName: "VIEW RECEIPT",
        labelKey: "UC_BUTTON_VIEW_RECEIPT"
      })
    }
    // onClickDefination: {
    //     action: "page_change",
    //     path: redirectionURL
    // }
  }
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const purpose = getQueryArg(window.location.href, "purpose");
    const status = getQueryArg(window.location.href, "status");
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const secondNumber = getQueryArg(window.location.href, "secondNumber");
    const tenant = getQueryArg(window.location.href, "tenantId");
    const data = getAcknowledgementCard(
      state,
      dispatch,
      purpose,
      status,
      applicationNumber,
      secondNumber,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;

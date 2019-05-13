import {
  getCommonHeader,
  //getCommonCard,
  //getCommonParagraph,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  acknowledgementSuccesFooter,
  acknowledgementFailureFooter
} from "./acknowledgementResource/acknowledgementFooter";
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
  receiptNumber = "TL-JLD-2018-09-123434";
  if (purpose === "pay" && status === "success") {
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
      applicationSuccessFooter: acknowledgementSuccesFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      // header: getCommonContainer({
      header: getCommonHeader({
        labelName: `new collection`,
        // dynamicArray: [financialYearText],
        labelKey: "UC_NEW_COLLECTION"
      }),
      // applicationNumber: {
      //   uiFramework: "custom-atoms-local",
      //   moduleName: "egov-uc",
      //   componentPath: "ApplicationNoContainer",
      //   props: {
      //     number: applicationNumber
      //   }
      // }
      // }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Payment Collection failed!",
              labelKey: "UC_PAYMENT_FAILED"
            },
            body: {
              labelName: "Payment Collection has been failed!",
              labelKey: "UC_PAYMENT_NOTIFICATION"
            }
          })
        }
      },
      paymentFailureFooter: acknowledgementFailureFooter
    };
  }
};

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

// egov-ui-framework/uc/acknowledgement?purpose=pay&status=success

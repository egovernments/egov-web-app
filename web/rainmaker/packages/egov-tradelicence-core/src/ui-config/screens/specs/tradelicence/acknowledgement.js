import {
  getCommonHeader,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";
import { paymentSuccessFooter } from "./acknowledgementResource/paymentSuccessFooter";
import { approvalSuccessFooter } from "./acknowledgementResource/approvalSuccessFooter";
import { gotoHomeFooter } from "./acknowledgementResource/gotoHomeFooter";
import { paymentFailureFooter } from "./acknowledgementResource/paymentFailureFooter";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { loadReceiptGenerationData } from "../utils/receiptTransformer";
import set from "lodash/set";
import { getCurrentFinancialYear } from "../utils";

const getAcknowledgementCard = (
  state,
  dispatch,
  purpose,
  status,
  applicationNumber,
  secondNumber,
  tenant
) => {
  if (purpose === "apply" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: `Application for New Trade License (${getCurrentFinancialYear()})`
        // labelKey: "TL_COMMON_APPL_NEW_LIC"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName:
                "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: applicationSuccessFooter(
        state,
        dispatch,
        applicationNumber,
        tenant
      )
    };
  } else if (purpose === "pay" && status === "success") {
    loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: `Payment for New Trade License (${getCurrentFinancialYear()})`
          // labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "TL_CONFIRMATION_MESSAGE_MAIN"
            },
            body: {
              labelName:
                "A notification regarding Payment Collection has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_CONFIRMATION_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "TL_PMT_RCPT_NO"
            },
            number: secondNumber
          })
        }
      },
      paymentSuccessFooter: paymentSuccessFooter()
    };
  } else if (purpose === "approve" && status === "success") {
    loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: `Trade License Application (${getCurrentFinancialYear()})`
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Trade License Approved Successfully",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName:
                "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: `Trade License Application (${getCurrentFinancialYear()})`
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Application Rejected",
              labelKey: "TL_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName:
                "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_REJ_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: `Trade License Application (${getCurrentFinancialYear()})`
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Cancelled",
              labelKey: "TL_TL_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName:
                "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_TL_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: `Trade License Application (${getCurrentFinancialYear()})`
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: "Payment has failed!",
            body:
              "A notification regarding payment failure has been sent to the trade owner and applicant."
          })
        }
      },
      paymentFailureFooter: paymentFailureFooter(applicationNumber, tenant)
    };
  } else if (purpose === "mark" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: `Application for Trade License (${getCurrentFinancialYear()})`
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Marked Successfully",
              labelKey: "TL_MARK_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "TL_APPLICATION_MARKED_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: `Application for Trade License (${getCurrentFinancialYear()})`
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: "TL_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "TL_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
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

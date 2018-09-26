import {
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";
import { paymentSuccessFooter } from "./acknowledgementResource/paymentSuccessFooter";
import { approvalSuccessFooter } from "./acknowledgementResource/approvalSuccessFooter";
import { gotoHomeFooter } from "./acknowledgementResource/gotoHomeFooter";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { tradeReviewDetails } from "./applyResource/tradeReviewDetails";

const purpose = getQueryArg(window.location.href, "purpose");
const status = getQueryArg(window.location.href, "status");
const number = getQueryArg(window.location.href, "number");

const getAcknowledgementCard = (purpose, status, number) => {
  if (purpose === "apply" && status === "success") {
    return {
      header: getCommonHeader("Application for New Trade License (2018-2019)"),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: "Application Submitted Successfully",
            body:
              "A copy of application confirmation has been sent to trade owner at registered Mobile No.",
            tailText: "Application No.",
            number: number
          }),
          tradeReviewDetails: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            children: {
              tradeReviewDetails
            },
            props: {
              style: {
                display: "none"
              }
            }
          }
        }
      },
      applicationSuccessFooter
    };
  } else if (purpose === "pay" && status === "success") {
    return {
      header: getCommonContainer({
        header: getCommonHeader("Payment for New Trade License (2018-2019)"),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: 5434
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
            header: "Payment has been collected successfully!",
            body:
              "A copy of receipt has been sent to trade owner at registered Mobile No.",
            tailText: "Payment Receipt No.",
            number: number
          })
        }
      },
      paymentSuccessFooter
    };
  } else if (purpose === "approve" && status === "success") {
    return {
      header: getCommonContainer({
        header: getCommonHeader("Trade License Application (2018-2019)"),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: 5434
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
            header: "Trade License Approved Successfully",
            body:
              "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
            tailText: "Trade License No.",
            number: number
          })
        }
      },
      approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getCommonContainer({
        header: getCommonHeader("Trade License Application (2018-2019)"),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: 5434
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
            header: "Trade License Application Rejected",
            body:
              "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No."
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: getCommonContainer({
        header: getCommonHeader("Trade License Application (2018-2019)"),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: 5434
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
            header: "Trade License Cancelled",
            body:
              "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
            tailText: "Trade License No.",
            number: number
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
      },
      children: getAcknowledgementCard(purpose, status, number)
    }
  }
};

export default screenConfig;

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
import {
  loadUlbLogo,
  loadApplicationData,
  loadReceiptData,
  loadMdmsData
} from "../utils/receiptTransformer";
import set from "lodash/set";

/** Data used for creation of receipt is generated and stored in local storage here */
const loadReceiptGenerationData = (applicationNumber, tenant) => {
  /** Logo loaded and stored in local storage in base64 */
  loadUlbLogo(tenant);
  loadApplicationData(applicationNumber); //PB-TL-2018-09-27-000004
  loadReceiptData(applicationNumber); //PT-107-001330:AS-2018-08-29-001426
  loadMdmsData(tenant);
};

// const suggestions = [
//   { label: "Afghanistan" },
//   { label: "Aland Islands" },
//   { label: "Albania" },
//   { label: "Algeria" },
//   { label: "American Samoa" },
//   { label: "Andorra" },
//   { label: "Angola" },
//   { label: "Anguilla" },
//   { label: "Antarctica" },
//   { label: "Antigua and Barbuda" },
//   { label: "Argentina" },
//   { label: "Armenia" },
//   { label: "Aruba" },
//   { label: "Australia" },
//   { label: "Austria" },
//   { label: "Azerbaijan" },
//   { label: "Bahamas" },
//   { label: "Bahrain" },
//   { label: "Bangladesh" },
//   { label: "Barbados" },
//   { label: "Belarus" },
//   { label: "Belgium" },
//   { label: "Belize" },
//   { label: "Benin" },
//   { label: "Bermuda" },
//   { label: "Bhutan" },
//   { label: "Bolivia, Plurinational State of" },
//   { label: "Bonaire, Sint Eustatius and Saba" },
//   { label: "Bosnia and Herzegovina" },
//   { label: "Botswana" },
//   { label: "Bouvet Island" },
//   { label: "Brazil" },
//   { label: "British Indian Ocean Territory" },
//   { label: "Brunei Darussalam" }
// ];

const getAcknowledgementCard = (
  purpose,
  status,
  applicationNumber,
  tlNumber,
  tenant
) => {
  if (purpose === "apply" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: "Application for New Trade License (2018-2019)",
        labelKey: "TL_COMMON_APPL_NEW_LIC"
      }),
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
            number: applicationNumber
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
      applicationSuccessFooter: applicationSuccessFooter(
        applicationNumber,
        tenant
      )
    };
  } else if (purpose === "pay" && status === "success") {
    loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Payment for New Trade License (2018-2019)",
          labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
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
            header: "Payment has been collected successfully!",
            body:
              "A copy of receipt has been sent to trade owner at registered Mobile No.",
            tailText: "Payment Receipt No.",
            number: tlNumber
          })
        }
      },
      paymentSuccessFooter
    };
  } else if (purpose === "approve" && status === "success") {
    loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Trade License Application (2018-2019)",
          labelKey: "TL_TRADE_APPLICATION"
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
            header: "Trade License Approved Successfully",
            body:
              "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
            tailText: !tlNumber || tlNumber === null ? "Trade License No." : "",
            number: !tlNumber || tlNumber === null ? tlNumber : ""
          })
        }
      },
      approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Trade License Application (2018-2019)",
          labelKey: "TL_TRADE_APPLICATION"
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
        header: getCommonHeader({
          labelName: "Trade License Application (2018-2019)",
          labelKey: "TL_TRADE_APPLICATION"
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
            header: "Trade License Cancelled",
            body:
              "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
            tailText: "Trade License No.",
            number: tlNumber
          })
        }
      },
      // asdasdasd: {
      //   uiFramework: "custom-atoms-local",
      //   componentPath: "AutoSuggest",
      //   props: {
      //     suggestions: suggestions,
      //     label: "Mohalla",
      //     placeholder: "Select Mohalla",
      //     fullwidth: false,
      //     required: true,
      //     inputLabelProps: {
      //       shrink: true
      //     }
      //   }
      // },
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
    const number = getQueryArg(window.location.href, "applicationNumber");
    const tlNumber = getQueryArg(window.location.href, "tlNumber");
    const tenant = getQueryArg(window.location.href, "tenantId");
    const data = getAcknowledgementCard(
      purpose,
      status,
      number,
      tlNumber,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;

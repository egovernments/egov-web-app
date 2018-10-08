import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getCommonGrayCard,
  getCommonContainer,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard, getHeaderSideText } from "../utils";
import { footerReview } from "./applyResource/footer";
import { getReviewTrade } from "./applyResource//review-trade";
import { getReviewOwner } from "./applyResource//review-owner";
import { getReviewDocuments } from "./applyResource//review-documents";
import { getApprovalDetails } from "./applyResource/approval-rejection-details";
import { getCancelDetails } from "./applyResource/cancel-details";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { getSearchResults } from "../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import store from "ui-redux/store"
import { getBill } from "../utils";

const role = getQueryArg(window.location.href, "role");
const status = getQueryArg(window.location.href, "status");

const applicationNumber = getQueryArg(
  window.location.href,
  "applicationNumber"
);
let headerSideText = "";

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
    const extraData = ["Rebate", "Penalty"].map(item => {
      return {
        name: {
          labelName: item,
          labelKey: item
        },
        value: null,
        info: {
          labelName: `Information about ${item}`,
          labelKey: `Information about ${item}`
        }
      };
    });
    const { billAccountDetails } = Bill[0].billDetails[0];
    const transformedData = billAccountDetails.map(item => {
      return {
        name: {
          labelName: item.purpose,
          labelKey: item.taxHeadCode
        },
        value: getTaxValue(item),
        info: {
          labelName: `Information about ${item.purpose}`,
          labelKey: `Information about ${item.taxHeadCode}`
        }
      };
    });
    return [...transformedData, ...extraData];
  }
};

const searchResults = async (action, state, dispatch) => {
  let queryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: applicationNumber }
  ];
  let payload = await getSearchResults(queryObject);

  headerSideText = getHeaderSideText(
    get(payload, "Licenses[0].status"),
    get(payload, "Licenses[0].licenseNumber")
  );
  set(payload, "Licenses[0].headerSideText", headerSideText);
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  const LicenseData = payload.Licenses[0];
  const applicationNo = get(LicenseData, "applicationNumber");
  const tenantId = get(LicenseData, "tenantId");
  const businessService = "TL";
  const queryObj = [
    { key: "tenantId", value: tenantId },
    {
      key: "consumerCode",
      value: applicationNo
    },
    {
      key: "businessService",
      value: businessService
    }
  ];
  payload = await getBill(queryObj);
  const estimateData = getEstimateData(payload.Bill);
  dispatch(
    prepareFinalObject("LicensesTemp[0].estimateCardData", estimateData)
  );
};
// console.log(
//   "1234...",
//   get(JSON.parse(get(localStorage, "user-info")), "roles")
// );

// const r = [
//   {
//     id: 231,
//     code: "EMPLOYEE",
//     name: "Employee"
//   },
//   {
//     id: 2314,
//     code: "EMPLOYEE1",
//     name: "Employee1"
//   }
// ];

// const l = r.map(a => {
//   return get(a, "code");
// });
// console.log("2345...", l);

// const arr = ["emp", "EMPLOYEE2"];

// let found = arr.some(i => l.includes(i));
// console.log("3456...", found);

console.log("1234...", get(localStorage, "user-info.roles"));

let titleText = "";
let paraText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard.";
let titleVisibility = false;
let paraVisibiliy = false;
let approvalDetailsVisibility = false;
let cancelDetailsVisibility = false;

switch (status) {
  case "approved": {
    approvalDetailsVisibility = true;
    if (role === "approver") {
      titleText = "Please Review the Trade License";
      titleVisibility = true;
    }
    break;
  }
  case "pending_payment": {
    titleText = "Please Review the Application and Proceed with Payment";
    titleVisibility = true;
    break;
  }
  case "pending_approval": {
    if (role === "approver") {
      titleText = "Please Review the Application and Proceed with Approval";
      titleVisibility = true;
      paraText =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard.";
      paraVisibiliy = true;
    }
    break;
  }
  case "cancelled": {
    cancelDetailsVisibility = true;
    break;
  }
  default:
    break;
}

const footer = footerReview(role, status);
const headerrow = getCommonContainer({
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
});

// const estimate = getCommonGrayCard({
//   estimateSection: getFeesEstimateCard(
//     "Trade License Fee",
//     [
//       { name: "Trade License Charge" },
//       { name: "Penalty", value: 500 },
//       { name: "Rebate", value: 200 }
//     ],
//     [
//       { textLeft: "Receipt No.", textRight: "3456" },
//       {
//         textLeft: "Paid By:",
//         textRight: "Satinder Singh"
//       },
//       { textLeft: "Paid On", textRight: "31 Aug 2018" },
//       { textLeft: "Payment Mode", textRight: "Cash" }
//     ]
//   )
// });

const estimate = getCommonGrayCard({
  estimateSection: getFeesEstimateCard()
});

const reviewTradeDetails = getReviewTrade(false);

const reviewOwnerDetails = getReviewOwner(false);

const reviewDocumentDetails = getReviewDocuments(false);

let approvalDetails = getApprovalDetails();
let cancelDetails = getCancelDetails();
let title = getCommonTitle({ labelName: titleText });
let paragraph = getCommonParagraph({ labelName: paraText });

title = { ...title, visible: titleVisibility };
paragraph = { ...paragraph, visible: paraVisibiliy };
cancelDetails = { ...cancelDetails, visible: cancelDetailsVisibility };
approvalDetails = { ...approvalDetails, visible: approvalDetailsVisibility };

export const tradeReviewDetails = getCommonCard({
  title,
  paragraph,
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails,
  approvalDetails,
  cancelDetails
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    if (applicationNumber) {
      searchResults(action, state, dispatch);
    }
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
              ...headerrow
            },
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary"
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              },
              children: {
                buttonLabel: getCommonTitle({
                  jsonPath: "Licenses[0].headerSideText"
                })
              }
            }
          }
        },
        tradeReviewDetails,
        footer
      }
    }
  }
};

export default screenConfig;

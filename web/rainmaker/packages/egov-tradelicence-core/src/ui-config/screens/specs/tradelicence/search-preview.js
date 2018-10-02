import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getCommonGrayCard,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard } from "../utils";
import { footerReview } from "./applyResource/footer";
import { getReviewTrade } from "./applyResource//review-trade";
import { getReviewOwner } from "./applyResource//review-owner";
import { getReviewDocuments } from "./applyResource//review-documents";
import { getApprovalDetails } from "./applyResource/approval-rejection-details";
import { getCancelDetails } from "./applyResource/cancel-details";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const role = getQueryArg(window.location.href, "role");
const status = getQueryArg(window.location.href, "status");

let headerSideText = "";
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
    headerSideText = "Trade License No: 3444";
    if (role === "approver") {
      titleText = "Please Review the Trade License";
      titleVisibility = true;
    }
    break;
  }
  case "pending_payment": {
    titleText = "Please Review the Application and Proceed with Payment";
    titleVisibility = true;
    headerSideText = "Status: Pending Payment";
    break;
  }
  case "pending_approval": {
    headerSideText = "Status: Pending Approval";
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
    headerSideText = "Trade License No: 3444";
    break;
  }
  default:
    break;
}

const footer = footerReview(role, status);
const headerrow = getCommonContainer({
  header: getCommonHeader("Trade License Application (2018-2019)"),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const estimate = getCommonGrayCard({
  estimateSection: getFeesEstimateCard(
    "Trade License Fee",
    [
      { name: "Trade License Charge" },
      { name: "Penalty", value: 500 },
      { name: "Rebate", value: 200 }
    ],
    [
      { textLeft: "Receipt No.", textRight: "3456" },
      {
        textLeft: "Paid By:",
        textRight: "Satinder Singh"
      },
      { textLeft: "Paid On", textRight: "31 Aug 2018" },
      { textLeft: "Payment Mode", textRight: "Cash" }
    ]
  )
});

const reviewTradeDetails = getReviewTrade(false);

const reviewOwnerDetails = getReviewOwner(false);

const reviewDocumentDetails = getReviewDocuments(false);

let approvalDetails = getApprovalDetails();
let cancelDetails = getCancelDetails();
let title = getCommonTitle(titleText);
let paragraph = getCommonParagraph(paraText);

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
  name: "searchPreview",
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
            header1: {
              gridDefination: {
                xs: 12,
                sm: 9
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
                sm: 3,
                align: "right"
              },
              children: {
                buttonLabel: getCommonTitle(headerSideText)
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

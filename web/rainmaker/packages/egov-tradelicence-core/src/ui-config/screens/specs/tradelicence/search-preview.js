import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getLabel,
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getDivider,
  getLabelWithValue
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard } from "../utils";
import { footerReview } from "./applyResource/footer";
import { getReviewTrade } from "./applyResource//review-trade";
import { getReviewOwner } from "./applyResource//review-owner";
import { getReviewDocuments } from "./applyResource//review-documents";
import { getApprovalDetails } from "./applyResource/approval-rejection-details";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const role = getQueryArg(window.location.href, "role");
const purpose = getQueryArg(window.location.href, "purpose");

const header = getCommonContainer({
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

const approvalDetails = getApprovalDetails();

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle(
    "Please review the Application and Proceed with Approval"
  ),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails,
  approvalDetails
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
                xs: "12",
                sm: "9"
              },
              ...header
            },
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary"
              },
              gridDefination: {
                xs: "12",
                sm: "3",
                align: "right"
              },
              children: {
                buttonLabel: getCommonTitle("Status: Pending Approval ")
              }
            }
          }
        },
        tradeReviewDetails,
        footerReview
      }
    }
  }
};

export default screenConfig;

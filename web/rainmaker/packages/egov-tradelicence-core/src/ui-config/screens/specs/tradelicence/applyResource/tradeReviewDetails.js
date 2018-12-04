import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard, getDialogButton } from "../../utils";

import { getReviewTrade } from "./review-trade";
import { getReviewOwner } from "./review-owner";
import { getReviewDocuments } from "./review-documents";

const estimate = getCommonGrayCard({
  estimateSection: getFeesEstimateCard({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

const reviewTradeDetails = getReviewTrade();

const reviewOwnerDetails = getReviewOwner();

const reviewDocumentDetails = getReviewDocuments();

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please review your Application and Submit",
    labelKey: "TL_SUMMARY_HEADER"
  }),
  // paragraph: getCommonParagraph({
  //   labelName:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  // }),
  estimate,
  viewBreakupButton: getDialogButton(
    "VIEW BREAKUP",
    "TL_PAYMENT_VIEW_BREAKUP",
    "apply"
  ),
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails
});

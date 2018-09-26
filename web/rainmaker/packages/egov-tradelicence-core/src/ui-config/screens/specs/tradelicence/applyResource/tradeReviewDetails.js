import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonParagraph
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard } from "../../utils";

import { getReviewTrade } from "./review-trade";
import { getReviewOwner } from "./review-owner";
import { getReviewDocuments } from "./review-documents";

const estimate = getCommonGrayCard({
  estimateSection: getFeesEstimateCard(
    "Trade License Fee",
    [
      { name: "Trade License Charge" },
      { name: "Penalty", value: 500, info: "Information about Penalty" },
      { name: "Rebate", value: 200, info: "Information about Rebate" }
    ],
    [
      { textLeft: "Last Date for Rebate (20% of TL)" },
      {
        textLeft: "Penalty (10% of TL) applicable from"
      },
      { textLeft: "Additoinal Penalty (20% of TL) applicable from" }
    ]
  )
});

const reviewTradeDetails = getReviewTrade();

const reviewOwnerDetails = getReviewOwner();

const reviewDocumentDetails = getReviewDocuments();

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle("Please review your Application and Submit"),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails
});

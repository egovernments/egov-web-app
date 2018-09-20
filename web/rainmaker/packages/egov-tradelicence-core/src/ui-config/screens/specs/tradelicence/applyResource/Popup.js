import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectTextField,
    getCommonContainer,
    getCommonSubHeader
  } from "mihy-ui-framework/ui-config/screens/specs/utils";
  
  export const Popup = getCommonCard(
    {
        adhocPenaltyAndRebateCard:getCommonCard({
        header: getCommonTitle("Add Adhoc Penalty/Rebate")},
        {
            style: 
            {
              boxShadow: "none",
              borderRadius: 0
            }
        }),
        adhocPenaltyCard:getCommonCard(
        {
          subheader:getCommonSubHeader("Adhoc Penalty"),
          penaltyAmountAndReasonContainer: getCommonContainer(
          {
            penaltyAmount: getTextField
            (
              "Adhoc Penalty Amount",
              "Enter Adhoc Charge Amount",
              false,
              ""
            ),
      
            penaltyReason: getSelectTextField("Reason for Adhoc Penalty", "Others", false, "")}),
            commentsField: getTextField(
              "Enter Comments",
              "Enter Comments",
              false,
              "",
              "",
                {},
                {
                  xs: 12,
                  sm: 12
                }
            )},
        {
          style: 
          {
            boxShadow: "none",
            borderRadius: 0
          }
        }),

      adhocRebateCard:getCommonCard({
      subHeader:getCommonSubHeader("Adhoc Rebate"),
      rebateAmountAndReasonContainer: getCommonContainer({
      rebateAmount: getTextField(
        "Adhoc Rebate Amount",
        "Enter Adhoc Rebate Amount",
        false,
        ""
      ),
      rebateReason: getSelectTextField("Reason for Adhoc Rebate", "Select Reason for Adhoc Rebate", false, ""),
      })},{
        style: {
          boxShadow: "none",
          borderRadius: 0
        }
      })
  });
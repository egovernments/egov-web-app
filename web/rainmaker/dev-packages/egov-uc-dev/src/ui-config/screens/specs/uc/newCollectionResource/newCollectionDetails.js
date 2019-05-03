import {
    getCommonCard,
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getDateField,
    getCommonTitle
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

  const hasButton = getQueryArg(window.location.href, "hasButton");
  //const hasApproval = getQueryArg(window.location.href, "hasApproval");
  let enableButton = true;
  //enableInbox = hasApproval && hasApproval === "false" ? false : true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  export const newCollectionDetailsCard = getCommonCard({
    // header: getCommonTitle(
    //   {
    //     labelName: "Trade Details",
    //     labelKey: "TL_NEW_TRADE_DETAILS_PROV_DET_HEADER"
    //   },
    //   {
    //     style: {
    //       marginBottom: 18
    //     }
    //   }
    // ),
    searchContainer: getCommonContainer({
        ConsumerMobileNo: getTextField({
            label: {
              labelName: " Consumer Mobile No",
              labelKey: "CONS_MOBILE_NO_LABEL"
            },
            placeholder: {
              labelName: "Enter Consumer Mobile No",
              labelKey: "CONS_MOBILE_NO_LABEL_PLACEHOLDER"
            },
            
            required: true,
            visible: true,
            pattern: getPattern("ConsumerMobileNo"),
            errorMessage: "Invalid Mobile No.",
            jsonPath: "searchScreen.ConsumerMobileNo"
          }),
          ConsumerName: getTextField({
            label: {
              labelName: " Consumer Name",
              labelKey: "CONS_NAME_LABEL"
            },
            placeholder: {
              labelName: "Enter Consumer  Name",
              labelKey: "CONS_NAME_LABEL_PLACEHOLDER"
            },
            
            required: true,
            visible: true,
            pattern: getPattern("ConsumerName"),
            errorMessage: "Invalid Name.",
            jsonPath: "searchScreen.ConsumerName"
          }),
        serviceCategory: getSelectField({
            label: {
              labelName: "serviceCategory",
              labelKey: "UC_SERVICE_CATEGORY_LABEL"
            },
            placeholder: {
              labelName: "Select service Category ",
              labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
            },
            required: true,
            visible: true,
            jsonPath: "searchScreen.serviceCategory",
            // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
            gridDefination: {
              xs: 12,
              sm: 6
            },
            data: [
              {
                code: "cydycyc"
              },
              {
                code: "chdfhvugb"
              },
              {
                code: "chdfhvugb"
              },
              {
                code: "chdfhvugb"
              },
              {
                code: "chdfhvugb"
              }
            ]
          }),
          
          serviceType: getSelectField({
            label: {
              labelName: "Service Type",
              labelKey: "UC_SERVICE_TYPE_LABEL"
            },
            placeholder: {
              labelName: "Select Service Type",
              labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
            },
            required: true,
            visible: true,
            jsonPath: "searchScreen. serviceType",
            gridDefination: {
              xs: 12,
              sm: 6
            },
            data: [
              {
                code: "huhuh"
              },
              {
                code: "tatatas"
              }
            ]
          }),
          fromDate: getDateField({
            label: {
              labelName: "Select from Date",
              labelKey: "UC_FROM_DATE_LABEL"
            },
            placeholder: {
              labelName: "Enter from Date",
              labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
            },
            gridDefination: {
              xs: 12,
              sm: 6
            },
            required: true,
            pattern: getPattern("Date"),
            jsonPath: "Licenses[0]. fromDate"
          }),
          toDate: getDateField({
            label: {
              labelName: "Select to Date",
              labelKey: "UC_TO_DATE_LABEL"
            },
            placeholder: {
              labelName: "Enter to Date",
              labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
            },
            gridDefination: {
              xs: 12,
              sm: 6
            },
            required: true,
            pattern: getPattern("Date"),
            jsonPath: "Licenses[0]. toDate"
          }),
    
          amountTobeCancelled : getTextField({
            label: {
              labelName: "Amount To Be Cancelled",
              labelKey: "UC_AMOUNT_TO_BE_CANCELLED_LABEL"
            },
            placeholder: {
              labelName: "Amount To be Cancelled ",
              labelKey: "UC_AMOUNT_TO_BE_CANCELLED_PLACEHOLDER"
            },
           
            required: false,
            pattern: getPattern("amountTobeCancelled"),
            errorMessage: "Invalid Amount",
            jsonPath: "searchScreen.amountTobeCancelled"
          }),
          fieldCollectionFee: getTextField({
            label: {
              labelName: "Field Collection Fee",
              labelKey: "UC_FIELD_COLLECTION_FEE_LABEL"
            },
            placeholder: {
              labelName: "field Collection Fee ",
              labelKey: "UC_FIELD_COLLECTION_FEE_PLACEHOLDER"
            },
            
            jsonPath: "searchScreen.fieldCollectionFee"
          }),
          comment: getTextField({
            label: {
              labelName: "comment",
              labelKey: "UC_COMMENT_LABEL"
            },
            placeholder: {
              labelName: "comment ",
              labelKey: "UC_COMMENT_PLACEHOLDER"
            },
           
            Required:false,
            jsonPath: "searchScreen.comment"
          })
            }),
      });
 
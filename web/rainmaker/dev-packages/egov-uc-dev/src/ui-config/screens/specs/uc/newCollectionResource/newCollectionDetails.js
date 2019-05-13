import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getDateField
  // getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { convertDateToEpoch } from "../../utils";
import {
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";

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
        labelName: " consumer Mobile No",
        labelKey: "UC_CONS_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Mobile No",
        labelKey: "UC_CONS_MOBILE_NO_LABEL_PLACEHOLDER"
      },

      required: true,
      visible: true,
      pattern: getPattern("consumerMobileNo"),
      errorMessage: "Invalid Mobile No.",
      jsonPath: "Demands[0].mobileNo"
    }),
    ConsumerName: getTextField({
      label: {
        labelName: " consumer Name",
        labelKey: "UC_CONS_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer  Name",
        labelKey: "UC_CONS_NAME_LABEL_PLACEHOLDER"
      },

      required: true,
      visible: true,
      pattern: getPattern("consumerName"),
      errorMessage: "Invalid Name.",
      jsonPath: "Demands[0].consumerName"
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
      jsonPath: "Demands[0].consumerType",
      // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      data: [
        {
          code: "tradelicense"
        }
        // {
        //   code: "chdfhvugb"
        // },
        // {
        //   code: "chdfhvugb"
        // },
        // {
        //   code: "chdfhvugb"
        // },
        // {
        //   code: "chdfhvugb"
        // }
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
      jsonPath: "Demands[0].businessService",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      data: [
        {
          code: "PT"
        },
        {
          code: "TL"
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
      jsonPath: "Demands[0].taxPeriodFrom"
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
      jsonPath: "Demands[0].taxPeriodTo"
    }),

    amountTobeCollected: getTextField({
      label: {
        labelName: "Amount To Be Collected",
        labelKey: "UC_AMOUNT_TO_BE_ COLLECTED_LABEL"
      },
      placeholder: {
        labelName: "Enter Amount To be Collected ",
        labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
      },

      required: false,
      pattern: getPattern("amountTobeCollected"),
      errorMessage: "Invalid Amount",
      jsonPath: "Demands[0].demandDetails[0].taxAmount"
    }),
    fieldCollectionFee: getTextField({
      label: {
        labelName: "Field Collection Fee",
        labelKey: "UC_FIELD_COLLECTION_FEE_LABEL"
      },
      placeholder: {
        labelName: "Enter Field Collection Fee ",
        labelKey: "UC_FIELD_COLLECTION_FEE_PLACEHOLDER"
      },

      jsonPath: "Demands[0].demandDetails[0].collectionAmount"
    }),
    comment: getTextField({
      label: {
        labelName: "Comment",
        labelKey: "UC_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comment ",
        labelKey: "UC_COMMENT_PLACEHOLDER"
      },

      Required: false,
      jsonPath: "Demands[0].demandDetails[0].comment"
    })
  })
});

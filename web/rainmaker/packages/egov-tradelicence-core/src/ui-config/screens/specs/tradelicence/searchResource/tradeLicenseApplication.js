import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getPattern,
  getDateField,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { searchApiCall } from "./functions";

export const tradeLicenseApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Trade License Application",
    labelKey: "TL_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName:
      "Please provide at least one parameter to search for an application",
    labelKey: "TL_HOME_SEARCH_RESULTS_DESC"
  }),
  appTradeAndMobNumContainer: getCommonContainer({
    applicationNo: getTextField({
      label: {
        labelName: "Application No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Application No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: "",
      jsonPath: "searchScreen.applicationNumber"
    }),

    tradeLicenseNo: getTextField({
      label: {
        labelName: "Trade License No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Trade License No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: "",
      jsonPath: "searchScreen.licenseNumber"
    }),
    ownerMobNo: getTextField({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: getPattern("MobileNo"),
      jsonPath: "searchScreen.mobileNumber"
    })
  }),
  appStatusAndToFromDateContainer: getCommonContainer({
    applicationNo: getSelectField({
      label: { labelName: "Application status" },
      placeholder: { labelName: "Select Application Status" },
      required: false,
      jsonPath: "searchScreen.status",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [
        {
          code: "INITIATED"
        },
        {
          code: "APPLIED"
        },
        {
          code: "PAID"
        },
        {
          code: "APPROVED"
        },
        {
          code: "REJECTED"
        },
        {
          code: "CANCELLED"
        }
      ]
    }),

    fromDate: getDateField({
      label: { labelName: "From Date" },
      placeholder: { labelName: "From Date" },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      required: false
    }),

    toDate: getDateField({
      label: { labelName: "To Date" },
      placeholder: { labelName: "To Date" },
      jsonPath: "searchScreen.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      required: false
    })
  }),

  buttonContainer: getCommonContainer({
    searchButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 12,
        align: "center"
      },
      props: {
        variant: "contained",
        style: {
          color: "white",

          backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
          borderRadius: "2px",
          width: "280px",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "Search",
          labelKey: "TL_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: searchApiCall
      }
    }
  })
});

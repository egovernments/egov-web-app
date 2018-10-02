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
  subHeader: getCommonTitle("Search Trade License Application"),
  subParagraph: getCommonParagraph(
    "Please provide at least one parameter to search for an application"
  ),
  appTradeAndMobNumContainer: getCommonContainer({
    applicationNo: getTextField(
      {
        labelName: "Application No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      {
        labelName: "Enter Application No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      false,
      "",
      "searchScreen.applicationNumber",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),
    tradeLicenseNo: getTextField(
      {
        labelName: "Trade License No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      {
        labelName: "Enter Trade License No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      false,
      "",
      "searchScreen.licenseNumber",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),
    ownerMobNo: getTextField(
      {
        labelName: "Owner Mobile No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      {
        labelName: "Enter your mobile No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      false,
      getPattern("MobileNo"),
      "searchScreen.mobileNumber",
      {
        position: "start",
        label: "+91 |"
      },
      {
        xs: 12,
        sm: 4
      }
    )
  }),
  appStatusAndToFromDateContainer: getCommonContainer({
    applicationNo: getSelectField(
      "Application status",
      "Select Application Status",
      false,
      "",
      "searchScreen.status",
      "",
      [
        {
          code: "INITIATED"
        },
        {
          code: "APPLIED"
        },
        {
          code: "APPROVED"
        },
        {
          code: "PENDING APPROVAL"
        },
        {
          code: "PENDING PAYMENT"
        },
        {
          code: "PENDING APPLICATION"
        }
      ],
      "code",
      "code",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),
    fromDate: getDateField(
      "From Date",
      "From Date",
      false,
      getPattern("Date"),
      "",
      {},

      {
        xs: 12,
        sm: 4
      }
    ),
    toDate: getDateField(
      "To Date",
      "To date",
      false,
      getPattern("Date"),
      "",
      {},
      {
        xs: 12,
        sm: 4
      }
    )
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
        buttonLabel: getLabel("Search")
      },
      onClickDefination: {
        action: "condition",
        callBack: searchApiCall
      }
    }
  })
});

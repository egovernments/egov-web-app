import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getCommonParagraph,
  getPattern,
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
      "Application No.",
      "Enter Application No.",
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
      "Trade License No.",
      "Enter Trade License No.",
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
      "Owner Mobile No.",
      "Enter your mobile No.",
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
    applicationStatus: getSelectTextField(
      "Application status",
      "Select Application Status",
      false,
      "",
      "searchScreen.status",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),

    fromDate: getTextField(
      "From Date",
      "From Date",
      false,
      getPattern("Date"),
      "",
      {
        position: "end",
        iconName: "date_range"
      },

      {
        xs: 12,
        sm: 4
      }
    ),
    toDate: getTextField(
      "To Date",
      "To date",
      false,
      getPattern("Date"),
      "",
      {
        position: "end",
        iconName: "date_range"
      },
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
        xs: "12",
        sm: "12",
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

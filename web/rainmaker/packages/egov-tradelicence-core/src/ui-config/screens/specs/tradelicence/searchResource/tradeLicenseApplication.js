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
    applicationNo: getTextField(
      "Application status",
      "Select Application Status",
      false,
      "",
      "",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),
    // applicationStatus: getSelectTextField(
    //   "Application status",
    //   "Select Application Status",
    //   false,
    //   "",
    //   "searchScreen.status",
    //   {},
    //   {
    //     xs: 12,
    //     sm: 4
    //   }
    // ),
    // tradeLicenseType: {
    //   ...getSelectTextField(
    //     "Application status",
    //     "Select Application Status",
    //     false,
    //     "",
    //     "searchScreen.status",
    //     {},
    //     {
    //       xs: 12,
    //       sm: 4
    //     }
    //   ),
    //   children: {
    //     itemOne: {
    //       componentPath: "MenuItem",
    //       props: {
    //         value: "INITIATED"
    //       },
    //       children: {
    //         label: getLabel("INITIATED")
    //       }
    //     },
    //     itemTwo: {
    //       componentPath: "MenuItem",
    //       props: {
    //         value: "APPLIED"
    //       },
    //       children: {
    //         label: getLabel("APPLIED")
    //       }
    //     },
    //     itemThree: {
    //       componentPath: "MenuItem",
    //       props: {
    //         value: "APPROVED"
    //       },
    //       children: {
    //         label: getLabel("APPROVED")
    //       }
    //     },
    //     itemFour: {
    //       componentPath: "MenuItem",
    //       props: {
    //         value: "PENDING APPROVAL"
    //       },
    //       children: {
    //         label: getLabel("PENDING APPROVAL")
    //       }
    //     },
    //     itemFIVE: {
    //       componentPath: "MenuItem",
    //       props: {
    //         value: "PENDING PAYMENT"
    //       },
    //       children: {
    //         label: getLabel("PENDING PAYMENT")
    //       }
    //     }
    //     ,
    //     itemSIX: {
    //       componentPath: "MenuItem",
    //       props: {
    //         value: "PENDING APPLICATION"
    //       },
    //       children: {
    //         label: getLabel("PENDING APPLICATION")
    //       }
    //     }
    //   }
    // },
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

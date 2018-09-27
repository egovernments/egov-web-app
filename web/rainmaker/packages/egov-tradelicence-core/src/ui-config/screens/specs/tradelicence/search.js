import {
  getCommonHeader,
  getLabel,
  getBreak
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import React from "react";
import { tradeLicenseApplication } from "./searchResource/tradeLicenseApplication";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const hasButton = getQueryArg(window.location.href, "hasButton");
const hasApproval = getQueryArg(window.location.href, "hasApproval");
let enableInbox,
  enableButton = true;
enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader("Trade License");
const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
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
            header: {
              gridDefination: {
                xs: "12",
                sm: "6"
              },
              ...header
            },
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: "12",
                sm: "6",
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "36px"
                    }
                  }
                },

                buttonLabel: getLabel("NEW APPLICATION")
              },
              onClickDefination: {
                action: "page_change",
                path: "/landing/mihy-ui-framework/tradelicence/apply"
              }
            }
          }
        },
        divForPendingApprovals: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          visible: false,
          children: {
            breakPending: getBreak(),
            pendingApprovals: {
              uiFramework: "custom-molecules-local",
              componentPath: "Table",
              props: {
                data: [
                  {
                    "Application No": 1234,
                    "Trade Name": "Matchbox Plant",
                    "Owner Name": "Satinder Singh",
                    "Locality/Mohalla": "Gurudwara Mohalla",
                    "Payment Date": "12/08/2018",
                    "Days Elapsed": "2 Days"
                  },
                  {
                    "Application No": 1234,
                    "Trade Name": "Matchbox Plant",
                    "Owner Name": "Satinder Singh",
                    "Locality/Mohalla": "Railway Colony",
                    "Payment Date": "12/08/2018",
                    "Days Elapsed": "10 Days"
                  },
                  {
                    "Application No": 1234,
                    "Trade Name": "Matchbox Plant",
                    "Owner Name": "Satinder Singh",
                    "Locality/Mohalla": "Gurudwara Mohalla",
                    "Payment Date": "12/08/2018",
                    "Days Elapsed": "2 Days"
                  },
                  {
                    "Application No": 1234,
                    "Trade Name": "Matchbox Plant",
                    "Owner Name": "Satinder Singh",
                    "Locality/Mohalla": "Assi Mohalla",
                    "Payment Date": "12/08/2018",
                    "Days Elapsed": "2 Days"
                  }
                ],
                columns: {
                  "Application No": {},
                  "Trade Name": {},
                  "Owner Name": {},
                  "Locality/Mohalla": {},
                  "Payment Date": {},
                  "Days Elapsed": {
                    format: value => {
                      let color = "";
                      if (value.toLowerCase().indexOf("10") !== -1) {
                        color = "green";
                      } else if (value.toLowerCase().indexOf("2") !== -1) {
                        color = "red";
                      }
                      return (
                        <span
                          style={{
                            color: color,
                            fontSize: "14px",
                            fontWeight: 400
                          }}
                        >
                          {value}
                        </span>
                      );
                    }
                  }
                },
                title: "Pending for your Approval (4)",
                options: {
                  filterType: "dropdown",
                  responsive: "scroll",
                  selectableRows: false
                }
              }
            }
          }
        },
        tradeLicenseApplication,
        breakAfterSearch: getBreak(),
        searchResults: {
          uiFramework: "custom-molecules-local",
          componentPath: "Table",
          visible: false,
          props: {
            data: [],
            columns: {
              "Application No": {},
              "License No": {},
              "Trade Name": {},
              "Owner Name": {},
              "Application Date": {},
              Status: {
                format: value => {
                  let color = "";
                  if (value.toLowerCase().indexOf("approved") !== -1) {
                    color = "green";
                  } else if (value.toLowerCase().indexOf("pending") !== -1) {
                    color = "red";
                  } else if (value.toLowerCase().indexOf("initiated") !== -1) {
                    color = "orange";
                  } else if (value.toLowerCase().indexOf("applied") !== -1) {
                    color = "grey";
                  }
                  return (
                    <span
                      style={{
                        color: color,
                        fontSize: "14px",
                        fontWeight: 400
                      }}
                    >
                      {value}
                    </span>
                  );
                }
              }
            },
            title: "Search Results for Trade License Applications",
            options: {
              filterType: "dropdown",
              responsive: "scroll",
              selectableRows: false
            }
          }
        }
      }
    }
  }
};

export default tradeLicenseSearchAndResult;

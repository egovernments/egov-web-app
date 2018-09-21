import {
    getCommonHeader,
    getLabel,
  } from "mihy-ui-framework/ui-config/screens/specs/utils";
  import React from "react";
  import { tradeLicenseApplication } from "./searchResource/tradeLicenseApplication";

  const header = getCommonHeader("Trade License");

  const tradeLicenseSearchBox = {
    uiFramework: "material-ui",
    name: "search",
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css"
        },
        children:
        {
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
                    props:
                    {
                      iconName: "add",
                      style: {
                        fontSize: "36px"
                      }
                    }
                  },

                  buttonLabel: getLabel("NEW APPLICATION"),
                }
              }
            }
          },
          tradeLicenseApplication,
          searchResults: {
            uiFramework: "custom-molecules-local",
            componentPath: "Table",
            props:
            {
              data:[{
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Approved"
              },
              {
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Approved"
              },
              {
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Pending Approval"
              },
              {
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Pending Application"
              },
              {
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Approved"
              },
              {
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Approved"
              },
              {
                "Application No": 1234,
                "License No": 345,
                "Trade Name": "Name of the trade",
                "Owner Name": "Satinder Singh",
                "Application Date": "12/08/2018",
                Status: "Approved"
              },],
              columns:{
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
                    }
                    return (
                      <span style={{ color: color, fontSize: "14px", fontWeight: 400 }}>
                        {value}
                      </span>
                    );
                  }
                }
              },
              title:"Search Results for Trade License Applications (27)",
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

  export default tradeLicenseSearchBox;

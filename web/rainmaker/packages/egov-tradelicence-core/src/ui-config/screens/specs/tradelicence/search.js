import {
    getCommonHeader,
    getLabel
  } from "mihy-ui-framework/ui-config/screens/specs/utils";
  
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
          tradeLicenseApplication
  
        }
      }
    }
  
  };
  
  export default tradeLicenseSearchBox;
  
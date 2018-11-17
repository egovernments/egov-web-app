"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "mihyLoginScreen",
  components: {
    mihyLoginGrid: {
      componentPath: "Grid",
      children: {
        mihyEmptyRow: {
          componentPath: "Grid",
          props: {
            item: true,
            sm: 4
          }
        },
        mihyLoginItem: {
          componentPath: "Grid",
          props: {
            item: true,
            sm: 4,
            xs: 12
          },
          children: {
            mihyLoginCard: {
              componentPath: "Card",
              children: {
                mihyLoginCardContent: {
                  componentPath: "CardContent",
                  children: {
                    mihyLoginHeader: {
                      componentPath: "Typography",
                      children: {
                        "mihy-login-header-text": {
                          uiFramework: "custom-atoms",
                          componentPath: "Label",
                          props: {
                            label: "Login"
                          }
                        }
                      },
                      props: {
                        align: "center",
                        variant: "title"
                      }
                    },
                    mihyloginDiv: {
                      uiFramework: "custom-atoms",
                      componentPath: "Div",
                      props: {
                        className: "text-center"
                      },
                      children: {
                        mihyLoginUsername: {
                          componentPath: "TextField",
                          props: {
                            label: "Email",
                            margin: "normal",
                            fullWidth: true,
                            autoFocus: true,
                            required: true
                          },
                          required: true,
                          jsonPath: "body.mihy.username",
                          pattern: "^([a-zA-Z0-9@.])+$"
                          // gridDefination:{
                          //   xs:12,
                          //   sm:6
                          // }
                        },
                        mihyLoginPassword: {
                          componentPath: "TextField",
                          props: {
                            label: "Password",
                            type: "password",
                            margin: "normal",
                            fullWidth: true,
                            required: true
                          },
                          jsonPath: "body.mihy.password",
                          required: true,
                          pattern: "^([a-zA-Z0-9!])+$"
                        },
                        mihyBreakOne: {
                          uiFramework: "custom-atoms",
                          componentPath: "Break"
                        },
                        mihyBreakTwo: {
                          uiFramework: "custom-atoms",
                          componentPath: "Break"
                        },
                        mihyLoginButton: {
                          componentPath: "Button",
                          props: {
                            variant: "contained",
                            color: "primary",
                            fullWidth: true
                          },
                          children: {
                            mihyLoginButtonText: {
                              uiFramework: "custom-atoms",
                              componentPath: "Label",
                              props: {
                                label: "Login"
                              }
                            }
                          },
                          onClickDefination: {
                            action: "submit",
                            method: "get",
                            endPoint: "afbc.com",
                            purpose: "authLogin",
                            redirectionUrl: "/"
                          }
                        }
                      }
                    }
                  }
                }
              },
              props: { classes: { root: "container-margin" } }
            }
          }
        }
      },
      props: { container: true }
    }
  }
};

exports.default = screenConfig;
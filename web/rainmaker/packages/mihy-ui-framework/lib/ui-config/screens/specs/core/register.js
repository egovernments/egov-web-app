"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "mihyRegisterScreen",
  components: {
    mihyRegisterGrid: {
      componentPath: "Grid",
      children: {
        mihyEmptyRow: {
          componentPath: "Grid",
          props: {
            item: true,
            sm: 4
          }
        },
        mihyRegisterItem: {
          componentPath: "Grid",
          props: {
            item: true,
            sm: 4,
            xs: 12
          },
          children: {
            mihyRegisterCard: {
              componentPath: "Card",
              children: {
                mihyRegisterCardContent: {
                  componentPath: "CardContent",
                  children: {
                    mihyRegisterHeader: {
                      componentPath: "Typography",
                      children: {
                        "mihy-login-header-text": {
                          uiFramework: "custom-atoms",
                          componentPath: "Label",
                          props: {
                            label: "Register"
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
                        mihyRegisterUsername: {
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
                        },
                        mihyRegisterPassword: {
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
                        mihyRegisterConfirmPassword: {
                          componentPath: "TextField",
                          props: {
                            label: "Confirm Password",
                            type: "password",
                            margin: "normal",
                            fullWidth: true,
                            required: true
                          },
                          jsonPath: "body.mihy.confirm",
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
                        mihyRegisterButton: {
                          componentPath: "Button",
                          props: {
                            variant: "contained",
                            color: "primary",
                            fullWidth: true
                          },
                          children: {
                            mihyRegisterButtonText: {
                              uiFramework: "custom-atoms",
                              componentPath: "Label",
                              props: {
                                label: "Register"
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
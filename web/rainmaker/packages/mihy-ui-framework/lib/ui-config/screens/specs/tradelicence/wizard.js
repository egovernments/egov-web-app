"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var screenConfig = {
  uiFramework: "carbon",
  name: "mihyBloodDashboard",
  components: {
    mihytradeliceceapply: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          padding: "16px",
          width: "100%"
        }
      },
      children: {
        mihytradelicencestepper: {
          uiFramework: "carbon",
          componentPath: "ProgressIndicator",
          props: {
            currentIndex: 1
          },
          children: {
            stepOne: {
              uiFramework: "carbon",
              componentPath: "ProgressStep",
              props: {
                label: "First step",
                description: "Step 1: Getting Started with Node.js",
                current: true,
                complete: true
              }
            },
            stepTwo: {
              uiFramework: "carbon",
              componentPath: "ProgressStep",
              props: {
                label: "First step",
                description: "Step 2: Getting Started with Node.js"
              }
            },
            stepThree: {
              uiFramework: "carbon",
              componentPath: "ProgressStep",
              props: {
                label: "First step",
                description: "Step 2: Getting Started with Node.js"
              }
            },
            stepFour: {
              uiFramework: "carbon",
              componentPath: "ProgressStep",
              props: {
                label: "First step",
                description: "Step 2: Getting Started with Node.js"
              }
            }
          }
        },
        card: {
          uiFramework: "custom-atoms",
          componentPath: "Card",
          children: {
            content: {
              uiFramework: "custom-atoms",
              componentPath: "CardContent",
              style: {
                height: "100px"
              }
            }
          }
        }
      }
    }
  }
};

exports.default = screenConfig;
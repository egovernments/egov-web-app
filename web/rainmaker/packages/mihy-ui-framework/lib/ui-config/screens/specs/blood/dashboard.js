"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dashboardUtils = require("./dashboard-utils");

var screenConfig = {
  uiFramework: "material-ui",
  name: "mihyBloodDashboard",
  components: {
    mihyBloodDashboard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        mihyBloodDashboardAppCarosel: {
          uiFramework: "custom-molecules",
          componentPath: "AppCarosel",
          props: {}
        },
        mihyBloodDashboardAppCards: {
          uiFramework: "custom-molecules",
          componentPath: "AppCards",
          props: {
            appCards: _dashboardUtils.dashBoardOption
          }
        }
      }
    }
  }
};

exports.default = screenConfig;
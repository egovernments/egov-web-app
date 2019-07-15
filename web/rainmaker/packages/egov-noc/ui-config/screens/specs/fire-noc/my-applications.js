"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _citizenSearchFunctions = require("./searchResource/citizenSearchFunctions");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var header = (0, _utils.getCommonHeader)({
  labelName: "My Applications",
  labelKey: "NOC_MY_APPLICATIONS_HEADER"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _citizenSearchFunctions.fetchData)(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            applicationName: {
              label: "NOC_COMMON_TABLE_COL_BUILDING_NAME_LABEL",
              jsonPath: "fireNOCDetails.buildings[0].name"
            },
            applicationNumber: {
              label: "NOC_COMMON_TABLE_COL_APP_NO_LABEL",
              jsonPath: "fireNOCDetails.applicationNumber"
            },
            ownerName: {
              label: "NOC_COMMON_TABLE_COL_OWN_NAME_LABEL",
              jsonPath: "applicantDetails.owners.name"
            },
            moduleNumber: {
              label: "NOC_COMMON_TABLE_COL_NOC_NO_LABEL",
              jsonPath: "fireNOCNumber"
            },
            status: {
              label: "NOC_COMMON_TABLE_COL_STATUS_LABEL",
              jsonPath: "fireNOCDetails.status"
            },
            moduleName: "FIRENOC"
          }
        }
      }
    }
  }
};

exports.default = screenConfig;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _nocSummary = require("./summaryResource/nocSummary");

var _propertySummary = require("./summaryResource/propertySummary");

var _applicantSummary = require("./summaryResource/applicantSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _footer = require("./summaryResource/footer");

var _taskStatus = require("./taskDetailsResource/taskStatus");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titlebar = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Task Details",
    labelKey: "NOC_TASK_DETAILS_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-noc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    }
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "taskDetails",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var pfo = {
      nocType: "Provisional",
      provisionalNocNumber: "NOC-JLD-2018-09-8786",
      buildingDetails: {
        buildingType: "Multiple Building",
        building: [{
          buildingName: "eGov",
          buildingUsageType: "Commercial",
          buildingUsageSubType: "Commercial",
          noOfFloors: "3",
          noOfBasements: "1",
          plotSize: "6000",
          builtupArea: "5000",
          heightOfBuilding: "200"
        }, {
          buildingName: "Novo Pay",
          buildingUsageType: "Commercial",
          buildingUsageSubType: "Non-Commercial",
          noOfFloors: "1",
          noOfBasements: "2",
          plotSize: "6000",
          builtupArea: "3000",
          heightOfBuilding: "100"
        }]
      },
      address: {
        propertyId: "PROP1234",
        doorHouseNo: "101",
        buildingName: "eGovBuilding",
        street: "Sarjapura Road",
        mohalla: "Bellandur",
        pincode: "123456",
        additionalDetail: {
          fireStation: "Sarjapur Fire Station"
        }
      },
      applicantDetails: {
        applicantType: "Multiple",
        applicant: [{
          mobileNo: "9167765477",
          applicantName: "Avijeet",
          applicantGender: "Male",
          applicantDob: "1991-06-28",
          applicantEmail: "avi7@egov.org",
          applicantFatherHusbandName: "A",
          applicantRelationship: "Father",
          applicantPan: "BNHSP1234K",
          applicantAddress: "Corr",
          applicantCategory: "A"
        }, {
          mobileNo: "9100879085",
          applicantName: "Sharath",
          applicantGender: "Male",
          applicantDob: "1997-04-26",
          applicantEmail: "sharath@egov.org",
          applicantFatherHusbandName: "A",
          applicantRelationship: "Father",
          applicantPan: "ABCDE1234F",
          applicantAddress: "asd",
          applicantCategory: "A"
        }]
      }
    };
    dispatch((0, _actions.prepareFinalObject)("noc", pfo));
    return action;
  },
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
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, titlebar)
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
        },
        body: (0, _utils.getCommonCard)({
          estimateSummary: _estimateSummary.estimateSummary,
          nocSummary: _nocSummary.nocSummary,
          propertySummary: _propertySummary.propertySummary,
          applicantSummary: _applicantSummary.applicantSummary,
          documentsSummary: _documentsSummary.documentsSummary
        })
        // footer: footer
      }
    }
  }
};

exports.default = screenConfig;
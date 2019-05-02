"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../utils");

var _footer = require("./applyResource/footer");

var _nocDetails = require("./applyResource/nocDetails");

var _propertyDetails = require("./applyResource/propertyDetails");

var _propertyLocationDetails = require("./applyResource/propertyLocationDetails");

var _applicantDetails = require("./applyResource/applicantDetails");

var _documentDetails = require("./applyResource/documentDetails");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "NOC Details", labelKey: "NOC_COMMON_NOC_DETAILS" }, { labelName: "Property Details", labelKey: "NOC_COMMON_PROPERTY_DETAILS" }, { labelName: "Applicant Details", labelKey: "NOC_COMMON_APPLICANT_DETAILS" }, { labelName: "Documents", labelKey: "NOC_COMMON_DOCUMENTS" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var applicationNumberContainer = function applicationNumberContainer() {
  var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
  if (applicationNumber) return {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-noc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "" + applicationNumber,
      visibility: "hidden"
    },
    visible: true
  };else return {};
};

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application for Fire NOC (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
    labelKey: "NOC_COMMON_APPLY_NOC"
  }),
  applicationNumber: applicationNumberContainer()
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    nocDetails: _nocDetails.nocDetails
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    propertyDetails: _propertyDetails.propertyDetails,
    propertyLocationDetails: _propertyLocationDetails.propertyLocationDetails
  },
  visible: false
};

var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    applicantDetails: _applicantDetails.applicantDetails
  },
  visible: false
};

var formwizardFourthStep = exports.formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    documentDetails: _documentDetails.documentDetails
  },
  visible: false
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var step = (0, _commons.getQueryArg)(window.location.href, "step");

    var pfo = {};
    if (applicationNumber && !step) {
      pfo = {
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
    }
    if (step && (0, _get2.default)(state, "screenConfiguration.preparedFinalObject")) {
      pfo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.noc", {});
    }

    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      var intStep = parseInt(step);
      (0, _set2.default)(action.screenConfig, "components.div.children.stepper.props.activeStep", intStep);
      var formWizardNames = ["formwizardFirstStep", "formwizardSecondStep", "formwizardThirdStep", "formwizardFourthStep"];
      for (var i = 0; i < 4; i++) {
        (0, _set2.default)(action.screenConfig, "components.div.children." + formWizardNames[i] + ".visible", i == step);
        (0, _set2.default)(action.screenConfig, "components.div.children.footer.children.previousButton.visible", step != 0);
      }
    }

    // Preset multi-cards
    if ((0, _get2.default)(pfo, "buildingDetails.buildingType") === "Multiple Building") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.props.style", { display: "none" });
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.props.style", {});
    }
    if ((0, _get2.default)(pfo, "nocType") === "Provisional") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber.props.style", { visibility: "hidden" });
    }
    if ((0, _get2.default)(pfo, "applicantDetails.applicantType") === "Multiple") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style", { display: "none" });
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.props.style", {});
    } else if ((0, _get2.default)(pfo, "applicantDetails.applicantType") === "Institutional-Private") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style", { display: "none" });
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.props.style", {});
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantSubType.props.style", {});
    }

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
            }, header)
          }
        },
        stepper: stepper,
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        formwizardFourthStep: formwizardFourthStep,
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;
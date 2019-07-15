"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareEditFlow = exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _uiUtils = require("../../../../ui-utils");

var _sampleResponses = require("../../../../ui-utils/sampleResponses");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

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
  //applicationNumber: applicationNumberContainer()
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-noc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA"
    },
    visible: false
  }
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

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }]
                }, {
                  moduleName: "firenoc",
                  masterDetails: [{ name: "BuildingType" }, { name: "FireStations" }]
                }, {
                  moduleName: "egov-location",
                  masterDetails: [{
                    name: "TenantBoundary"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }, { moduleName: "FireNoc", masterDetails: [{ name: "Documents" }] }]
              }
            };
            _context.prev = 2;
            payload = null;
            _context.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getFirstListFromDotSeparated = function getFirstListFromDotSeparated(list) {
  list = list.map(function (item) {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [].concat((0, _toConsumableArray3.default)(new Set(list))).map(function (item) {
    return { code: item };
  });
  return list;
};

var setCardsIfMultipleBuildings = function setCardsIfMultipleBuildings(state, dispatch) {
  if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings") === "MULTIPLE") {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer", "props.style", { display: "none" }));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer", "props.style", {}));
  }
};

var prepareEditFlow = exports.prepareEditFlow = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, applicationNumber, tenantId) {
    var buildings, response, noOfBuildings, nocType;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            buildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings", []);

            if (!(applicationNumber && buildings.length == 0)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 4;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNumber", value: applicationNumber }]);

          case 4:
            response = _context2.sent;

            // let response = sampleSingleSearch();

            response = (0, _commons2.furnishNocResponse)(response);

            dispatch((0, _actions.prepareFinalObject)("FireNOCs", (0, _get2.default)(response, "FireNOCs", [])));
            if (applicationNumber) {
              (0, _commons2.setApplicationNumberBox)(state, dispatch, applicationNumber);
            }
            // Set no of buildings radiobutton and eventually the cards
            noOfBuildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.noOfBuildings", "SINGLE") === "MULTIPLE" ? "MULTIPLE" : "SINGLE";

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingRadioGroup", "props.value", noOfBuildings));

            // Set no of buildings radiobutton and eventually the cards
            nocType = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.fireNOCType", "NEW") === "NEW" ? "NEW" : "PROVISIONAL";

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.nocRadioGroup", "props.value", nocType));

            // setCardsIfMultipleBuildings(state, dispatch);

            // Set sample docs upload
            // dispatch(prepareFinalObject("documentsUploadRedux", sampleDocUpload()));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function prepareEditFlow(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var step = (0, _commons.getQueryArg)(window.location.href, "step");

    //Set Module Name
    (0, _set2.default)(state, "screenConfiguration.moduleName", "fire-noc");

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(function (response) {
      // Set Dropdowns Data
      var buildingUsageTypeData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType", []);
      buildingUsageTypeData = getFirstListFromDotSeparated(buildingUsageTypeData);
      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.DropdownsData.BuildingUsageType", buildingUsageTypeData));
      var ownershipCategory = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory", []);
      ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.DropdownsData.OwnershipCategory", ownershipCategory));

      // Set Documents Data (TEMP)
      (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
    });

    // Search in case of EDIT flow
    prepareEditFlow(state, dispatch, applicationNumber, tenantId);

    // // Set Property City
    // dispatch(prepareFinalObject("FireNOCs[0].fireNOCDetails.propertyDetails.address.city", getTenantId()));

    // // Handle dependent dropdowns in edit flow
    // set(
    //   "apply",
    //   "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children.buildingSubUsageType",
    //   { display: "none" }
    // );

    // let pfo = {};
    // if (applicationNumber && !step) {
    //   pfo = searchSampleResponse();
    //   dispatch(prepareFinalObject("FireNOCs[0]", get(pfo, "FireNOCs[0]")));
    // }
    // if (step && get(state, "screenConfiguration.preparedFinalObject")) {
    //   pfo = get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.FireNOCs[0]",
    //     {}
    //   );
    // }

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

    // Set defaultValues of radiobuttons and selectors
    var noOfBuildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings", "SINGLE");
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings", noOfBuildings);
    var nocType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType", "PROVISIONAL");
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType", nocType);

    // Preset multi-cards (CASE WHEN DATA PRE-LOADED)
    if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings") === "MULTIPLE") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.props.style", { display: "none" });
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.props.style", {});
    }
    if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType") === "PROVISIONAL") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber.props.style", { visibility: "hidden" });
    }
    // if (
    //   get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
    //     ""
    //   ).includes("MULTIPLEOWNERS")
    // ) {
    //   set(
    //     action.screenConfig,
    //     "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style",
    //     { display: "none" }
    //   );
    //   set(
    //     action.screenConfig,
    //     "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.props.style",
    //     {}
    //   );
    // } else if (
    //   get(
    //     state,
    //     "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
    //     ""
    //   ).includes("INSTITUTIONAL")
    // ) {
    //   set(
    //     action.screenConfig,
    //     "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style",
    //     { display: "none" }
    //   );
    //   set(
    //     action.screenConfig,
    //     "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.props.style",
    //     {}
    //   );
    //   set(
    //     action.screenConfig,
    //     "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantSubType.props.style",
    //     {}
    //   );
    // }

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
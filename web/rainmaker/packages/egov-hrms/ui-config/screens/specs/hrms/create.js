"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formwizardFifthStep = exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./createResource/footer");

var _employeeDetails = require("./createResource/employee-details");

var _jurisdictionDetails = require("./createResource/jurisdiction-details");

var _assignmentDetails = require("./createResource/assignment-details");

var _serviceDetails = require("./createResource/service-details");

var _otherDetails = require("./createResource/other-details");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

var _uiUtils = require("../../../../ui-utils");

var _utils2 = require("../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _functions = require("./viewResource/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Employee Details", labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER" }, {
  labelName: "Jurisdiction Details",
  labelKey: "HR_JURISDICTION_DETAILS_HEADER"
}, { labelName: "Assignment Details", labelKey: "HR_ASSIGN_DET_HEADER" }, { labelName: "Service Details", labelKey: "HR_SER_DET_HEADER" }, { labelName: "Other Details", labelKey: "HR_OTHER_DET_HEADER" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);
// export const queryValue = getQueryArg(
//   window.location.href,
//   "applicationNumber"
// );

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Create New Employee",
    labelKey: "HR_COMMON_APPL_NEW_HEADER"
  })
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    employeeDetails: _employeeDetails.employeeDetails,
    professionalDetails: _employeeDetails.professionalDetails
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    jurisdictionDetails: _jurisdictionDetails.jurisdictionDetails
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
    assignmentDetails: _assignmentDetails.assignmentDetails
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
    serviceDetails: _serviceDetails.serviceDetails
  },
  visible: false
};

var formwizardFifthStep = exports.formwizardFifthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form5"
  },
  children: {
    otherDetails: _otherDetails.otherDetails
  },
  visible: false
};

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, tenantId) {
    var mdmsBody, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "Department"
                  }, {
                    name: "Designation"
                  }]
                }, {
                  moduleName: "ACCESSCONTROL-ROLES",
                  masterDetails: [{
                    name: "roles"
                  }]
                }, {
                  moduleName: "egov-location",
                  masterDetails: [{
                    name: "TenantBoundary"
                    // filter: "$.*.hierarchyType"
                  }]
                }, {
                  moduleName: "egov-hrms",
                  masterDetails: [{
                    name: "Degree"
                  }, {
                    name: "EmployeeStatus"
                  }, {
                    name: "EmployeeType"
                  }]
                }]
              }
            };
            _context.prev = 1;
            _context.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData", (0, _get2.default)(response, "MdmsRes")));
            setRolesList(state, dispatch);
            setHierarchyList(state, dispatch);
            return _context.abrupt("return", true);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getYearsList = function getYearsList(startYear, state, dispatch) {
  var currentYear = new Date().getFullYear(),
      years = [];
  startYear = startYear || 1980;

  while (startYear <= currentYear) {
    years.push({ value: (startYear++).toString() });
  }

  dispatch((0, _actions.prepareFinalObject)("yearsList", years));
};

var setRolesList = function setRolesList(state, dispatch) {
  var rolesList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.ACCESSCONTROL-ROLES.roles", []);
  var furnishedRolesList = rolesList.filter(function (item) {
    return item.code;
  });
  dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData.furnishedRolesList", furnishedRolesList));
};

var setHierarchyList = function setHierarchyList(state, dispatch) {
  var tenantBoundary = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary", []);
  var hierarchyList = (0, _map2.default)(tenantBoundary, "hierarchyType", []);
  dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData.hierarchyList", hierarchyList));
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "create",
  // hasBeforeInitAsync:true,
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var tenantId = localStorage.getItem("tenant-id");
    var mdmsDataStatus = getMdmsData(state, dispatch, tenantId);
    var employeeCode = (0, _commons.getQueryArg)(window.location.href, "employeeCode");
    employeeCode && (0, _functions.getEmployeeData)(state, dispatch, employeeCode);
    getYearsList(1950, state, dispatch);
    // if (mdmsDataStatus) {
    //   setHierarchyList(state, dispatch);
    // }
    //   dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    //   dispatch(prepareFinalObject("LicensesTemp", []));
    //   // getData(action, state, dispatch);
    //   getData(action, state, dispatch).then(responseAction => {
    //     const queryObj = [{ key: "tenantId", value: tenantId }];
    //     getBoundaryData(action, state, dispatch, queryObj);
    //     let props = get(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
    //       {}
    //     );
    //     props.value = tenantId;
    //     props.disabled = true;
    //     set(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
    //       props
    //     );
    //     dispatch(
    //       prepareFinalObject(
    //         "Licenses[0].tradeLicenseDetail.address.city",
    //         tenantId
    //       )
    //     );
    //     //hardcoding license type to permanent
    //     set(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLicenseType.props.value",
    //       "PERMANENT"
    //     );
    //   });

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
        formwizardFifthStep: formwizardFifthStep,
        footer: _footer.footer
      }
      // breakUpDialog: {
      //   uiFramework: "custom-containers-local",
      //   componentPath: "ViewBreakupContainer",
      //   props: {
      //     open: false,
      //     maxWidth: "md",
      //     screenKey: "apply"
      //   }
      // }
    } }
};

exports.default = screenConfig;
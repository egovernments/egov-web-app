"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _employeeReview = require("./viewResource/employee-review");

var _footer = require("./viewResource/footer");

var _functions = require("./viewResource/functions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _deactivateEmployee = require("./viewResource/deactivate-employee");

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "View Employee Information",
    labelKey: "HR_VIEW_HEADER"
  })
});

var tradeView = (0, _employeeReview.employeeReviewDetails)(false);

var screenConfig = {
  uiFramework: "material-ui",
  name: "view",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var employeeCode = (0, _commons.getQueryArg)(window.location.href, "employeeID");
    (0, _functions.getEmployeeData)(state, dispatch, employeeCode);
    (0, _utils2.showHideAdhocPopup)(state, dispatch);
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
        tradeView: tradeView,
        footer: (0, _footer.hrViewFooter)()
      }
    },
    // deactivateEmployee: {
    //   uiFramework: "custom-molecules-local",
    //   componentPath: "ActionDialog",
    //   props: {
    //     open: false
    //   },
    //   type: "array"
    // },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "view"
      },
      children: {
        popup: _deactivateEmployee.deactivateEmployee
      }
    }
  }
};

exports.default = screenConfig;
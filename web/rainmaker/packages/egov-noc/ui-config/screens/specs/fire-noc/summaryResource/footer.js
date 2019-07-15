"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _utils2 = require("../../utils");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateNocApplication = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var response, applicationNumber, tenantId, acknowledgementUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons.createUpdateNocApplication)(state, dispatch, "APPLY");

          case 2:
            response = _context.sent;
            applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber");
            tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].tenantId");

            if ((0, _get2.default)(response, "status", "") === "success") {
              acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/fire-noc/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

              dispatch((0, _actions.setRoute)(acknowledgementUrl));
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateNocApplication(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var footer = exports.footer = (0, _utils2.getCommonApplyFooter)({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "SUBMIT",
        labelKey: "NOC_COMMON_BUTTON_SUBMIT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: updateNocApplication
    }
  }
});
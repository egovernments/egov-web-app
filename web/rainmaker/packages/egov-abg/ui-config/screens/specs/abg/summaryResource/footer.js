"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

require("./index.scss");

var gotoAcknowledgement = function gotoAcknowledgement(state, dispatch) {
  var acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/acknowledgement?purpose=apply&status=success&applicationNumber=NOC-JLD-2018-09-123434" : "/fire-noc/acknowledgement?purpose=apply&status=success&applicationNumber=NOC-JLD-2018-09-123434";
  dispatch((0, _actions.setRoute)(acknowledgementUrl));
};

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
      callBack: gotoAcknowledgement
    }
  }
});
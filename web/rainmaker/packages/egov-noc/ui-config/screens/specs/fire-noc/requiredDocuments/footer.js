"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

var printDiv = function printDiv() {
  var content = document.getElementById("documents-div").innerHTML;
  var printWindow = window.open("", "Print");

  printWindow.document.write("<html><body >");
  printWindow.document.write(content);
  printWindow.document.write("</body></html>");

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};

var startApplyFlow = function startApplyFlow(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("FireNOCs", []));
  var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/apply" : "/fire-noc/apply";
  dispatch((0, _actions.setRoute)(applyUrl));
};

var footer = exports.footer = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  props: {
    className: "apply-wizard-footer",

    style: {
      width: "100%",
      textAlign: "center",
      bottom: 52
    }
  },

  // props: {
  //   className: "apply-wizard-footer",
  //   style: {
  //     textAlign: "center"
  //   }
  // },
  children: {
    printButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printButtonLabel: (0, _utils.getLabel)({
          labelName: "Print",
          labelKey: "NOC_COMMON_BUTTON_PRINT"
        })
      },
      visible: true,
      onClickDefination: {
        action: "condition",
        callBack: printDiv
      }
    },
    applyButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        applyButtonLabel: (0, _utils.getLabel)({
          labelName: "Apply",
          labelKey: "NOC_COMMON_BUTTON_APPLY"
        })
      },
      visible: true,
      onClickDefination: {
        action: "condition",
        callBack: startApplyFlow
        //Add onClickDefinition:
      } }
  }
};
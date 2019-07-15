"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.G8ReceiptDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var G8ReceiptDetails = exports.G8ReceiptDetails = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "G8 Receipt Details(optional)",
        labelKey: "UC_G8_RECEIPT_DETAILS_HEADER"
      })),
      g8ReceiptNo: (0, _utils.getTextField)({
        label: {
          labelName: "G8 Receipt No",
          labelKey: "UC_G8_RECEIPT_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter G8 receipt No",
          labelKey: "UC_G8_RECEIPT_NO_PLACEHOLDER"
        },

        required: false,
        visible: true,
        pattern: (0, _utils.getPattern)("g8ReceiptNo "),
        errorMessage: "Invalid g8ReceiptNo.",
        jsonPath: "ReceiptTemp[0].Bill[0].billDetails[0].manualReceiptNumber"
      }),
      g8ReceiptIssueDate: (0, _utils.getDateField)({
        label: {
          labelName: "G8 receipt issue Date",
          labelKey: "UC_G8_RECEIPT_ISSUE_DATE"
        },
        placeholder: {
          labelName: "Enter G8 receipt Issue Date",
          labelKey: "UC_SELECT_G8_RECEIPT_ISSUE_DATE_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: (0, _utils.getPattern)("Date"),
        jsonPath: "ReceiptTemp[0].Bill[0].billDetails[0].manualReceiptDate"
      })
    }
  }
});
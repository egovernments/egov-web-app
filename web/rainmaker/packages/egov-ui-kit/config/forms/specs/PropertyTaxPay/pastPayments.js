"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "pastPayments",
  fields: {
    receipt: {
      id: "receipt-no",
      type: "textfield",
      jsonPath: "",
      required: true,
      floatingLabelText: "TL_EMP_APPLICATION_RCPT_NO",
      errorMessage: "",
      hintText: "PT_RECEIPT_NUMBER_HINT_TEXT"
    },
    amount: {
      id: "amount-paid",
      type: "textfield",
      jsonPath: "",
      required: true,
      floatingLabelText: "PT_ADVANCE_CARRYFORWARD",
      hintText: "PT_AMOUNT_PAID_HINT_TEXT",
      errorMessage: "PT_VALID_DETAILS",
      pattern: "^[0-9]+$"
    },
    misplacedReceipt: {
      id: "rcpt",
      type: "checkbox",
      jsonPath: "",
      errorMessage: "",
      floatingLabelText: "PT_MISPLACED_RECEIPT_FLOATING_LABEL",
      value: "misplaced Receipt"
    }
  },
  submit: {
    label: "NEXT",
    id: "payment-submit-action",
    type: "submit"
  },
  extraDetails: [{
    name: "year",
    jsonPath: "res.",
    opitions: "abc[1].xyzz"
  }],
  action: "_send",
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/citizen/user/otp",
  isFormValid: false,
  formatConfig: function formatConfig(_ref) {
    var config = _ref.config,
        index = _ref.index;

    var updatedConfig = (0, _extends3.default)({}, config, {
      fields: (0, _extends3.default)({}, config.fields, {
        year: (0, _extends3.default)({}, config.fields.year, {
          jsonPath: "abc[" + index + "].xyzz"
        })
      })
    });
    return updatedConfig;
  }
};

exports.default = formConfig;
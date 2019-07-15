"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adhocPopup = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("../../../../../ui-utils/api");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEstimateDataAfterAdhoc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var NOCRequestBody, NOCpayload, billPayload, billInRedux, mergedBillObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            NOCRequestBody = (0, _cloneDeep2.default)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs"));

            (0, _set2.default)(NOCRequestBody[0], "action", "ADHOC");
            _context.next = 4;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_update", "", [], { FireNOCs: NOCRequestBody });

          case 4:
            NOCpayload = _context.sent;
            _context.next = 7;
            return (0, _utils2.createEstimateData)(NOCpayload.FireNOCs[0], "FireNOCsTemp[0].estimateCardData", dispatch, window.location.href);

          case 7:
            billPayload = _context.sent;


            //get deep copy of bill in redux - merge new bill after adhoc
            billInRedux = (0, _cloneDeep2.default)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].Bill[0]"));
            mergedBillObj = (0, _extends3.default)({}, billInRedux, billPayload.billResponse.Bill[0]);

            //merge bill in Receipt obj

            billPayload && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0]", mergedBillObj));

            //set amount paid as total amount from bill
            billPayload && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].amountPaid", billPayload.billResponse.Bill[0].billDetails[0].totalAmount));

            //set total amount in instrument
            billPayload && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.amount", billPayload.billResponse.Bill[0].billDetails[0].totalAmount));

            (0, _utils2.showHideAdhocPopup)(state, dispatch, "pay");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getEstimateDataAfterAdhoc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateAdhoc = function updateAdhoc(state, dispatch) {
  var adhocAmount = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.adhocPenalty");
  var rebateAmount = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.adhocExemption");
  if (adhocAmount || rebateAmount) {
    getEstimateDataAfterAdhoc(state, dispatch);
  } else {
    dispatch((0, _actions.toggleSnackbar)(true, {
      labelName: "Enter at least one field",
      labelKey: "ERR_ENTER_ATLEAST_ONE_FIELD"
    }, "warning"));
  }
};

var adhocPopup = exports.adhocPopup = (0, _utils.getCommonContainer)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: (0, _utils.getCommonHeader)({
            labelName: "Add Adhoc Penalty/Rebate",
            labelKey: "NOC_ADD_HOC_CHARGES_POPUP_HEAD"
          }, {
            style: {
              fontSize: "20px"
            }
          })
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "close"
                }
              }
            },
            onClickDefination: {
              action: "condition",
              callBack: function callBack(state, dispatch) {
                return (0, _utils2.showHideAdhocPopup)(state, dispatch, "pay");
              }
            }
          }
        }
      }
    }
  },
  adhocPenaltyCard: (0, _utils.getCommonContainer)({
    subheader: (0, _utils.getCommonSubHeader)({
      labelName: "Adhoc Penalty",
      labelKey: "NOC_ADD_HOC_CHARGES_POPUP_SUB_FIRST"
    }, {
      style: {
        fontSize: "16px"
      }
    }),
    penaltyAmountAndReasonContainer: (0, _utils.getCommonContainer)({
      penaltyAmount: (0, _utils.getTextField)({
        label: {
          labelName: "Adhoc Penalty Amount",
          labelKey: "NOC_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
        },
        placeholder: {
          labelName: "Enter Adhoc Charge Amount",
          labelKey: "NOC_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
        },
        props: {
          style: {
            width: "90%"
          }
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.adhocPenalty"
      }),
      penaltyReason: (0, _utils.getSelectField)({
        label: {
          labelName: "Reason for Adhoc Penalty",
          labelKey: "NOC_PAYMENT_PENALTY_REASON"
        },
        placeholder: {
          labelName: "Select reason for Adhoc Penalty",
          labelKey: "NOC_PAYMENT_PENALTY_REASON_SELECT"
        },
        props: {
          style: {
            width: "90%"
          }
        },
        data: [{
          code: "NOC_ADHOC_PENDING_DUES"
        }, {
          code: "NOC_ADHOC_MISCALCULATION"
        }, {
          code: "NOC_ADHOC_ONE_TIME_PENALTY"
        }, {
          code: "NOC_ADHOC_OTHER"
        }],
        jsonPath: "FireNOCs[0].fireNOCDetails.adhocPenaltyReason"
      })
    }),
    commentsField: (0, _utils.getTextField)({
      label: {
        labelName: "Enter Comments",
        labelKey: "NOC_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comments",
        labelKey: "NOC_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 12
      },
      props: {
        style: {
          width: "90%"
        }
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.penaltyComments"
    })
  }, {
    style: {
      marginTop: "12px"
    }
  }),
  adhocRebateCard: (0, _utils.getCommonContainer)({
    subHeader: (0, _utils.getCommonSubHeader)({
      labelName: "Adhoc Rebate",
      labelKey: "NOC_ADD_HOC_CHARGES_POPUP_SUB_SEC"
    }, {
      style: {
        fontSize: "16px"
      }
    }),
    rebateAmountAndReasonContainer: (0, _utils.getCommonContainer)({
      rebateAmount: (0, _utils.getTextField)({
        label: {
          labelName: "Adhoc Rebate Amount",
          labelKey: "NOC_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
        },
        placeholder: {
          labelName: "Enter Adhoc Rebate Amount",
          labelKey: "NOC_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
        },
        props: {
          style: {
            width: "90%"
          }
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.adhocExemption"
      }),
      rebateReason: (0, _utils.getSelectField)({
        label: {
          labelName: "Reason for Adhoc Rebate",
          labelKey: "NOC_PAYMENT_REBATE_REASON"
        },
        placeholder: {
          labelName: "Select Reason for Adhoc Rebate",
          labelKey: "NOC_PAYMENT_REBATE_REASON_SELECT"
        },
        props: {
          style: {
            width: "90%"
          }
        },
        data: [{
          code: "NOC_REBATE_ADVANCED_PAID"
        }, {
          code: "NOC_REBATE_BY_COMMISSIONER"
        }, {
          code: "NOC_REBATE_ADDITIONAL_AMOUNT_CAHNGED"
        }, {
          code: "NOC_ADHOC_OTHER"
        }],
        jsonPath: "FireNOCs[0].fireNOCDetails.adhocExemptionReason"
      }),
      rebateCommentsField: (0, _utils.getTextField)({
        label: {
          labelName: "Enter Comments",
          labelKey: "NOC_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        placeholder: {
          labelName: "Enter Comments",
          labelKey: "NOC_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        props: {
          style: {
            width: "90%"
          }
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.rebateComments"
      })
    })
  }, {
    style: {
      marginTop: "24px"
    }
  }),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            width: "140px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: (0, _utils.getLabel)({
            labelName: "CANCEL",
            labelKey: "NOC_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            return (0, _utils2.showHideAdhocPopup)(state, dispatch, "pay");
          }
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            width: "140px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: (0, _utils.getLabel)({
            labelName: "ADD",
            labelKey: "NOC_ADD_HOC_CHARGES_POPUP_BUTTON_ADD"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: updateAdhoc
        }
      }
    }
  }
});
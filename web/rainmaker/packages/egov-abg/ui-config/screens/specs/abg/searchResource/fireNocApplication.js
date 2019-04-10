"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abgSearchCard = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var abgSearchCard = exports.abgSearchCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)({
    financialYear: (0, _utils.getSelectField)({
      label: {
        labelName: "Financial Year",
        labelKey: "TL_FINANCIAL_YEAR_LABEL"
      },
      placeholder: {
        labelName: "Select Financial Year",
        labelKey: "TL_FINANCIAL_YEAR_PLACEHOLDER"
      },
      required: true,
      visible: true,
      jsonPath: "searchScreen.financialYear",
      // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "2018-19"
      }, {
        code: "2019-20"
      }]
    }),
    locMohalla: (0, _utils.getSelectField)({
      label: {
        labelName: "Location/Mohalla",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Location/Mohalla",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.locMohalla",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "Ajit Nagar"
      }, {
        code: "Cinema road-1"
      }]
    }),
    propertyId: (0, _utils.getTextField)({
      label: {
        labelName: "Property ID",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: (0, _utils.getPattern)("PropertyID"),
      errorMessage: "Invalid Property ID",
      jsonPath: "searchScreen.propertyId"
    }),
    tradeLocMohalla: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "AutosuggestContainer",
      jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        label: {
          labelName: "Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
        },
        placeholder: {
          labelName: "Select Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_PLACEHOLDER"
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
        sourceJsonPath: "applyScreenMdmsData.tenant.localities",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        required: true,
        inputLabelProps: {
          shrink: true
          // className: "tradelicense-mohalla-apply"
        } },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }(),
      gridDefination: {
        xs: 12,
        sm: 6
      }
    }
  }),

  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",

            // backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            backgroundColor: "#FE7A51",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Search",
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.searchApiCall
        }
      },
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }
    })
  })
});
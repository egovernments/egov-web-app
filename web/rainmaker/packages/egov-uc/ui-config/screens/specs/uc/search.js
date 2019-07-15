"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _ucSearch = require("./universalCollectionResources/ucSearch");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

var _searchResults = require("./universalCollectionResources/searchResults");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _uiUtils = require("../../../../ui-utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _localStorageUtils.getTenantId)();
var header = (0, _utils.getCommonHeader)({
  labelName: "Universal Collection",
  labelKey: "UC_COMMON_HEADER_SEARCH"
});

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var getData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getMDMSData(action, state, dispatch);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getMDMSData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var mdmsBody, payload, serviceCategories;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "BillingService",
                  masterDetails: [{ name: "BusinessService", filter: "[?(@.type=='Adhoc')]" }]
                }]
              }
            };
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context2.sent;

            // dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
            serviceCategories = (0, _utils2.setServiceCategory)((0, _get2.default)(payload, "MdmsRes.BillingService.BusinessService", []), dispatch);

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.serviceCategory", serviceCategories));
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);

            console.log(_context2.t0);
            alert("Billing service data fetch failed");

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 9]]);
  }));

  return function getMDMSData(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var ucSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    getData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "universalCollection"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header),
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px"
                    }
                  }
                },

                buttonLabel: (0, _utils.getLabel)({
                  labelName: "NEW COLLECTION",
                  labelKey: "UC_SEARCH_RESULTS_NEW_COLLECTION_BUTTON"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/uc/newCollection" : "/uc/newCollection"
              }
            }
          }
        },
        UCSearchCard: _ucSearch.UCSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = ucSearchAndResult;
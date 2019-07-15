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

var _fireNocApplication = require("./searchResource/fireNocApplication");

var _utils2 = require("../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _pendingApprovals = require("./searchResource/pendingApprovals");

var _searchResults = require("./searchResource/searchResults");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("egov-ui-framework/ui-utils/api");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _reqDocs = require("./requiredDocuments/reqDocs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

var header = (0, _utils.getCommonHeader)({
  labelName: "Fire NOC",
  labelKey: "NOC_COMMON_NOC"
});

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "FireNoc",
                  masterDetails: [{ name: "Documents" }]
                }]
              }
            };
            _context.prev = 2;
            payload = null;
            _context.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var NOCSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var tenantId = (0, _localStorageUtils.getTenantId)();
    var BSqueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "FIRENOC" }];
    (0, _commons.setBusinessServiceDataToLocalStorage)(BSqueryObject, dispatch);
    var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
    var data = (0, _find2.default)(businessServiceData, { businessService: "FIRENOC" });

    var _ref2 = data || [],
        states = _ref2.states;

    if (states && states.length > 0) {
      var status = states.map(function (item, index) {
        return {
          code: item.state
        };
      });
      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.searchScreen.status", status.filter(function (item) {
        return item.code != null;
      })));
    }
    getMdmsData(action, state, dispatch).then(function () {
      var documents = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.searchScreenMdmsData.FireNoc.Documents", []);
      (0, _set2.default)(action, "screenConfig.components.adhocDialog.children.popup", (0, _reqDocs.getRequiredDocuments)(documents));
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
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
                  labelName: "NEW APPLICATION",
                  labelKey: "NOC_HOME_SEARCH_RESULTS_NEW_APP_BUTTON"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {
                  return (0, _utils2.showHideAdhocPopup)(state, dispatch, "search");
                }
              },
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["NOC_CEMP", "SUPERUSER"]
              }
            }
          }
        },
        pendingApprovals: _pendingApprovals.pendingApprovals,
        NOCApplication: _fireNocApplication.NOCApplication,
        breakAfterSearch: (0, _utils.getBreak)(),
        // progressStatus,
        searchResults: _searchResults.searchResults
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "search"
      },
      children: {
        popup: {}
      }
    }
  }
};

exports.default = NOCSearchAndResult;
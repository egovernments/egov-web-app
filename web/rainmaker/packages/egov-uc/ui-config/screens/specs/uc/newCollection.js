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

var _newCollectionDetails = require("./newCollectionResource/newCollectionDetails");

var _newCollectionFooter = require("./newCollectionResource/newCollectionFooter");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _api = require("egov-ui-framework/ui-utils/api");

var _utils2 = require("../utils");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "New Collection",
  labelKey: "UC_COMMON_HEADER"
});
var tenantId = (0, _localStorageUtils.getTenantId)();

var getData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var requestBody, payload, serviceCategories, serviceCategoriesTransformed, _payload, liveTenants;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }]
              }
            };
            _context.prev = 1;
            payload = null;
            _context.next = 5;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

          case 5:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            serviceCategories = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.searchScreenMdmsData.serviceCategory", []);

            if (serviceCategories && serviceCategories.length) {
              serviceCategoriesTransformed = (0, _utils2.setServiceCategory)(serviceCategories, dispatch);

              dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.serviceCategories", serviceCategoriesTransformed));
            }
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 14:
            _context.prev = 14;
            _payload = null;
            _context.next = 18;
            return (0, _api.httpRequest)("post", "/egov-idgen/id/_generate", "", [], {
              idRequests: [{
                idName: "",
                format: "UC/[CY:dd-MM-yyyy]/[seq_uc_demand_consumer_code]",
                tenantId: "" + tenantId
              }]
            });

          case 18:
            _payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("Demands[0].consumerCode", (0, _get2.default)(_payload, "idResponses[0].id", "")));
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](14);

            console.log(_context.t1);

          case 25:
            liveTenants = (0, _get2.default)(state, "common.citiesByModule.UC.tenants", []);

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.citiesByModule", liveTenants));
            // return action;

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11], [14, 22]]);
  }));

  return function getData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var newCollection = {
  uiFramework: "material-ui",
  name: "newCollection",
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
        id: "newCollection"
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
            }, header)
          }
        },
        newCollectionDetailsCard: _newCollectionDetails.newCollectionDetailsCard,
        newCollectionFooter: _newCollectionFooter.newCollectionFooter
      }
    }
  }
};

exports.default = newCollection;
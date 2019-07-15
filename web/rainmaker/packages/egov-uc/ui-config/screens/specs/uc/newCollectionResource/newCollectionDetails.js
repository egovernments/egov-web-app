"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCollectionDetailsCard = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _api = require("egov-ui-framework/ui-utils/api");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
var enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
var tenantId = (0, _localStorageUtils.getTenantId)();

var newCollectionDetailsCard = exports.newCollectionDetailsCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)((0, _defineProperty3.default)({
    City: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "City",
        labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
      },
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      optionLabel: "name",
      placeholder: {
        labelName: "Select City",
        labelKey: "TL_SELECT_CITY"
      },
      sourceJsonPath: "applyScreenMdmsData.tenant.citiesByModule",
      // "applyScreenMdmsData.common-masters.citiesByModule.UC.tenants",
      jsonPath: "Demands[0].tenantId",
      required: true,
      props: {
        required: true,
        value: tenantId,
        disabled: true
      }
    }), {
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var citiesByModule, requestBody, payload;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  citiesByModule = (0, _get2.default)(state, "common.citiesByModule.UC.tenants", []);

                  if (citiesByModule.find(function (item) {
                    return item.code === action.value;
                  })) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return", action);

                case 3:
                  requestBody = {
                    MdmsCriteria: {
                      tenantId: action.value,
                      moduleDetails: [{
                        moduleName: "BillingService",
                        masterDetails: [{
                          name: "BusinessService",
                          filter: "[?(@.type=='Adhoc')]"
                        }, {
                          name: "TaxHeadMaster"
                        }, {
                          name: "TaxPeriod"
                        }]
                      }]
                    }
                  };
                  _context.prev = 4;
                  payload = null;
                  _context.next = 8;
                  return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

                case 8:
                  payload = _context.sent;

                  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.BillingService", payload.MdmsRes.BillingService));
                  setServiceCategory((0, _get2.default)(payload, "MdmsRes.BillingService.BusinessService", []), dispatch);
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](4);

                  console.log(_context.t0);

                case 16:
                  return _context.abrupt("return", action);

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[4, 13]]);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    }),
    dummyDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
      props: {
        disabled: true
      }
    },
    ConsumerMobileNo: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No",
        labelKey: "UC_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No",
        labelKey: "UC_MOBILE_NO_PLACEHOLDER"
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },

      required: true,
      visible: true,
      pattern: (0, _utils.getPattern)("MobileNo"),
      errorMessage: "Invalid Mobile No.",
      jsonPath: "Demands[0].mobileNo"
    }),
    ConsumerName: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Name",
        labelKey: "UC_CONS_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Name",
        labelKey: "UC _CONS_NAME_LABEL_PLACEHOLDER"
      },

      required: true,
      visible: true,
      pattern: (0, _utils.getPattern)("Name"),
      errorMessage: "Invalid Name.",
      jsonPath: "Demands[0].consumerName"
    }),
    serviceCategory: {
      uiFramework: "custom-containers",
      componentPath: "AutosuggestContainer",
      jsonPath: "Demands[0].businessService",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        label: {
          labelName: "Service Category",
          labelKey: "UC_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select service Category",
          labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },
        required: true,
        visible: true,
        jsonPath: "Demands[0].businessService",
        sourceJsonPath: "applyScreenMdmsData.serviceCategories",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        inputLabelProps: {
          shrink: true
        }
      },
      beforeFieldChange: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
          var serviceData, taxHeads;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.log(action);
                  //Reset service type value, if any
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType", "props.value", null));
                  //Set service type data and field if available.
                  serviceData = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.nestedServiceData", {});

                  if (action.value) {
                    if (serviceData[action.value] && serviceData[action.value].child && serviceData[action.value].child.length > 0) {
                      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.serviceTypes", serviceData[action.value].child));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType", "visible", true));
                    } else {
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType", "visible", false));
                      //Set tax head fields if there is no service type available
                      if (serviceData[action.value]) {
                        taxHeads = setTaxHeadFields(action, state, dispatch);
                      }
                    }
                  }

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function beforeFieldChange(_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    serviceType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "Service Type",
        labelKey: "UC_SERVICE_TYPE_LABEL"
      },
      localePrefix: {
        masterName: "BusinessService",
        moduleName: "BillingService"
      },
      placeholder: {
        labelName: "Select Service Type",
        labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
      },
      required: true,
      visible: false,
      sourceJsonPath: "applyScreenMdmsData.serviceTypes",
      jsonPath: "Demands[0].serviceType",
      gridDefination: {
        xs: 12,
        sm: 6
      }
    }), {
      beforeFieldChange: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
          var taxHeads;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (action.value) {
                    taxHeads = setTaxHeadFields(action, state, dispatch);

                    console.log(taxHeads);
                  }

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function beforeFieldChange(_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }()
    }),
    fromDate: (0, _utils.getDateField)({
      label: {
        labelName: "From Date",
        labelKey: "UC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter from Date",
        labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Demands[0].taxPeriodFrom"
    }),
    toDate: (0, _utils.getDateField)({
      label: {
        labelName: "To Date",
        labelKey: "UC_TO_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter to Date",
        labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Demands[0].taxPeriodTo"
    })
  }, "dummyDiv", {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 6
    },
    visible: true,
    props: {
      disabled: true
    }
  }), {
    style: {
      overflow: "visible"
    }
  })
}, {
  style: {
    overflow: "visible"
  }
});

var setTaxHeadFields = function setTaxHeadFields(action, state, dispatch) {
  var serviceData = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.nestedServiceData", {});
  var taxHeadMasters = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.BillingService.TaxHeadMaster", {});
  var matchingTaxHeads = taxHeadMasters.filter(function (item) {
    return item.service === action.value;
  });
  if (matchingTaxHeads && matchingTaxHeads.length > 0) {
    //Delete previous Tax Head fields
    var noOfPreviousTaxHeads = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Demands[0].demandDetails", []).length;
    var taxFields = (0, _get2.default)(state.screenConfiguration, "screenConfig.newCollection.components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", {});
    var taxFieldKeys = Object.keys(taxFields).filter(function (item) {
      return item.startsWith("taxheadField_");
    });
    if (noOfPreviousTaxHeads > 0) {
      for (var i = 0; i < taxFieldKeys.length; i++) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".props.value", ""));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".visible", false));
      }
      dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails", []));
    }
    //Show new tax head fields
    matchingTaxHeads.forEach(function (item, index) {
      dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails[" + index + "].taxHeadMasterCode", item.code));
      dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails[" + index + "].collectionAmount", 0));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", "taxheadField_" + item.code.split(".").join("_"), (0, _utils.getTextField)({
        label: {
          labelName: "Tax Amount",
          labelKey: "" + item.code
        },
        placeholder: {
          labelName: "Enter Tax Amount",
          labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
        },
        componentJsonpath: "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.taxheadField_" + item.code.split(".").join("_"),
        required: item.isRequired || false,
        pattern: (0, _utils.getPattern)("Amount"),
        errorMessage: "Invalid Amount",
        visible: true,
        // required: true,
        props: {
          // required: true
        },
        jsonPath: "Demands[0].demandDetails[" + index + "].taxAmount"
      })));
    });
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", "comment", (0, _utils.getTextField)({
      label: {
        labelName: "Comments",
        labelKey: "UC_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comment ",
        labelKey: "UC_COMMENT_PLACEHOLDER"
      },
      Required: false,
      jsonPath: "Demands[0].comment",
      componentJsonpath: "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.comment"
    })));
  }
};

var setServiceCategory = function setServiceCategory(businessServiceData, dispatch) {
  var nestedServiceData = {};
  businessServiceData.forEach(function (item) {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        var child = (0, _get2.default)(nestedServiceData, item.code.split(".")[0] + ".child", []);
        child.push(item);
        (0, _set2.default)(nestedServiceData, item.code.split(".")[0] + ".child", child);
      } else {
        (0, _set2.default)(nestedServiceData, item.code.split(".")[0] + ".code", item.code.split(".")[0]);
        (0, _set2.default)(nestedServiceData, item.code.split(".")[0] + ".child[0]", item);
      }
    } else {
      (0, _set2.default)(nestedServiceData, "" + item.code, item);
    }
  });
  console.log(nestedServiceData);
  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.nestedServiceData", nestedServiceData));
  var serviceCategories = Object.values(nestedServiceData).filter(function (item) {
    return item.code;
  });
  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.serviceCategories", serviceCategories));
};
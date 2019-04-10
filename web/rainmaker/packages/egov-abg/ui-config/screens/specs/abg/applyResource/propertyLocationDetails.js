"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyLocationDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("../../../../../ui-utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showHideMapPopup = function showHideMapPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog", "props.open", !toggle));
};

var getMapLocator = function getMapLocator(textSchema) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-noc",
    componentPath: "MapLocator",
    props: {}
  };
};

var getDetailsFromProperty = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var propertyId, tenantId, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            propertyId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].propertyId", "");
            tenantId = (0, _localStorageUtils.getTenantId)();

            if (tenantId) {
              _context.next = 6;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, "Please select city to search by property id !!", "warning"));
            return _context.abrupt("return");

          case 6:
            if (!propertyId) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return (0, _api.httpRequest)("post", "/pt-services-v2/property/_search?tenantId=" + tenantId + "&ids=" + propertyId, "_search", [], {});

          case 9:
            payload = _context.sent;

            if (payload && payload.Properties && payload.Properties.hasOwnProperty("length")) {
              if (payload.Properties.length === 0) {
                dispatch((0, _actions.toggleSnackbar)(true, "Property is not found with this Property Id", "info"));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID", "props.value", ""));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.value", {
                  value: payload.Properties[0].address.locality.code,
                  label: payload.Properties[0].address.locality.name
                }));
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address", payload.Properties[0].address));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown", "props.value", payload.Properties[0].address.tenantId));
              }
            }

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 13]]);
  }));

  return function getDetailsFromProperty(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var propertyLocationDetails = exports.propertyLocationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Property Location Details",
    labelKey: "NOC_PROPERTY_LOCATION_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),

  propertyDetailsConatiner: (0, _utils.getCommonContainer)({
    propertyId: (0, _utils.getTextField)({
      label: {
        labelName: "Property ID",
        labelKey: "NOC_PROPERTY_ID_LABEL"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "NOC_PROPERTY_ID_PLACEHOLDER"
      },
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            getDetailsFromProperty(state, dispatch);
          }
        }
      },
      // title: {
      //   value:
      //     "If you have already assessed your property, then please search your property by your PAID",
      //   key: "NOC_PROPERTY_ID_TOOLTIP_MESSAGE"
      // },
      // infoIcon: "info_circle",
      jsonPath: "noc.address.propertyId"
    }),
    propertyCity: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: { labelName: "City", labelKey: "NOC_PROPERTY_CITY_LABEL" },
      optionLabel: "name",
      placeholder: {
        labelName: "Select City",
        labelKey: "NOC_PROPERTY_CITY_PLACEHOLDER"
      },
      sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
      jsonPath: "Licenses[0].tradeLicenseDetail.address.tenantId",
      required: true,
      props: {
        required: true,
        disabled: true
      }
    }), {
      beforeFieldChange: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
          var payload;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  //Below only runs for citizen - not required here in employee
                  dispatch((0, _actions.prepareFinalObject)("noc.address.city", action.value));
                  _context2.prev = 1;
                  _context2.next = 4;
                  return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: action.value }], {});

                case 4:
                  payload = _context2.sent;

                  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", payload.TenantBoundary && payload.TenantBoundary[0].boundary));
                  // console.log(payload.TenantBoundary[0].boundary);
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", payload.TenantBoundary && payload.TenantBoundary[0].boundary));
                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](1);

                  console.log(_context2.t0);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, undefined, [[1, 9]]);
        }));

        return function beforeFieldChange(_x3, _x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }()
    }),
    propertyPlotSurveyNo: (0, _utils.getTextField)({
      label: {
        labelName: "Plot/Survey No.",
        labelKey: "NOC_PROPERTY_PLOT_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Plot/Survey No.",
        labelKey: "NOC_PROPERTY_PLOT_NO_PLACEHOLDER"
      },
      // pattern: getPattern("DoorHouseNo"),
      jsonPath: "noc.address.doorHouseNo"
    }),
    propertyBuilidingName: (0, _utils.getTextField)({
      label: {
        labelName: "Building/Colony Name",
        labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Building/Colony Name",
        labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "noc.address.buildingName"
    }),
    propertyStreetName: (0, _utils.getTextField)({
      label: {
        labelName: "Street Name",
        labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Street Name",
        labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "noc.address.street"
    }),
    propertyMohalla: (0, _utils.getTextField)({
      label: {
        labelName: "Mohalla",
        labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_LABEL"
      },
      placeholder: {
        labelName: "Enter Mohalla",
        labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("BuildingStreet"),
      jsonPath: "noc.address.mohalla",
      required: true
    }),
    propertyPincode: (0, _utils.getTextField)({
      label: {
        labelName: "Pincode",
        labelKey: "NOC_PROPERTY_DETAILS_PIN_LABEL"
      },
      placeholder: {
        labelName: "Enter Pincode",
        labelKey: "NOC_PROPERTY_DETAILS_PIN_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Pincode"),
      jsonPath: "noc.address.pincode",
      required: true
    }),
    propertyGisCoordinates: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "gis-div-css",
        style: {
          width: "100%",
          cursor: "pointer"
        }
      },
      jsonPath: "noc.address.latitude",
      onClickDefination: {
        action: "condition",
        callBack: showHideMapPopup
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      children: {
        gisTextField: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Locate on Map",
            labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_LABEL"
          },
          placeholder: {
            labelName: "Select your property location on map",
            labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_PLACEHOLDER"
          },
          jsonPath: "noc.address.latitude",
          iconObj: {
            iconName: "gps_fixed",
            position: "end"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            disabled: true,
            cursor: "pointer"
          }
        }))
      }
    },
    propertyFirestation: (0, _utils.getTextField)({
      label: {
        labelName: "Applicable Fire Station",
        labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_LABEL"
      },
      placeholder: {
        labelName: "Enter Applicable Fire Station",
        labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_PLACEHOLDER"
      },
      // pattern: getPattern("ElectricityConnNo"),
      jsonPath: "noc.address.additionalDetail.fireStation"
    })
  }),
  mapsDialog: {
    componentPath: "Dialog",
    props: {
      open: false
    },
    children: {
      dialogContent: {
        componentPath: "DialogContent",
        children: {
          popup: getMapLocator()
        }
      }
    }
  }
}, {
  style: { overflow: "visible" }
});
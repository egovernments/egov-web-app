"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertySummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hrms",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var propertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "noc-summary",
    scheama: (0, _utils.getCommonGrayCard)({
      propertyContainer: (0, _utils.getCommonContainer)({
        propertyType: (0, _utils.getLabelWithValue)({
          labelName: "Property Type",
          labelKey: "NOC_PROPERTY_TYPE_LABEL"
        }, { jsonPath: "noc.buildingDetails.buildingType" }),
        buildingName: (0, _utils.getLabelWithValue)({
          labelName: "Name Of Building",
          labelKey: "NOC_BUILDING_NAME_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].buildingName" }),
        buildingUsageType: (0, _utils.getLabelWithValue)({
          labelName: "Building Usage Type",
          labelKey: "NOC_BUILDING_USAGE_TYPE_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].buildingUsageType" }),
        buildingUsageSubType: (0, _utils.getLabelWithValue)({
          labelName: "Building Usage Subtype",
          labelKey: "NOC_BUILDING_USAGE_SUBTYPE_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].buildingUsageSubType" }),
        noOfFloors: (0, _utils.getLabelWithValue)({ labelName: "No. of Floors", labelKey: "NOC_NO_OF_FLOORS_LABEL" }, { jsonPath: "noc.buildingDetails.building[0].noOfFloors" }),
        noOfBasements: (0, _utils.getLabelWithValue)({
          labelName: "No. of Basement",
          labelKey: "NOC_NO_OF_BASEMENT_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].noOfBasements" }),
        plotSize: (0, _utils.getLabelWithValue)({
          labelName: "Plot Size (in sq meters)",
          labelKey: "NOC_PLOT_SIZE_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].plotSize" }),
        groundBuiltupArea: (0, _utils.getLabelWithValue)({
          labelName: "Ground Builtup Area (sq meters)",
          labelKey: "NOC_GROUND_BUILTUP_AREA_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].builtupArea" }),
        heightOfBuilding: (0, _utils.getLabelWithValue)({
          labelName: "Height of Building (in meters)",
          labelKey: "NOC_BUILDING_HEIGHT_LABEL"
        }, { jsonPath: "noc.buildingDetails.building[0].heightOfBuilding" })
      })
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "noc.buildingDetails.building",
    prefixSourceJsonPath: "children.cardContent.children.propertyContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var propertyLocationDetails = (0, _utils.getCommonGrayCard)({
  propertyLocationContainer: (0, _utils.getCommonContainer)({
    propertyId: (0, _utils.getLabelWithValue)({
      labelName: "Property ID",
      labelKey: "NOC_PROPERTY_ID_LABEL"
    }, { jsonPath: "noc.address.propertyId" }),
    city: (0, _utils.getLabelWithValue)({
      labelName: "City",
      labelKey: "NOC_CITY_LABEL"
    }, { jsonPath: "noc.address.city" }),
    doorHouseNo: (0, _utils.getLabelWithValue)({
      labelName: "Door/House No.",
      labelKey: "NOC_DOOR_HOUSE_NO_LABEL"
    }, { jsonPath: "noc.address.doorHouseNo" }),
    buildingCompanyName: (0, _utils.getLabelWithValue)({
      labelName: "Building/Company Name",
      labelKey: "NOC_BUILDING_COMPANY_NAME_LABEL"
    }, { jsonPath: "noc.address.buildingName" }),
    streetName: (0, _utils.getLabelWithValue)({ labelName: "Street Name", labelKey: "NOC_STREET_NAME_LABEL" }, { jsonPath: "noc.address.street" }),
    mohalla: (0, _utils.getLabelWithValue)({
      labelName: "Mohalla",
      labelKey: "NOC_MOHALLA_LABEL"
    }, { jsonPath: "noc.address.mohalla" }),
    pincode: (0, _utils.getLabelWithValue)({
      labelName: "Pincode",
      labelKey: "NOC_PINCODE_LABEL"
    }, { jsonPath: "noc.address.pincode" }),
    locationOnMap: (0, _utils.getLabelWithValue)({
      labelName: "Location On Map",
      labelKey: "NOC_LOCATION_ON_MAP_LABEL"
    }, { jsonPath: "noc.address.latitude" }),
    applicableFireStation: (0, _utils.getLabelWithValue)({
      labelName: "Applicable Fire Station",
      labelKey: "NOC_APPLICABLE_FIRE_STATION_LABEL"
    }, { jsonPath: "noc.address.additionalDetail.fireStation" })
  })
});

var propertySummary = exports.propertySummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Property Details",
        labelKey: "NOC_PROPERTY_DETAILS_HEADER"
      })),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Edit",
            labelKey: "TL_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _index.gotoApplyWithStep)(state, dispatch, 1);
          }
        }
      }
    }
  },
  propertyDetailsHeader: getHeader("Property Details"),
  break: (0, _utils.getBreak)(),
  cardOne: propertyDetails,
  propertyLocationDetailsHeader: getHeader("Property Location Details"),
  cardTwo: propertyLocationDetails
});
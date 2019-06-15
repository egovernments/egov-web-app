import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";

const test = value => {
  value = value ? value.split(".")[0] : "";
  return value;
};

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hrms",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

const propertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "noc-summary",
    scheama: getCommonGrayCard({
      propertyContainer: getCommonContainer({
        propertyType: getLabelWithValue(
          {
            labelName: "Property Type",
            labelKey: "NOC_PROPERTY_TYPE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings"
          }
        ),
        buildingName: getLabelWithValue(
          {
            labelName: "Name Of Building",
            labelKey: "NOC_NAME_OF_BUILDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].name"
          }
        ),
        buildingUsageType: getLabelWithValue(
          {
            labelName: "Building Usage Type",
            labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
            callBack: test,
            localePrefix: {
              moduleName: "firenoc",
              masterName: "BuildingType"
            }
          }
        ),
        buildingUsageSubType: getLabelWithValue(
          {
            labelName: "Building Usage Subtype",
            labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
            localePrefix: {
              moduleName: "firenoc",
              masterName: "BuildingType"
            }
          }
        ),
        noOfFloors: getLabelWithValue(
          { labelName: "No. of Floors", labelKey: "NOC_NO_OF_FLOORS_LABEL" },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uoms.NO_OF_FLOORS"
          }
        ),
        noOfBasements: getLabelWithValue(
          {
            labelName: "No. of Basement",
            labelKey: "NOC_PROPERTY_DETAILS_NO_OF_BASEMENTS_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uoms.NO_OF_BASEMENTS"
          }
        ),
        plotSize: getLabelWithValue(
          {
            labelName: "Plot Size (in sq meters)",
            labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uoms.PLOT_SIZE"
          }
        ),
        groundBuiltupArea: getLabelWithValue(
          {
            labelName: "Ground Builtup Area (sq meters)",
            labelKey: "NOC_PROPERTY_DETAILS_GROUND_FLOOR_BUILTUP_AREA_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uoms.BUILTUP_AREA"
          }
        ),
        heightOfBuilding: getLabelWithValue(
          {
            labelName: "Height of Building (in meters)",
            labelKey: "NOC_PROPERTY_DETAILS_HEIGHT_OF_BUILDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uoms.HEIGHT_OF_BUILDING"
          }
        )
      })
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "FireNOCs[0].fireNOCDetails.buildings",
    prefixSourceJsonPath: "children.cardContent.children.propertyContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

const propertyLocationDetails = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
    propertyId: getLabelWithValue(
      {
        labelName: "Property ID",
        labelKey: "NOC_PROPERTY_ID_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId" }
    ),
    city: getLabelWithValue(
      {
        labelName: "City",
        labelKey: "NOC_PROPERTY_CITY_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        }
      }
    ),
    doorHouseNo: getLabelWithValue(
      {
        labelName: "Door/House No.",
        labelKey: "NOC_SUMMARY_PROPERTY__LOCATION_DOOR_HOUSE_NO_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" }
    ),
    buildingCompanyName: getLabelWithValue(
      {
        labelName: "Building/Company Name",
        labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName"
      }
    ),
    streetName: getLabelWithValue(
      {
        labelName: "Street Name",
        labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.street" }
    ),
    mohalla: getLabelWithValue(
      {
        labelName: "Mohalla",
        labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code"
      }
    ),
    pincode: getLabelWithValue(
      {
        labelName: "Pincode",
        labelKey: "NOC_PROPERTY_DETAILS_PIN_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode" }
    ),
    locationOnMap: getLabelWithValue(
      {
        labelName: "Location On Map",
        labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.latitude"
      }
    ),
    applicableFireStation: getLabelWithValue(
      {
        labelName: "Applicable Fire Station",
        labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.firestationId",
        localePrefix: {
          moduleName: "firenoc",
          masterName: "FireStations"
        }
      }
    )
  })
});

export const propertySummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Property Details",
          labelKey: "NOC_COMMON_PROPERTY_DETAILS"
        })
      },
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
          buttonLabel: getLabel({
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithStep(state, dispatch, 1);
          }
        }
      }
    }
  },
  propertyDetailsHeader: getHeader("Property Details"),
  break: getBreak(),
  cardOne: propertyDetails,
  propertyLocationDetailsHeader: getHeader("Property Location Details"),
  cardTwo: propertyLocationDetails
});

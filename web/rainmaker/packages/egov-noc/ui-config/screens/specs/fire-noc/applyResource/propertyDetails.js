"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var previousUoms = [];

var dynamic = function dynamic(uom, path, buildingIndex) {
  return (0, _extends3.default)({}, (0, _utils.getTextField)({
    label: {
      labelKey: "NOC_PROPERTY_DETAILS_" + uom + "_LABEL"
    },
    placeholder: {
      labelKey: "NOC_PROPERTY_DETAILS_" + uom + "_PLACEHOLDER"
    },
    pattern: /^[0-9]*$/i,
    jsonPath: "FireNOCs[0].fireNOCDetails.buildings[" + buildingIndex + "].uomsMap." + uom,
    required: true,
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    }
  }), {
    componentJsonpath: path + "." + uom,
    beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
      action.value = parseInt(action.value);
      return action;
    }
  });
};

var prepareSelectField = function prepareSelectField(uom, limit) {
  var data = [];
  for (var i = 0; i <= limit; i++) {
    data.push({ code: "" + i });
  }
  return (0, _extends3.default)({}, (0, _utils.getSelectField)({
    label: {
      labelKey: "NOC_PROPERTY_DETAILS_" + uom + "_LABEL"
    },
    placeholder: {
      labelKey: "NOC_PROPERTY_DETAILS_" + uom + "_PLACEHOLDER"
    },
    pattern: /^[0-9]*$/i,
    errorMessage: "Invalid number",
    required: true,
    jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap." + uom,
    data: data,
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    }
  }));
};

var prepareTextField = function prepareTextField(uom) {
  return (0, _extends3.default)({}, (0, _utils.getTextField)({
    label: {
      labelKey: "NOC_PROPERTY_DETAILS_" + uom + "_LABEL"
    },
    placeholder: {
      labelKey: "NOC_PROPERTY_DETAILS_" + uom + "_PLACEHOLDER"
    },
    pattern: /^[0-9]*$/i,
    errorMessage: "Invalid Area",
    // required: true,
    jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap." + uom,
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    }
  }));
};

var checkUomIsDefault = function checkUomIsDefault(uom) {
  if (["NO_OF_FLOORS", "NO_OF_BASEMENTS", "PLOT_SIZE", "BUILTUP_AREA", "HEIGHT_OF_BUILDING"].indexOf(uom) >= 0) {
    return true;
  }
  return false;
};

var setMandatory = function setMandatory(dispatch, path, value) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path, "required", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path, "props.required", value));
};

var commonBuildingData = function commonBuildingData(buildingType) {
  var plotSize = {};
  if (buildingType === "SINGLE") {
    plotSize = (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Plot Size (in Sq meters)",
        labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_LABEL"
      },
      placeholder: {
        labelName: "Enter Plot Size (in Sq meters)",
        labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_PLACEHOLDER"
      },
      pattern: /^[0-9]*$/i,
      errorMessage: "Invalid Plot size.",
      jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].plotsize",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }));
  }
  return {
    buildingName: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Name of the Building",
        labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_LABEL"
      },
      placeholder: {
        labelName: "Enter Name of the Building",
        labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("TradeName"),
      errorMessage: "Invalid Name",
      jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].name",
      // props: {
      //   style: {
      //     maxWidth: "400px"
      //   }
      // },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    })),
    dummyDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      props: {
        disabled: true
      }
    },
    buildingUsageType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "Building Usage Type as per NBC",
        labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"
      },
      placeholder: {
        labelName: "Select Building Usage Type",
        labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_PLACEHOLDER"
      },
      required: true,
      localePrefix: {
        moduleName: "firenoc",
        masterName: "BuildingType"
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageTypeMajor",
      sourceJsonPath: "applyScreenMdmsData.DropdownsData.BuildingUsageType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }), {
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        var path = action.componentJsonpath.replace(/.buildingUsageType$/, ".buildingSubUsageType");
        var buildingUsageTypeData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType", []);
        var buildingSubUsageTypeData = buildingUsageTypeData.filter(function (item) {
          return item.active && item.code.startsWith(action.value);
        });
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path, "props.data", buildingSubUsageTypeData));
      }
    }),
    buildingSubUsageType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "Building Usage Subtype as per NBC",
        labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"
      },
      placeholder: {
        labelName: "Select Building Usage Subtype",
        labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_PLACEHOLDER"
      },
      required: true,
      localePrefix: {
        moduleName: "firenoc",
        masterName: "BuildingType"
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }), {
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        // Get the list of uom for selected building subtype
        var uomsList = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType", []).filter(function (item) {
          return item.code === action.value;
        });
        var uoms = (0, _get2.default)(uomsList, "[0].uom", []);

        // Get the path of the current childrens
        var path = action.componentJsonpath.replace(/.buildingSubUsageType$/, "");

        // Get the index in case on multi-item
        var buildingIndex = (0, _get2.default)(path.match(/\d+/), "[0]", 0);

        // Remove previous dynamic uoms
        previousUoms.forEach(function (uom) {
          !checkUomIsDefault(uom) && dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path + "." + uom, "visible", false));
        });

        // Set required fields defaults
        setMandatory(dispatch, path + ".PLOT_SIZE", false);
        setMandatory(dispatch, path + ".BUILTUP_AREA", false);
        setMandatory(dispatch, path + ".HEIGHT_OF_BUILDING", false);

        // Dynamically create UOM's based on building subtype selection
        uoms.forEach(function (uom) {
          if (checkUomIsDefault(uom)) {
            setMandatory(dispatch, path + "." + uom, true);
          } else {
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", path, uom, dynamic(uom, path, buildingIndex)));
          }
        });

        // Set previous uoms array
        previousUoms = uoms;
      }
    }),
    NO_OF_FLOORS: prepareSelectField("NO_OF_FLOORS", 20),
    NO_OF_BASEMENTS: prepareSelectField("NO_OF_BASEMENTS", 5),
    PLOT_SIZE: prepareTextField("PLOT_SIZE"),
    BUILTUP_AREA: prepareTextField("BUILTUP_AREA"),
    HEIGHT_OF_BUILDING: prepareTextField("HEIGHT_OF_BUILDING")
  };
};

var propertyDetails = exports.propertyDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Property Details",
    labelKey: "PROPERTY_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  break: (0, _utils.getBreak)(),
  propertyDetailsConatiner: (0, _utils.getCommonContainer)({
    buildingRadioGroup: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings",
      props: {
        required: true,
        label: { name: "No. of Buildings", key: "NOC_NO_OF_BUILDINGS_LABEL" },
        buttons: [{
          labelName: "Single Building",
          labelKey: "NOC_NO_OF_BUILDINGS_SINGLE_RADIOBUTTON",
          value: "SINGLE"
        }, {
          label: "Multiple Building",
          labelKey: "NOC_NO_OF_BUILDINGS_MULTIPLE_RADIOBUTTON",
          value: "MULTIPLE"
        }],
        jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings",
        defaultValue: "SINGLE"
      },
      type: "array",
      afterFieldChange: function afterFieldChange(action, state, dispatch) {
        var singleBuildingContainerJsonPath = "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer";
        var multipleBuildingContainerJsonPath = "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer";
        if (action.value === "SINGLE") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", singleBuildingContainerJsonPath, "props.style", {}));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", multipleBuildingContainerJsonPath, "props.style", { display: "none" }));
        } else if (action.value === "MULTIPLE") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", singleBuildingContainerJsonPath, "props.style", { display: "none" }));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", multipleBuildingContainerJsonPath, "props.style", {}));
        }
      }
    },
    buildingDataCard: (0, _utils.getCommonContainer)({
      singleBuildingContainer: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12
        },
        children: {
          singleBuilding: (0, _utils.getCommonGrayCard)({
            singleBuildingCard: (0, _utils.getCommonContainer)(commonBuildingData("SINGLE"))
          })
        }
      },
      multipleBuildingContainer: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: {
            display: "none"
          }
        },
        gridDefination: {
          xs: 12
        },
        children: {
          multipleBuilding: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
              scheama: (0, _utils.getCommonGrayCard)({
                multipleBuildingCard: (0, _utils.getCommonContainer)(commonBuildingData("MULTIPLE"))
              }),
              items: [],
              addItemLabel: {
                labelKey: "NOC_PROPERTY_DETAILS_ADD_BUILDING_LABEL",
                labelName: "ADD BUILDING"
              },
              sourceJsonPath: "FireNOCs[0].fireNOCDetails.buildings",
              // prefixSourceJsonPath:
              //   "children.cardContent.children.buildingDataCard.children.multipleBuildingContainer.children",
              prefixSourceJsonPath: "children.cardContent.children.multipleBuildingCard.children"
            },
            type: "array"
          }
        }
      }
    })
  })
});
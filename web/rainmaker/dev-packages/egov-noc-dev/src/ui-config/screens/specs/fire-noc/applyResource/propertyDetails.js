import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonTitle,
  getSelectField,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const commonBuildingData = buildingType => {
  let plotSize = {};
  if (buildingType === "SINGLE") {
    plotSize = {
      ...getTextField({
        label: {
          labelName: "Plot Size (in Sq meters)",
          labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_LABEL"
        },
        placeholder: {
          labelName: "Enter Plot Size (in Sq meters)",
          labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_PLACEHOLDER"
        },
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].plotSize",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    };
  }
  return {
    buildingName: {
      ...getTextField({
        label: {
          labelName: "Name of the Building",
          labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of the Building",
          labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_PLACEHOLDER"
        },
        // required: true,
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].name",
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
      })
    },
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
    buildingUsageType: {
      ...getSelectField({
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
          moduleName: "egov-firenoc",
          masterName: "BuildingType"
        },
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].usageType",
        sourceJsonPath: "applyScreenMdmsData.DropdownsData.BuildingUsageType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      afterFieldChange: (action, state, dispatch) => {
        let path = action.componentJsonpath.replace(
          /.buildingUsageType$/,
          ".buildingSubUsageType"
        );
        let buildingUsageTypeData = get(
          state,
          "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
          []
        );
        let buildingSubUsageTypeData = buildingUsageTypeData.filter(item => {
          return item.active && item.code.startsWith(action.value);
        });
        dispatch(
          handleField("apply", path, "props.data", buildingSubUsageTypeData)
        );
      }
    },
    buildingSubUsageType: {
      ...getSelectField({
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
          moduleName: "egov-firenoc",
          masterName: "BuildingType"
        },
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].usageSubType",
        // data: [
        //   {
        //     code: "Commercial"
        //   },
        //   {
        //     code: "Non-Commercial"
        //   }
        // ],
        // sourceJsonPath: "noc.buildingUsageSubType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    noOfFloors: {
      ...getSelectField({
        label: {
          labelName:
            "No. Of Floors (Excluding Basement, Including Ground Floor)",
          labelKey: "NOC_PROPERTY_DETAILS_NO_OF_FLOORS_LABEL"
        },
        placeholder: {
          labelName: "Select No. of Floors",
          labelKey: "NOC_PROPERTY_DETAILS_NO_OF_FLOORS_PLACEHOLDER"
        },
        required: true,
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].noOfFloors",
        data: [
          {
            code: "1"
          },
          {
            code: "2"
          },
          {
            code: "3"
          }
        ],
        sourceJsonPath: "noc.noOfFloors",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    noOfBasements: {
      ...getSelectField({
        label: {
          labelName: "No. Of Basements",
          labelKey: "NOC_PROPERTY_DETAILS_NO_OF_BASEMENTS_LABEL"
        },
        placeholder: {
          labelName: "Select No. Of Basements",
          labelKey: "NOC_PROPERTY_DETAILS_NO_OF_BASEMENTS_PLACEHOLDER"
        },
        required: true,
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].noOfBasements",
        data: [
          {
            code: "1"
          },
          {
            code: "2"
          }
        ],
        sourceJsonPath: "noc.noOfBasements",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    plotSize: plotSize,
    groundFloorBuiltupArea: {
      ...getTextField({
        label: {
          labelName: "Ground Floor Builtup Area (in Sq meters)",
          labelKey: "NOC_PROPERTY_DETAILS_GROUND_FLOOR_BUILTUP_AREA_LABEL"
        },
        placeholder: {
          labelName: "Enter Ground Floor Builtup Area in Sq meters",
          labelKey: "NOC_PROPERTY_DETAILS_GROUND_FLOOR_BUILTUP_AREA_PLACEHOLDER"
        },
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].builtupArea",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    heightOfBuilding: {
      ...getTextField({
        label: {
          labelName: "Height of the Building from Ground level (in meters)",
          labelKey: "NOC_PROPERTY_DETAILS_HEIGHT_OF_BUILDING_LABEL"
        },
        placeholder: {
          labelName: "Enter Height of the Building in meters",
          labelKey: "NOC_PROPERTY_DETAILS_HEIGHT_OF_BUILDING_PLACEHOLDER"
        },
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].heightOfBuilding",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    }
  };
};

export const propertyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Property Details",
      labelKey: "PROPERTY_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  propertyDetailsConatiner: getCommonContainer({
    buildingRadioGroup: {
      uiFramework: "custom-containers",
      moduleName: "egov-noc",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath:
        "FireNOCs[0].fireNOCDetails.buildingDetails.buildings.noOfBuildings",
      props: {
        required: true,
        label: { name: "No. of Buildings", key: "NOC_NO_OF_BUILDINGS_LABEL" },
        buttons: [
          {
            labelName: "Single Building",
            labelKey: "NOC_NO_OF_BUILDINGS_SINGLE_RADIOBUTTON",
            value: "SINGLE"
          },
          {
            label: "Multiple Building",
            labelKey: "NOC_NO_OF_BUILDINGS_MULTIPLE_RADIOBUTTON",
            value: "MULTIPLE"
          }
        ],
        jsonPath:
          "FireNOCs[0].fireNOCDetails.buildingDetails.buildings.noOfBuildings",
        defaultValue: "SINGLE"
      },
      type: "array",
      afterFieldChange: (action, state, dispatch) => {
        let singleBuildingContainerJsonPath =
          "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer";
        let multipleBuildingContainerJsonPath =
          "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer";
        if (action.value === "SINGLE") {
          dispatch(
            handleField(
              "apply",
              singleBuildingContainerJsonPath,
              "props.style",
              {}
            )
          );
          dispatch(
            handleField(
              "apply",
              multipleBuildingContainerJsonPath,
              "props.style",
              { display: "none" }
            )
          );
        } else if (action.value === "MULTIPLE") {
          dispatch(
            handleField(
              "apply",
              singleBuildingContainerJsonPath,
              "props.style",
              { display: "none" }
            )
          );
          dispatch(
            handleField(
              "apply",
              multipleBuildingContainerJsonPath,
              "props.style",
              {}
            )
          );
        }
      }
    },
    buildingDataCard: getCommonContainer({
      singleBuildingContainer: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12
        },
        children: {
          singleBuilding: getCommonGrayCard({
            singleBuildingCard: getCommonContainer(commonBuildingData("SINGLE"))
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
              scheama: getCommonGrayCard({
                multipleBuildingCard: getCommonContainer(
                  commonBuildingData("MULTIPLE")
                )
              }),
              items: [],
              addItemLabel: {
                labelKey: "NOC_PROPERTY_DETAILS_ADD_BUILDING_LABEL",
                labelName: "ADD BUILDING"
              },
              sourceJsonPath:
                "FireNOCs[0].fireNOCDetails.buildingDetails.buildings",
              // prefixSourceJsonPath:
              //   "children.cardContent.children.buildingDataCard.children.multipleBuildingContainer.children",
              prefixSourceJsonPath:
                "children.cardContent.children.multipleBuildingCard.children"
            },
            type: "array"
          }
        }
      }
    })
  })
});

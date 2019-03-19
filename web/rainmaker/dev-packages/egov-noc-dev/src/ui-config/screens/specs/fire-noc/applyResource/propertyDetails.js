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

const commonBuildingData = buildingType => {
  let plotSize = {};
  if (buildingType === "single") {
    plotSize = {
      ...getTextField({
        label: {
          labelName: "Plot Size (in Sq meters)",
          labelKey: "NOC_PLOT_SIZE_LABEL"
        },
        placeholder: {
          labelName: "Enter Plot Size (in Sq meters)",
          labelKey: "NOC_PLOT_SIZE_PLACEHOLDER"
        },
        jsonPath: "plotSize",
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
          labelKey: "NOC_NAME_OF_BUILDING_LABEL"
        },
        placeholder: {
          labelName: "Name of the Building",
          labelKey: "NOC_ENTER_NAME_OF_BUILDING_PLACEHOLDER"
        },
        // required: true,
        jsonPath: "buildingName",
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
          labelKey: "NOC_BUILDING_USAGE_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Building Usage Type",
          labelKey: "NOC_BUILDING_USAGE_TYPE_PLACEHOLDER"
        },
        required: true,
        jsonPath: "buildingUsageType",
        data: [
          {
            code: "MALE"
          },
          {
            code: "FEMALE"
          }
        ],
        sourceJsonPath: "buildingUsageType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    buildingSubUsageType: {
      ...getSelectField({
        label: {
          labelName: "Building Usage Subtype as per NBC",
          labelKey: "NOC_BUILDING_USAGE_SUBTYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Building Usage Subtype",
          labelKey: "NOC_BUILDING_USAGE_SUBTYPE_PLACEHOLDER"
        },
        required: true,
        jsonPath: "buildingUsageSubType",
        data: [
          {
            code: "MALE"
          },
          {
            code: "FEMALE"
          }
        ],
        sourceJsonPath: "buildingUsageSubType",
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
          labelKey: "NOC_NO_OF_FLOORS_LABEL"
        },
        placeholder: {
          labelName: "Select No. of Floors",
          labelKey: "NOC_NO_OF_FLOORS_PLACEHOLDER"
        },
        required: true,
        jsonPath: "noOfFloors",
        data: [
          {
            code: "MALE"
          },
          {
            code: "FEMALE"
          }
        ],
        sourceJsonPath: "noOfFloors",
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
          labelKey: "NOC_NO_OF_BASEMENTS_LABEL"
        },
        placeholder: {
          labelName: "Select No. Of Basements",
          labelKey: "NOC_NO_OF_BASEMENTS_PLACEHOLDER"
        },
        required: true,
        jsonPath: "noOfBasements",
        data: [
          {
            code: "MALE"
          },
          {
            code: "FEMALE"
          }
        ],
        sourceJsonPath: "noOfBasements",
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
          labelKey: "NOC_GROUND_FLOOR_BUILTUP_AREA_LABEL"
        },
        placeholder: {
          labelName: "Enter Ground Floor Builtup Area in Sq meters",
          labelKey: "NOC_GROUND_FLOOR_BUILTUP_AREA_PLACEHOLDER"
        },
        jsonPath: "builtupArea",
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
          labelKey: "NOC_HEIGHT_OF_BUILDING_LABEL"
        },
        placeholder: {
          labelName: "Enter Height of the Building in meters",
          labelKey: "NOC_HEIGHT_OF_BUILDING_PLACEHOLDER"
        },
        jsonPath: "heightOfBuilding",
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
      jsonPath: "buildingType",
      props: {
        label: "No. of Buildings",
        buttons: ["Single Building", "Multiple Building"],
        jsonPath: "buildingType",
        defaultValue: "Single Building"
      },
      type: "array",
      afterFieldChange: (action, state, dispatch) => {
        let singleBuildingContainerJsonPath =
          "components.div.children.formwizardFirstStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer";
        let multipleBuildingContainerJsonPath =
          "components.div.children.formwizardFirstStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer";
        if (action.value === "Single Building") {
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
        } else if (action.value === "Multiple Building") {
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
        children: {
          singleBuilding: getCommonGrayCard({
            singleBuildingCard: getCommonContainer(commonBuildingData("single"))
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
        children: {
          multipleBuilding: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
              scheama: getCommonGrayCard({
                multipleBuildingCard: getCommonContainer(
                  commonBuildingData("multiple")
                )
              }),
              items: [],
              addItemLabel: "ADD BUILDING",
              prefixSourceJsonPath:
                "children.cardContent.children.buildingDataCard.multipleBuildingContainer.children"
            },
            type: "array"
          }
        }
      }
    })
  })
});

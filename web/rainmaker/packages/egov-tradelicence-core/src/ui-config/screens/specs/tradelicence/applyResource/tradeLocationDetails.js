import {
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "../../../../../ui-utils/api";
import {
  getIconStyle,
  getContainerWithElement,
  getMapLocator
} from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { showHideMapPopup, getDetailsFromProperty } from "../../utils";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

export const tradeLocationDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please Provide Trade Location Details",
    labelKey: "TL_NEW_TRADE_DETAILS_HEADER_TRADE_LOC_DETAILS"
  }),
  // paragraph: getCommonParagraph({
  //   labelName:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  // }),

  tradeDetailsConatiner: getCommonContainer({
    tradeLocPropertyID: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        txt: getTextField({
          label: {
            labelName: "Property ID",
            labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_LABEL"
          },
          placeholder: {
            labelName: "Enter Property ID",
            labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_PLACEHOLDER"
          },

          // pattern: getPattern("PropertyID"),
          iconObj: {
            iconName: "search",
            position: "end",
            color: "#FE7A51",
            // downloadReceiptButtonLabel: getLabel({
            //   labelName: "SEARCH",
            //   labelKey: "TL_CONFIRMATION_BUTTON_DOWN_REPT"
            // }),
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                getDetailsFromProperty(state, dispatch);
              }
            }
          },
          gridDefination: {
            xs: 11,
            sm: 11
          },
          jsonPath: "Licenses[0].propertyId"
        }),
        ico: {
          uiFramework: "custom-molecules-local",
          componentPath: "Tooltip",
          props: {
            val: {
              value: "Property Id Information",
              key: "TL_PROPERTY_ID_TOOLTIP_MESSAGE"
            },
            style: getIconStyle("textfieldIcon")
          },
          gridDefination: { xs: 1 }
        }
      },
      gridDefination: {
        xs: 12,
        sm: 6
      }
    },
    tradeLocCity: {
      ...getSelectField({
        label: { labelName: "City" },
        optionLabel: "name",
        placeholder: { labelName: "Select City" },
        sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
        jsonPath: "Licenses[0].tradeLicenseDetail.address.city",
        required: true,
        props: {
          required: true,
          disabled: true,
          value: localStorage.getItem("tenant-id")
        }
      }),
      beforeFieldChange: async (action, state, dispatch) => {
        // try {
        //   let payload = await httpRequest(
        //     "post",
        //     "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
        //     "_search",
        //     [{ key: "tenantId", value: action.value }],
        //     {}
        //   );
        //   dispatch(
        //     handleField(
        //       "apply",
        //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
        //       "props.suggestions",
        //       payload.TenantBoundary && payload.TenantBoundary[0].boundary
        //     )
        //   );
        //   dispatch(
        //     handleField(
        //       "apply",
        //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
        //       "props.value",
        //       ""
        //     )
        //   );
        // } catch (e) {
        //   console.log(e);
        // }
      }
    },
    tradeLocDoorHouseNo: getTextField({
      label: {
        labelName: "Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_PLACEHOLDER"
      },
      pattern: getPattern("DoorHouseNo"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.doorNo"
    }),
    tradeLocBuilidingName: getTextField({
      label: {
        labelName: "Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_PLACEHOLDER"
      },
      pattern: getPattern("BuildingStreet"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.buildingName"
    }),
    tradeLocStreetName: getTextField({
      label: {
        labelName: "Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_PLACEHOLDER"
      },
      pattern: getPattern("BuildingStreet"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.street"
    }),
    tradeLocMohalla: {
      uiFramework: "custom-containers-local",
      componentPath: "AutosuggestContainer",
      jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
      props: {
        suggestions: [],
        label: "Mohalla",
        style: {
          width: "100%"
        },
        // label: {
        //   labelName: "Mohalla",
        //   labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
        // },
        placeholder: "Select Mohalla",
        // placeholder: {
        //   labelName: "Enter Mohalla",
        //   labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_PLACEHOLDER"
        // },
        jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code",
        sourceJsonPath: "applyScreenMdmsData.tenant.localities",
        fullwidth: true,
        required: false,
        inputLabelProps: {
          shrink: true
        }
      },
      gridDefination: {
        xs: 12,
        sm: 6
      }
      // required: true
    },
    tradeLocPincode: getTextField({
      label: {
        labelName: "Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
      },
      placeholder: {
        labelName: "Enter Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_PLACEHOLDER"
      },
      pattern: getPattern("Pincode"),
      jsonPath: "Licenses[0].tradeLicenseDetail.address.pincode"
    }),
    tradeLocGISCoord: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "gis-div-css",
        style: {
          width: "100%"
        }
      },
      jsonPath: "Licenses[0].tradeLicenseDetail.address.latitude",
      onClickDefination: {
        action: "condition",
        callBack: showHideMapPopup
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      children: {
        gisTextField: {
          ...getTextField({
            label: {
              labelName: "GIS Coordinates",
              labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_LABEL"
            },
            placeholder: {
              labelName: "Select your trade location on map",
              labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_PLACEHOLDER"
            },
            iconObj: {
              iconName: "gps_fixed",
              position: "end"
            },
            gridDefination: {
              xs: 12,
              sm: 12
            }
          })
        }
      }
    },
    tradeLocElectricity: getTextField({
      label: {
        labelName: "Electricity Connection No.",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Electricity Connection No. of Trade Loaction",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_PLACEHOLDER"
      },
      pattern: getPattern("ElectricityConnNo"),
      jsonPath:
        "Licenses[0].tradeLicenseDetail.additionalDetail.electricityConnectionNo"
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
});

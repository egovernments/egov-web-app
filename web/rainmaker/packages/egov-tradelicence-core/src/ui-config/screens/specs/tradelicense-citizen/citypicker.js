import {
  getCommonHeader,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { showCityPicker, applyForm } from "../utils";

export const cityPicker = getCommonContainer({
  header: getCommonHeader({
    labelName: "Pick your city.",
    labelKey: "TL_PICK_YOUR_CITY_CITIZEN"
  }),
  cityPicker: getCommonContainer({
    cityDropdown: {
      uiFramework: "custom-containers-local",
      componentPath: "AutosuggestContainer",
      jsonPath: "citiesByModule.citizenTenantId",
      required: true,
      gridDefination: {
        xs: 12,
        sm: 12
      },
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        label: { labelName: "City" },
        placeholder: { labelName: "Select City" },
        jsonPath: "citiesByModule.citizenTenantId",
        sourceJsonPath:
          "applyScreenMdmsData.common-masters.citiesByModule.TL.tenants",
        labelsFromLocalisation: true,
        fullwidth: true,
        required: true,
        inputLabelProps: {
          shrink: true
        }
      }
    },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        selectButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              width: "40px",
              height: "20px",
              marginRight: "4px"
            }
          },
          children: {
            previousButtonLabel: getLabel({
              labelName: "SELECT",
              labelKey: "TL_CITIZEN_SELECT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: applyForm
          }
        },
        cancelButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            style: {
              width: "40px",
              height: "20px",
              marginRight: "4px"
            }
          },
          children: {
            previousButtonLabel: getLabel({
              labelName: "CANCEL",
              labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: showCityPicker
          }
        }
      }
    }
  })
});

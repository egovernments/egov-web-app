import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getRadioButton } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareEditFlow } from "../apply";
import get from "lodash/get";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

export const nocDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "NOC Details",
      labelKey: "NOC_NEW_NOC_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  nocDetailsContainer: getCommonContainer({
    nocRadioGroup: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
      type: "array",
      props: {
        required: true,
        label: { name: "NOC Type", key: "NOC_TYPE_LABEL" },
        buttons: [
          {
            labelName: "New",
            labelKey: "NOC_TYPE_NEW_RADIOBUTTON",
            value: "NEW"
          },
          {
            label: "Provisional",
            labelKey: "NOC_TYPE_PROVISIONAL_RADIOBUTTON",
            value: "PROVISIONAL"
          }
        ],
        jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
        defaultValue: "PROVISIONAL"
      },
      type: "array",
      beforeFieldChange: (action, state, dispatch) => {
        if (action.value === "PROVISIONAL") {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber",
              "props.style",
              { visibility: "hidden" }
            )
          );
        } else {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber",
              "props.style",
              {}
            )
          );
        }
      }
    },
    provisionalNocNumber: {
      ...getTextField({
        label: {
          labelName: "Provisional fire NoC number",
          labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Provisional fire NoC number",
          labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_PLACEHOLDER"
        },
        pattern: /^[a-zA-Z0-9-]*$/i,
        errorMessage: "Invalid Fire-NOC No.",
        // required: true,
        // pattern: getPattern("MobileNo"),
        jsonPath: "FireNOCs[0].provisionFireNOCNumber",
        iconObj: {
          iconName: "search",
          position: "end",
          color: "#FE7A51",
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch, fieldInfo) => {
              let applicationNumber = get(
                state,
                "screenConfiguration.preparedFinalObject.FireNOCs[0].provisionFireNOCNumber",
                ""
              );
              prepareEditFlow(
                state,
                dispatch,
                applicationNumber,
                getTenantId()
              );
            }
          }
        }
        // title: {
        //   value: "Please search owner profile linked to the mobile no.",
        //   key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
        // },
        // infoIcon: "info_circle"
      })
    }
  })
});

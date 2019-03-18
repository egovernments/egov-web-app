import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getIconStyle,
  objectToDropdown,
  getTodaysDateInYMD,
  getFinancialYearDates,
  getNextMonthDateInYMD,
  setFilteredTradeTypes,
  getUniqueItemsFromArray,
  fillOldLicenseData,
  getTradeTypeDropdownData
} from "../../utils";
import { prepareFinalObject as pFO } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import filter from "lodash/filter";
import { getRadioButton } from "egov-ui-framework/ui-config/screens/specs/utils";

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
  nocDetailsConatiner: getCommonContainer({
    nocRadioGroup: {
      uiFramework: "custom-containers",
      moduleName: "egov-noc",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "nocType",
      props: {
        label: "NOC Type",
        buttons: ["New", "Provisional"],
        jsonPath: "nocType",
        defaultValue: "New"
      },
      type: "array",
      afterFieldChange: (action, state, dispatch) => {
        if (action.value === "Provisional") {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsConatiner.children.provisionalNocNumber",
              "props.style",
              { visibility: "hidden" }
            )
          );
        } else {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsConatiner.children.provisionalNocNumber",
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
        // required: true,
        // pattern: getPattern("MobileNo"),
        jsonPath: "nocNumber",
        iconObj: {
          iconName: "search",
          position: "end",
          color: "#FE7A51",
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch, fieldInfo) => {
              console.log("ASDASDSAD");
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

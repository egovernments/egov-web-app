import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

export const nocSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 12,
          sm: 10
        },
        ...getCommonSubHeader({
          labelName: "NOC Details",
          labelKey: "NOC_NOC_DETAILS_HEADER"
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
          xs: 12,
          sm: 2,
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
            labelName: "Edit",
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition"
          // callBack: (state, dispatch) => {
          //   changeStep(state, dispatch, "", 0);
          // }
        }
      }
    }
  },
  body: getCommonContainer({
    nocType: getLabelWithValue(
      {
        labelName: "NOC Type",
        labelKey: "NOC_NOC_TYPE_LABEL"
      },
      {
        jsonPath: "nocType"
        // callBack: value => {
        //   return value.split(".")[0];
        // }
      }
    ),
    fireNocNumber: getLabelWithValue(
      {
        labelName: "Provisional fire NoC number",
        labelKey: "NOC_NUMBER_LABEL"
      },
      {
        jsonPath: "fireNocNumber"
        // callBack: value => {
        //   return value.split(".")[1];
        // }
      }
    )
  })
});
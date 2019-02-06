import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../createResource/footer";

const assignmentCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      assignmentCardContainer: getCommonContainer({
        reviewStatus: getLabelWithValue(
          {
            labelName: "Status",
            labelKey: "HR_STATUS_LABEL"
          },
          { jsonPath: "Employee[0].serviceHistory[0].serviceStatus" }
        ),
        reviewServiceFrom: getLabelWithValue(
          {
            labelName: "Service From Date",
            labelKey: "HR_SER_FROM_DATE_LABEL"
          },
          { jsonPath: "Employee[0].serviceHistory[0].serviceFrom" }
        ),
        reviewServiceTo: getLabelWithValue(
          {
            labelName: "Service To Date",
            labelKey: "HR_SER_TO_DATE_LABEL"
          },
          { jsonPath: "Employee[0].serviceHistory[0].serviceTo" }
        ),
        reviewLocation: getLabelWithValue(
          {
            labelName: "Location",
            labelKey: "HR_LOCATION_LABEL"
          },
          { jsonPath: "Employee[0].serviceHistory[0].location" }
        ),
        reviewOrderNo: getLabelWithValue(
          { labelName: "Order No", labelKey: "HR_ORDER_NO_LABEL" },
          {
            jsonPath: "Employee[0].serviceHistory[0].orderNo"
          }
        ),
        reviewCurrentWorking: getLabelWithValue(
          {
            labelName: "Currently Working Here",
            labelKey: "HR_CURR_WORKING_LABEL"
          },
          {
            jsonPath: "Employee[0].serviceHistory[0].isCurrentPosition"
          }
        )
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].serviceHistory",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const getServiceDetailsView = (isReview = true) => {
  return getCommonGrayCard({
    headerDiv: {
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
            labelName: "Service Details",
            labelKey: "HR_SER_DET_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
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
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    viewOne: assignmentCard
  });
};

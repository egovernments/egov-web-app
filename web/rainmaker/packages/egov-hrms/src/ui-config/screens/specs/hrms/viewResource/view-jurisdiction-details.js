import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../createResource/footer";

const jurisdictionCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      jurisCardContainer: getCommonContainer({
        reviewHierarchy: getLabelWithValue(
          {
            labelName: "Hierarchy",
            labelKey: "HR_HIERARCHY_LABEL"
          },
          { jsonPath: "Employee[0].jurisdictions[0].hierarchy" }
        ),
        reviewBoundaryType: getLabelWithValue(
          {
            labelName: "Boundary Type",
            labelKey: "HR_BOUNDARY_TYPE_LABEL"
          },
          { jsonPath: "Employee[0].jurisdictions[0].boundaryType" }
        ),
        reviewBoundary: getLabelWithValue(
          { labelName: "Boundary", labelKey: "HR_BOUNDARY_LABEL" },
          { jsonPath: "Employee[0].jurisdictions[0].boundary" }
        )
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].jurisdictions",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const getJurisdictionDetailsView = (isReview = true) => {
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
            labelName: "Jurisdiction Details",
            labelKey: "HR_JURIS_DET_HEADER"
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
    viewOne: jurisdictionCard
  });
};

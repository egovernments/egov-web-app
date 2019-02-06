import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../createResource/footer";

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

const getDocuments = () => {
  return {
    uiFramework: "custom-containers-local",
    componentPath: "DownloadFileContainer",
    props: {
      //   sourceJsonPath: "LicensesTemp[0].reviewDocData",
      className: "review-documents",
      hardCodeData: [
        {
          title: "PAN Card",
          name: "Filename.jpg",
          link:
            "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
          linkText: "View"
        },
        {
          title: "Voter ID Card",
          name: "Filename.jpg",
          link:
            "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
          linkText: "View"
        },
        {
          title: "Passport",
          name: "Filename.jpg",
          link:
            "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
          linkText: "View"
        }
      ]
    }
  };
};

const educationCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      eduCardContainer: getCommonContainer({
        reviewDegree: getLabelWithValue(
          {
            labelName: "Degree",
            labelKey: "HR_DEGREE_LABEL"
          },
          { jsonPath: "Employee[0].education[0].qualification" }
        ),
        reviewYear: getLabelWithValue(
          {
            labelName: "Year",
            labelKey: "HR_YEAR_LABEL"
          },
          { jsonPath: "Employee[0].education[0].yearOfPassing" }
        ),
        reviewUniversity: getLabelWithValue(
          { labelName: "University", labelKey: "HR_UNIVERSITY_LABEL" },
          { jsonPath: "Employee[0].education[0].university" }
        ),
        reviewStream: getLabelWithValue(
          { labelName: "Stream", labelKey: "HR_STREAM_LABEL" },
          { jsonPath: "Employee[0].education[0].stream" }
        )
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].education",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

const deptCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      deptCardContainer: getCommonContainer({
        reviewTestName: getLabelWithValue(
          {
            labelName: "Test Name",
            labelKey: "HR_TEST_NAME_LABEL"
          },
          { jsonPath: "Employee[0].tests[0].test" }
        ),
        reviewYear: getLabelWithValue(
          {
            labelName: "Year",
            labelKey: "HR_YEAR_LABEL"
          },
          { jsonPath: "Employee[0].tests[0].yearOfPassing" }
        ),
        reviewRemarks: getLabelWithValue(
          { labelName: "Remarks", labelKey: "HR_REMARKS_LABEL" },
          { jsonPath: "Employee[0].tests[0].remarks" }
        )
        // documents: getDocuments()
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tests",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

const educationDetailsHeader = getHeader("Education Details");
const deptDetailsHeader = getHeader("Department Test Details");

export const getOtherDetailsView = (isReview = true) => {
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
            labelName: "Other Details",
            labelKey: "HR_OTHER_DET_HEADER"
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
    viewOne: educationDetailsHeader,
    viewTwo: educationCard,
    viewThree: deptDetailsHeader,
    viewFour: deptCard
  });
};

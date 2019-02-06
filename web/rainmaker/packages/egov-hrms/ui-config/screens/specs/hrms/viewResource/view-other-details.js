"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOtherDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../createResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hrms",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var getDocuments = function getDocuments() {
  return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-hrms",
    componentPath: "DownloadFileContainer",
    props: {
      //   sourceJsonPath: "LicensesTemp[0].reviewDocData",
      className: "review-documents",
      hardCodeData: [{
        title: "PAN Card",
        name: "Filename.jpg",
        link: "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
        linkText: "View"
      }, {
        title: "Voter ID Card",
        name: "Filename.jpg",
        link: "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
        linkText: "View"
      }, {
        title: "Passport",
        name: "Filename.jpg",
        link: "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
        linkText: "View"
      }]
    }
  };
};

var educationCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      eduCardContainer: (0, _utils.getCommonContainer)({
        reviewDegree: (0, _utils.getLabelWithValue)({
          labelName: "Degree",
          labelKey: "HR_DEGREE_LABEL"
        }, { jsonPath: "Employee[0].education[0].qualification" }),
        reviewYear: (0, _utils.getLabelWithValue)({
          labelName: "Year",
          labelKey: "HR_YEAR_LABEL"
        }, { jsonPath: "Employee[0].education[0].yearOfPassing" }),
        reviewUniversity: (0, _utils.getLabelWithValue)({ labelName: "University", labelKey: "HR_UNIVERSITY_LABEL" }, { jsonPath: "Employee[0].education[0].university" }),
        reviewStream: (0, _utils.getLabelWithValue)({ labelName: "Stream", labelKey: "HR_STREAM_LABEL" }, { jsonPath: "Employee[0].education[0].stream" })
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].education",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var deptCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      deptCardContainer: (0, _utils.getCommonContainer)({
        reviewTestName: (0, _utils.getLabelWithValue)({
          labelName: "Test Name",
          labelKey: "HR_TEST_NAME_LABEL"
        }, { jsonPath: "Employee[0].tests[0].test" }),
        reviewYear: (0, _utils.getLabelWithValue)({
          labelName: "Year",
          labelKey: "HR_YEAR_LABEL"
        }, { jsonPath: "Employee[0].tests[0].yearOfPassing" }),
        reviewRemarks: (0, _utils.getLabelWithValue)({ labelName: "Remarks", labelKey: "HR_REMARKS_LABEL" }, { jsonPath: "Employee[0].tests[0].remarks" })
        // documents: getDocuments()
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tests",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var educationDetailsHeader = getHeader("Education Details");
var deptDetailsHeader = getHeader("Department Test Details");

var getOtherDetailsView = exports.getOtherDetailsView = function getOtherDetailsView() {
  var isReview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelName: "Other Details",
          labelKey: "HR_OTHER_DET_HEADER"
        })),
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
            buttonLabel: (0, _utils.getLabel)({
              labelName: "Edit",
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _footer.changeStep)(state, dispatch, "", 0);
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
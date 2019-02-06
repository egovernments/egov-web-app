"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssignmentDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../createResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assignmentCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      assignmentCardContainer: (0, _utils.getCommonContainer)({
        reviewAssignedFrom: (0, _utils.getLabelWithValue)({
          labelName: "Assigned From Date",
          labelKey: "HR_ASMT_FROM_DATE_LABEL"
        }, { jsonPath: "Employee[0].assignments[0].fromDate" }),
        reviewAssignedTo: (0, _utils.getLabelWithValue)({
          labelName: "Assigned To Date",
          labelKey: "HR_ASMT_TO_DATE_LABEL"
        }, { jsonPath: "Employee[0].assignments[0].toDate" }),
        reviewCurrentAssigned: (0, _utils.getLabelWithValue)({
          labelName: "Currently Assigned Here",
          labelKey: "HR_CURR_ASSIGN_LABEL"
        }, { jsonPath: "Employee[0].assignments[0].department" }),
        reviewDepartment: (0, _utils.getLabelWithValue)({ labelName: "Department", labelKey: "HR_DEPT_LABEL" }, {
          jsonPath: "Employee[0].assignments[0].department"
        }),
        reviewDesignation: (0, _utils.getLabelWithValue)({ labelName: "Designation", labelKey: "HR_DESG_LABEL" }, {
          jsonPath: "Employee[0].assignments[0].designation"
        }),
        reviewReportTo: (0, _utils.getLabelWithValue)({ labelName: "Reporting To", labelKey: "HR_REP_TO_LABEL" }, {
          jsonPath: "Employee[0].assignments[0].reportingTo"
        }),
        reviewHOD: (0, _utils.getLabelWithValue)({ labelName: "Head of Department", labelKey: "HR_HOD_LABEL" }, {
          jsonPath: "Employee[0].assignments[0].isHOD"
          // callBack: convertEpochToDate
        })
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].assignments",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var getAssignmentDetailsView = exports.getAssignmentDetailsView = function getAssignmentDetailsView() {
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
          labelName: "Assignment Details",
          labelKey: "HR_ASSIGN_DET_HEADER"
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
    viewOne: assignmentCard
  });
};
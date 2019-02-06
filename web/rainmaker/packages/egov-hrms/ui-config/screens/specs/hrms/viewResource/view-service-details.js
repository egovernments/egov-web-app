"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceDetailsView = undefined;

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
        reviewStatus: (0, _utils.getLabelWithValue)({
          labelName: "Status",
          labelKey: "HR_STATUS_LABEL"
        }, { jsonPath: "Employee[0].serviceHistory[0].serviceStatus" }),
        reviewServiceFrom: (0, _utils.getLabelWithValue)({
          labelName: "Service From Date",
          labelKey: "HR_SER_FROM_DATE_LABEL"
        }, { jsonPath: "Employee[0].serviceHistory[0].serviceFrom" }),
        reviewServiceTo: (0, _utils.getLabelWithValue)({
          labelName: "Service To Date",
          labelKey: "HR_SER_TO_DATE_LABEL"
        }, { jsonPath: "Employee[0].serviceHistory[0].serviceTo" }),
        reviewLocation: (0, _utils.getLabelWithValue)({
          labelName: "Location",
          labelKey: "HR_LOCATION_LABEL"
        }, { jsonPath: "Employee[0].serviceHistory[0].location" }),
        reviewOrderNo: (0, _utils.getLabelWithValue)({ labelName: "Order No", labelKey: "HR_ORDER_NO_LABEL" }, {
          jsonPath: "Employee[0].serviceHistory[0].orderNo"
        }),
        reviewCurrentWorking: (0, _utils.getLabelWithValue)({
          labelName: "Currently Working Here",
          labelKey: "HR_CURR_WORKING_LABEL"
        }, {
          jsonPath: "Employee[0].serviceHistory[0].isCurrentPosition"
        })
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].serviceHistory",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var getServiceDetailsView = exports.getServiceDetailsView = function getServiceDetailsView() {
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
          labelName: "Service Details",
          labelKey: "HR_SER_DET_HEADER"
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
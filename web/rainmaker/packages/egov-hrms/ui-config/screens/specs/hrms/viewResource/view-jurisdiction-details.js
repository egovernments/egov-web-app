"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJurisdictionDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../createResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jurisdictionCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      jurisCardContainer: (0, _utils.getCommonContainer)({
        reviewHierarchy: (0, _utils.getLabelWithValue)({
          labelName: "Hierarchy",
          labelKey: "HR_HIERARCHY_LABEL"
        }, { jsonPath: "Employee[0].jurisdictions[0].hierarchy" }),
        reviewBoundaryType: (0, _utils.getLabelWithValue)({
          labelName: "Boundary Type",
          labelKey: "HR_BOUNDARY_TYPE_LABEL"
        }, { jsonPath: "Employee[0].jurisdictions[0].boundaryType" }),
        reviewBoundary: (0, _utils.getLabelWithValue)({ labelName: "Boundary", labelKey: "HR_BOUNDARY_LABEL" }, { jsonPath: "Employee[0].jurisdictions[0].boundary" })
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].jurisdictions",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var getJurisdictionDetailsView = exports.getJurisdictionDetailsView = function getJurisdictionDetailsView() {
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
          labelName: "Jurisdiction Details",
          labelKey: "HR_JURIS_DET_HEADER"
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
    viewOne: jurisdictionCard
  });
};
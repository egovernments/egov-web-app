"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskStatus = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Status = ["Pending for Document Verification", "Pending for Field Inspection", "Pending for Approval"];

var taskStatus = exports.taskStatus = (0, _utils.getCommonCard)({
  header: {
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
        labelName: "Task Status",
        labelKey: "NOC_TASK_STATUS_HEADER"
      })),
      historySection: {
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
              iconName: "history"
            }
          },
          buttonLabel: (0, _utils.getLabel)({
            labelName: "VIEW HISTORY",
            labelKey: "NOC_VIEW_HISTORY"
          })
        },
        onClickDefination: {
          action: "condition"
          //ADD THE CLICK ACTION LATER
          // callBack: (state, dispatch) => {
          //   changeStep(state, dispatch, "", 0);
          // }
        }
      }
    }
  },
  body: (0, _utils.getCommonContainer)({
    statusDate: (0, _utils.getLabelWithValue)({
      labelName: "Date",
      labelKey: "NOC_STATUS_DATE_LABEL"
    }, {
      jsonPath: "statusDate"
    }),
    updaterName: (0, _utils.getLabelWithValue)({
      labelName: "Updated by",
      labelKey: "NOC_UPDATER_NAME_LABEL"
    }, {
      jsonPath: "updaterName"
    }),
    currentOnwerName: (0, _utils.getLabelWithValue)({
      labelName: "Current Owner",
      labelKey: "NOC_CURRENT_OWNER_LABEL"
    }, {
      jsonPath: "currentOnwerName"
    }),
    currentStatus: (0, _utils.getLabelWithValue)({
      labelName: "Status",
      labelKey: "NOC_CURRENT_STATUS_LABEL"
    }, {
      jsonPath: "currentStatus"
    }),
    comments: (0, _utils.getLabelWithValue)({
      labelName: "Comments",
      labelKey: "NOC_STATUS_COMMENTS"
    }, {
      jsonPath: "comments"
    }),
    children: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-noc",
      componentPath: "DownloadFileContainer",
      backgroundColor: "##F2F2F2",
      props: {
        sourceJsonPath: "documents",
        className: "noc-review-documents",
        data: [{
          title: "Document-1",
          name: "Filename.jpg",
          link: "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
          linkText: "View"
        }, {
          title: "Document-2",
          name: "Filename.jpg",
          link: "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
          linkText: "View"
        }]
      }
    }
  })
});
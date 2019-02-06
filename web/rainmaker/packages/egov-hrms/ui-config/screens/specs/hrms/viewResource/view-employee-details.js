"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployeeDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../createResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
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

var getEmployeeDetailsView = exports.getEmployeeDetailsView = function getEmployeeDetailsView() {
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
          labelName: "Employee Details",
          labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER"
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
            action: "page_change",
            path: "/egov-ui-framework/hrms/create"
          }
        }
      }
    },
    personalDetailsHeader: getHeader("Personal Details"),
    break1: (0, _utils.getBreak)(),
    viewOne: (0, _utils.getCommonContainer)({
      reviewName: (0, _utils.getLabelWithValue)({
        labelName: "Name",
        labelKey: "HR_COMMON_TABLE_COL_NAME"
      }, { jsonPath: "Employee[0].user.name" }),
      reviewMobile: (0, _utils.getLabelWithValue)({ labelName: "Mobile No", labelKey: "HR_MOB_NO_LABEL" }, { jsonPath: "Employee[0].user.mobileNumber" }),
      reviewFather: (0, _utils.getLabelWithValue)({
        labelName: "Father/Husband's Name",
        labelKey: "HR_FATHER_HUSBANDS_NAME_LABEL"
      }, { jsonPath: "Employee[0].user.fatherOrHusbandName" }),
      reviewGender: (0, _utils.getLabelWithValue)({ labelName: "Gender", labelKey: "HR_GENDER_LABEL" }, {
        jsonPath: "Employee[0].user.gender"
      }),
      reviewDob: (0, _utils.getLabelWithValue)({ labelName: "Date Of Birth", labelKey: "HR_DOB_LABEL" }, {
        jsonPath: "Employee[0].user.dob"
      }),
      reviewEmail: (0, _utils.getLabelWithValue)({ labelName: "Email", labelKey: "HR_EMAIL_LABEL" }, {
        jsonPath: "Employee[0].user.email"
      }),
      reviewAddress: (0, _utils.getLabelWithValue)({
        labelName: "Correspondence Addres",
        labelKey: "HR_CORRESPONDENCE_ADDRESS_LABEL"
      }, {
        jsonPath: "Employee[0].user.correspondenceAddress"
      })
    }),
    professionalDetailsHeader: getHeader("Professional Details"),
    break2: (0, _utils.getBreak)(),
    viewTwo: (0, _utils.getCommonContainer)({
      reviewEmpID: (0, _utils.getLabelWithValue)({
        labelName: "Employee ID",
        labelKey: "HR_EMP_ID_LABEL"
      }, { jsonPath: "Employee[0].id" }),
      reviewDOA: (0, _utils.getLabelWithValue)({ labelName: "Date of Appointment", labelKey: "HR_APPT_DATE_LABEL" }, {
        jsonPath: "Employee[0].dateOfAppointment"
      }),
      reviewEmpType: (0, _utils.getLabelWithValue)({ labelName: "Employee Type", labelKey: "HR_EMP_TYPE_LABEL" }, {
        jsonPath: "Employee[0].employeeType"
      }),
      reviewStatus: (0, _utils.getLabelWithValue)({ labelName: "Status", labelKey: "HR_STATUS_LABEL" }, {
        jsonPath: "Employee[0].employeeStatus"
      }),
      reviewRole: (0, _utils.getLabelWithValue)({ labelName: "Role", labelKey: "HR_ROLE_LABEL" }, {
        jsonPath: "Employee[0].user.role"
      })
    })
  });
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otherDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var otherDetails = exports.otherDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Other Details",
    labelKey: "HR_OTHER_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),

  educationQualification: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: (0, _utils.getCommonGrayCard)({
        header: (0, _utils.getCommonSubHeader)({
          labelName: "Education Qualification",
          labelKey: "HR_ED_QUAL_HEADER"
        }, {
          style: {
            marginBottom: 18
          }
        }),
        eduDetailsCardContainer: (0, _utils.getCommonContainer)({
          degree: (0, _extends3.default)({}, (0, _utils.getSelectField)({
            label: {
              labelName: "Degree",
              labelKey: "HR_DEGREE_LABEL"
            },
            placeholder: {
              labelName: "Select Degree",
              labelKey: "HR_DEGREE_PLACEHOLDER"
            },
            jsonPath: "Employee[0].education[0].qualification",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            sourceJsonPath: "createScreenMdmsData.egov-hrms.Degree",
            props: {
              jsonPath: "Employee[0].education[0].qualification"
            }
          })),
          year: (0, _extends3.default)({}, (0, _utils.getSelectField)({
            label: {
              labelName: "Year",
              labelKey: "HR_YEAR_LABEL"
            },
            placeholder: {
              labelName: "Select Year",
              labelKey: "HR_YEAR_PLACEHOLDER"
            },
            jsonPath: "Employee[0].education[0].yearOfPassing",
            sourceJsonPath: "yearsList",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              className: "hr-generic-selectfield",
              // data: [
              //   {
              //     value: "Male",
              //     label: "Male"
              //   },
              //   {
              //     value: "Female",
              //     label: "Female"
              //   }
              // ],
              optionValue: "value",
              optionLabel: "label"
            }
          })),
          university: (0, _extends3.default)({}, (0, _utils.getTextField)({
            label: {
              labelName: "University",
              labelKey: "HR_UNIVERSITY_LABEL"
            },
            placeholder: {
              labelName: "Select University",
              labelKey: "HR_UNIVERSITY_PLACEHOLDER"
            },
            gridDefination: {
              xs: 12,
              sm: 4
            },
            jsonPath: "Employee[0].education[0].university"
          })),
          stream: (0, _extends3.default)({}, (0, _utils.getSelectField)({
            label: {
              labelName: "Stream",
              labelKey: "HR_STREAM_LABEL"
            },
            placeholder: {
              labelName: "Select Stream",
              labelKey: "HR_STREAM_PLACEHOLDER"
            },
            jsonPath: "Employee[0].education[0].stream",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              className: "hr-generic-selectfield",
              data: [{
                value: "Male",
                label: "Male"
              }, {
                value: "Female",
                label: "Female"
              }],
              optionValue: "value",
              optionLabel: "label"
            }
          })),
          remarks: (0, _extends3.default)({}, (0, _utils.getTextField)({
            label: {
              labelName: "Remarks",
              labelKey: "HR_REMARKS_LABEL"
            },
            placeholder: {
              labelName: "Enter Remarks",
              labelKey: "HR_REMARKS_PLACEHOLDER"
            },
            pattern: (0, _utils.getPattern)("TradeName") || null,
            gridDefination: {
              xs: 12,
              sm: 4
            },
            jsonPath: "Employee[0].education[0].remarks"
          }))
        }, {
          style: {
            overflow: "visible"
          }
        })
      }),
      items: [],
      addItemLabel: "ADD QUALIFICATIONS",
      headerName: "Education Qualification",
      headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "Employee[0].education",
      prefixSourceJsonPath: "children.cardContent.children.eduDetailsCardContainer.children"
    },
    type: "array"
  },
  departmentDetails: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: (0, _utils.getCommonGrayCard)({
        header: (0, _utils.getCommonSubHeader)({
          labelName: "Department Test Details",
          labelKey: "HR_DEPT_TEST_HEADER"
        }, {
          style: {
            marginBottom: 18
          }
        }),
        testsDetailsCardContainer: (0, _utils.getCommonContainer)({
          testName: (0, _extends3.default)({}, (0, _utils.getSelectField)({
            label: {
              labelName: "Test Name",
              labelKey: "HR_TEST_NAME_LABEL"
            },
            placeholder: {
              labelName: "Select Test Name",
              labelKey: "HR_TEST_NAME_PLACEHOLDER"
            },
            jsonPath: "Employee[0].tests[0].test",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              className: "hr-generic-selectfield",
              data: [{
                value: "Arts",
                label: "Arts"
              }, {
                value: "Science",
                label: "Science"
              }],
              optionValue: "value",
              optionLabel: "label"
            }
          })),
          year: (0, _extends3.default)({}, (0, _utils.getSelectField)({
            label: {
              labelName: "Year",
              labelKey: "HR_YEAR_LABEL"
            },
            placeholder: {
              labelName: "Select Year",
              labelKey: "HR_YEAR_PLACEHOLDER"
            },
            jsonPath: "Employee[0].tests[0].yearOfPassing",
            sourceJsonPath: "yearsList",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              className: "hr-generic-selectfield",
              // data: [
              //   {
              //     value: "Male",
              //     label: "Male"
              //   },
              //   {
              //     value: "Female",
              //     label: "Female"
              //   }
              // ],
              optionValue: "value",
              optionLabel: "label"
            }
          })),
          remarks: (0, _extends3.default)({}, (0, _utils.getTextField)({
            label: {
              labelName: "Remarks",
              labelKey: "HR_REMARKS_LABEL"
            },
            placeholder: {
              labelName: "Enter Remarks",
              labelKey: "HR_REMARKS_PLACEHOLDER"
            },
            pattern: (0, _utils.getPattern)("TradeName") || null,
            gridDefination: {
              xs: 12,
              sm: 4
            },
            jsonPath: "Employee[0].tests[0].remarks"
          }))
          // uploadFile: getUploadFilesMultiple(
          //   "Employee[0].deptTestDetails[0].documents"
          // )
        }, {
          style: {
            overflow: "visible"
          }
        })
      }),
      items: [],
      addItemLabel: "ADD TEST",
      headerName: "Department Test Details",
      headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "Employee[0].tests",
      prefixSourceJsonPath: "children.cardContent.children.testsDetailsCardContainer.children"
    },
    type: "array"
  }
});

// export const otherDetails = getCommonCard({
//   header: getCommonTitle(
//     {
//       labelName: "Other Details",
//       labelKey: "HR_OTHER_DET_HEADER"
//     },
//     {
//       style: {
//         marginBottom: 18
//       }
//     }
//   ),
//   otherDetailsCard
// });
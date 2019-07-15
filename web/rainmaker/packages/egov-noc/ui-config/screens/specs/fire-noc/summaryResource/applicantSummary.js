"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicantSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicantSummary = exports.applicantSummary = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Applicant Details",
        labelKey: "NOC_APPLICANT_DETAILS_HEADER"
      })),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
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
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _index.gotoApplyWithStep)(state, dispatch, 2);
          }
        }
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        applicantContainer: (0, _utils.getCommonContainer)({
          mobileNo: (0, _utils.getLabelWithValue)({
            labelName: "Mobile No.",
            labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber"
            // callBack: value => {
            //   return value.split(".")[0];
            // }
          }),
          applicantName: (0, _utils.getLabelWithValue)({
            labelName: "Name",
            labelKey: "NOC_APPLICANT_NAME_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }),
          applicantGender: (0, _utils.getLabelWithValue)({
            labelName: "Gender",
            labelKey: "NOC_GENDER_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender"
          }),
          applicantFatherHusbandName: (0, _utils.getLabelWithValue)({
            labelName: "Father/Husband's Name",
            labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].fatherOrHusbandName"
          }),
          applicantDob: (0, _utils.getLabelWithValue)({
            labelName: "Date of Birth",
            labelKey: "NOC_APPLICANT_DOB_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].dob",
            callBack: function callBack(value) {
              return (0, _utils.convertEpochToDate)(value);
            }
          }),
          applicantEmail: (0, _utils.getLabelWithValue)({
            labelName: "Email",
            labelKey: "NOC_APPLICANT_EMAIL_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
          }),
          applicantPan: (0, _utils.getLabelWithValue)({
            labelName: "PAN",
            labelKey: "NOC_APPLICANT_PAN_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].pan"
          }),
          applicantAddress: (0, _utils.getLabelWithValue)({
            labelName: "Correspondence Address",
            labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress"
          })
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
      prefixSourceJsonPath: "children.cardContent.children.applicantContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});
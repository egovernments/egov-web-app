"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.page = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contract = {
  title: {
    labelName: "Refer For opinion",
    labelKey: "NOC_REFER_OPINION_HEADER"
  },
  DropDownData: {
    label: {
      labelName: "Refer To",
      labelKey: "NOC_AUTHORIZED_REFER_PERSON__LABEL"
    },
    placeholder: {
      labelName: "Select Name of Employee",
      labelKey: "NOC_AUTHORIZED_REFER_PERSON_PLACEHOLDER"
    },
    jsonPath: "",
    sourceJsonPath: ""
  },
  TextFieldData: {
    label: {
      labelName: "Comments",
      labelKey: "NOC_AUTHORIZED_REFER_PERSON_COMMENTS_LABEL"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "NOC_AUTHORIZED_REFER_PERSON_COMMENTS_PLACEHOLDER"
    },
    jsonPath: ""
  },
  uploadBoxData: { jsonPath: "" },
  ButtonData: {
    buttonLabel: {
      labelName: "REFER FOR OPINION",
      labelKey: "NOC_REFER_OPINION_BUTTON_LABEL"
    },
    callBack: function callBack() {
      console.log("asd");
    }
  }
};

var getVerifyReferRejet = function getVerifyReferRejet(contract) {
  return (0, _utils.getCommonCard)({
    header: (0, _extends3.default)({}, (0, _utils.getCommonTitle)((0, _extends3.default)({}, contract.title))),
    dropDown: (0, _extends3.default)({}, (0, _utils.getSelectField)((0, _extends3.default)({}, contract.DropDownData, {
      gridDefination: {
        xs: 12
      }
    }))),
    textField: (0, _extends3.default)({}, (0, _utils.getTextField)((0, _extends3.default)({}, contract.TextFieldData, {
      gridDefination: {
        xs: 12
      }
    }))),
    upload: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: {
          marginLeft: 8
        }
      },
      required: false,
      children: {
        uploadFileHeader: (0, _utils.getCommonSubHeader)({
          labelName: "Supporting Documents",
          labelKey: "NOC_SUPPORTING_DOCUMENTS_LABEL"
        }, {
          style: { marginTop: 15, width: "100%" }
        }),
        uploadFileInfo: (0, _utils.getCommonParagraph)({
          labelName: "Only .jpg and .pdf files. 5MB max file size."
        }, {
          style: {
            fontSize: 12,
            marginBottom: 0,
            marginTop: 5,
            width: "100%",
            color: "rgba(0, 0, 0, 0.6000000238418579)"
          }
        }),
        uploadButton: {
          uiFramework: "custom-molecules",
          componentPath: "UploadMultipleFiles",
          props: {
            maxFiles: 4,
            jsonPath: contract.uploadBoxData.jsonPath,
            inputProps: {
              accept: "image/*, .pdf, .png, .jpeg"
            },
            buttonLabel: { labelName: "UPLOAD FILES", labelKey: "NOC_UPLOAD_BUTTON_LABEL" },
            maxFileSize: 5000,
            moduleName: "NOC",
            hasLocalization: false
          }
        }
      }
    },
    buttonDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          width: "100%",
          textAlign: "right"
        }
      },
      children: {
        deactivateButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              width: "200px",
              height: "48px"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)(contract.ButtonData.buttonLabel)
          },
          onClickDefination: {
            action: "condition",
            callBack: contract.ButtonData.callBack
          }
        }
      }
    }
  });
};

var page = exports.page = {
  uiFramework: "material-ui",
  name: "page",
  components: {
    div: getVerifyReferRejet(contract)
  }
};
exports.default = page;
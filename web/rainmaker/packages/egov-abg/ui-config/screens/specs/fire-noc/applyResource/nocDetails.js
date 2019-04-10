"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nocDetails = exports.nocDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "NOC Details",
    labelKey: "NOC_NEW_NOC_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  break: (0, _utils.getBreak)(),
  nocDetailsContainer: (0, _utils.getCommonContainer)({
    nocRadioGroup: {
      uiFramework: "custom-containers",
      moduleName: "egov-noc",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "noc.nocType",
      props: {
        label: "NOC Type",
        buttons: ["New", "Provisional"],
        jsonPath: "noc.nocType",
        defaultValue: "New",
        required: true
      },
      type: "array",
      afterFieldChange: function afterFieldChange(action, state, dispatch) {
        if (action.value === "Provisional") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "props.style", { visibility: "hidden" }));
        } else {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "props.style", {}));
        }
      }
    },
    provisionalNocNumber: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Provisional fire NoC number",
        labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Provisional fire NoC number",
        labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_PLACEHOLDER"
      },
      // required: true,
      // pattern: getPattern("MobileNo"),
      jsonPath: "noc.provisionalNocNumber",
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch, fieldInfo) {
            console.log("ASDASDSAD");
          }
        }
        // title: {
        //   value: "Please search owner profile linked to the mobile no.",
        //   key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
        // },
        // infoIcon: "info_circle"
      } }))
  })
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _nocRadioGroup;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _apply = require("../apply");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

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
    nocRadioGroup: (_nocRadioGroup = {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
      type: "array",
      props: {
        required: true,
        label: { name: "NOC Type", key: "NOC_TYPE_LABEL" },
        buttons: [{
          labelName: "New",
          labelKey: "NOC_TYPE_NEW_RADIOBUTTON",
          value: "NEW"
        }, {
          label: "Provisional",
          labelKey: "NOC_TYPE_PROVISIONAL_RADIOBUTTON",
          value: "PROVISIONAL"
        }],
        jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
        defaultValue: "PROVISIONAL"
      }
    }, (0, _defineProperty3.default)(_nocRadioGroup, "type", "array"), (0, _defineProperty3.default)(_nocRadioGroup, "beforeFieldChange", function beforeFieldChange(action, state, dispatch) {
      if (action.value === "PROVISIONAL") {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "props.style", { visibility: "hidden" }));
      } else {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "props.style", {}));
      }
    }), _nocRadioGroup),
    provisionalNocNumber: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Provisional fire NoC number",
        labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Provisional fire NoC number",
        labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_PLACEHOLDER"
      },
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "Invalid Fire-NOC No.",
      // required: true,
      // pattern: getPattern("MobileNo"),
      jsonPath: "FireNOCs[0].provisionFireNOCNumber",
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch, fieldInfo) {
            var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].provisionFireNOCNumber", "");
            (0, _apply.prepareEditFlow)(state, dispatch, applicationNumber, (0, _localStorageUtils.getTenantId)());
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
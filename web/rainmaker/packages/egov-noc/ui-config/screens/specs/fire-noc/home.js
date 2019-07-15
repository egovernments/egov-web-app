"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _FireNocIcon = require("../../../../ui-atoms-local/Icons/FireNocIcon");

var _FireNocIcon2 = _interopRequireDefault(_FireNocIcon);

var _MyApplicationIcon = require("../../../../ui-atoms-local/Icons/MyApplicationIcon");

var _MyApplicationIcon2 = _interopRequireDefault(_MyApplicationIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Fire Noc",
  labelKey: "ACTION_TEST_FIRE_NOC"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var cardItems = [{
  label: {
    labelKey: "NOC_APPLY",
    labelName: "Apply for Fire Noc"
  },
  icon: _react2.default.createElement(_FireNocIcon2.default, null),
  route: "apply"
}, {
  label: {
    labelKey: "NOC_MY_APPLICATIONS",
    labelName: "My Applications"
  },
  icon: _react2.default.createElement(_MyApplicationIcon2.default, null),
  route: "my-applications"
}];

var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  // beforeInitScreen: (action, state, dispatch) => {
  //   fetchData(action, state, dispatch);
  //   return action;
  // },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        listCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-noc",
          componentPath: "HowItWorks"
        }
      }
      // cityPickerDialog: {
      //   componentPath: "Dialog",
      //   props: {
      //     open: false,
      //     maxWidth: "md"
      //   },
      //   children: {
      //     dialogContent: {
      //       componentPath: "DialogContent",
      //       props: {
      //         style: { minHeight: "180px", minWidth: "365px" }
      //       },
      //       children: {
      //         popup: cityPicker
      //       }
      //     }
      //   }
      // }
    } }
};

exports.default = tradeLicenseSearchAndResult;
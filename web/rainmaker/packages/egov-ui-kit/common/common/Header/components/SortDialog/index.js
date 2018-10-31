"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  logoutContentStyle: { textAlign: "center", padding: "24px 20px" },

  labelStyle: {
    fontSize: "16px",
    fontWeight: "normal",
    color: "red",
    letterSpacing: "0.3px",
    marginBottom: "26px"
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
    color: "red"
  },
  selectedLabelStyle: {
    color: "red"
  },
  radioButtonLabelStyle: {
    fontSize: "16px",
    fontWeight: "400",
    color: "red",
    letterSpacing: "0.3px"
  }
};

var options = [{ value: "Complaint Date - Old to New", label: _react2.default.createElement(_translationNode2.default, { label: "CS_SORT_OPTION_ONE" }) }, { value: "Complaint Date - New to old", label: _react2.default.createElement(_translationNode2.default, { label: "CS_SORT_OPTION_TWO" }) }, { value: "Days Remaining to SLA", label: _react2.default.createElement(_translationNode2.default, { label: "CS_SORT_OPTION_THREE" }) }];

var LogoutDialog = function LogoutDialog(_ref) {
  var closeSortDialog = _ref.closeSortDialog,
      sortPopOpen = _ref.sortPopOpen;

  var actions = [_react2.default.createElement(_components.Button, {
    id: "logout-no-button",
    className: "logout-no-button",
    label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_LOGOUTPOPUP_CANCEL", color: "#FE7A51" }),
    backgroundColor: "#fff",
    style: { boxShadow: "none" }
  }), _react2.default.createElement(_components.Button, {
    id: "logout-yes-button",
    className: "logout-yes-button",
    label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "OK", color: "#FE7A51" }),
    backgroundColor: "#fff",
    style: { boxShadow: "none" }
  })];
  return _react2.default.createElement(_components.Dialog, {
    open: sortPopOpen,
    title: _react2.default.createElement(_translationNode2.default, {
      label: "Sort By",
      bold: true,
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontSize: "20px",
      labelStyle: { padding: "16px 0px 0px 24px" }
    }),
    children: [_react2.default.createElement(
      "div",
      { style: { paddingTop: "22px", paddingLeft: "8px" } },
      _react2.default.createElement(_components.RadioButton, {
        id: "sortcomplaint-radio-button",
        name: "sortcomplaint-radio-button"
        // valueSelected={valueSelected}
        , options: options
        // handleChange={handleChange}
        , radioButtonItemStyle: styles.radioButtonItemStyle,
        labelStyle: styles.radioButtonLabelStyle,
        selectedLabelStyle: styles.selectedLabelStyle
      })
    )],
    handleClose: closeSortDialog,
    actions: actions,
    contentClassName: "logout-popup",
    contentStyle: { width: "90%" },
    isClose: true
  });
};

exports.default = LogoutDialog;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _PTList = require("./components/PTList");

var _PTList2 = _interopRequireDefault(_PTList);

var _BlankAssessment = require("./components/BlankAssessment");

var _BlankAssessment2 = _interopRequireDefault(_BlankAssessment);

var _DropDown = require("./components/DropDown");

var _DropDown2 = _interopRequireDefault(_DropDown);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getItemStatus = function getItemStatus(item, history, generalMDMSDataById) {
  var status = item.status;
  var styles = {
    paidIconStyle: {
      marginLeft: "10px",
      height: "18px"
    }
  };
  switch (status) {
    case "Paid":
    case "Paid-Disable":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: item.date ? { marginTop: "8px" } : { marginTop: "0px" } },
          _react2.default.createElement(_translationNode2.default, { label: "Paid", labelStyle: { marginLeft: "8px" }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { style: { height: "30px", marginTop: "8px" } },
          history && _react2.default.createElement(_DropDown2.default, { history: history, item: item, generalMDMSDataById: generalMDMSDataById })
        )
      );
      break;
    case "Partially Paid":
    case "Completed":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "8px" } },
          _react2.default.createElement(_translationNode2.default, { label: "Partially Paid", labelStyle: { marginLeft: "8px" }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { style: { height: "30px", marginTop: "8px" } },
          history && _react2.default.createElement(_DropDown2.default, { generalMDMSDataById: generalMDMSDataById, history: history, item: item })
        )
      );
      break;
    case "Payment failed":
      return _react2.default.createElement(
        "div",
        { className: "assessment-displayInline", style: { marginTop: "10px" } },
        _react2.default.createElement(_translationNode2.default, { label: item.status, labelStyle: { marginLeft: "8px" }, color: "#e74c3c" }),
        _react2.default.createElement(_components.Icon, { action: "alert", name: "warning", style: styles.paidIconStyle, color: "#e74c3c" })
      );
      break;
    case "Saved Draft":
      localStorage.setItem("draftId", "");
      return _react2.default.createElement(
        "div",
        {
          onClick: function onClick() {
            history && history.push("/property-tax/assessment-form?assessmentId=" + item.assessmentNo);
          },
          className: "assessment-displayInline",
          style: { marginTop: "10px" }
        },
        _react2.default.createElement(_translationNode2.default, { label: item.status, labelStyle: { marginLeft: "8px" }, color: "#00bbd3" }),
        _react2.default.createElement(_components.Icon, { action: "image", name: "edit", style: styles.paidIconStyle, color: "#00bbd3" })
      );
      break;
    case "ASSESS & PAY":
      localStorage.setItem("draftId", "");
      return _react2.default.createElement(
        "div",
        { className: "assessment-displayInline" },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_PAYMENT_ASSESS_AND_PAY", fontSize: "12px" }),
          primary: true,
          onClick: function onClick(e) {
            history && history.push("/property-tax/assessment-form?assessmentId=" + item.assessmentNo + "&isReassesment=true");
          },
          style: {
            height: 20,
            lineHeight: "auto",
            minWidth: "inherit"
          }
        })
      );
    default:
      return "";
  }
};

var getRightIconItems = function getRightIconItems(item, history, generalMDMSDataById) {
  return item.date || item.status || item.receipt || item.action ? _react2.default.createElement(
    "div",
    {
      className: "assessment-right-icon",
      style: { width: "auto", top: "0px", bottom: "0px", height: "inherit", margin: "auto", alignItems: "center", display: "flex", right: 0 }
    },
    _react2.default.createElement(
      "div",
      null,
      item.date && _react2.default.createElement(_translationNode2.default, { label: item.date, containerStyle: { marginRight: 5 }, labelStyle: { textAlign: "right" }, color: "#484848" }),
      getItemStatus(item, history, generalMDMSDataById)
    )
  ) : item.rightIcon;
};

var getListItems = function getListItems(items, history, generalMDMSDataById) {
  return items && items.map(function (item, index) {
    return item && {
      primaryText: item.primaryText, //<Label label="2018 - 2019" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />
      secondaryText: item.secondaryText && ((0, _typeof3.default)(item.secondaryText) === "object" ? item.secondaryText : _react2.default.createElement(_translationNode2.default, { label: item.secondaryText, fontSize: "14px", color: "#484848", containerStyle: { marginTop: "15px" } })),
      route: item.route,
      leftIcon: item.leftIcon,
      rightIcon: getRightIconItems(item, history, generalMDMSDataById),
      initiallyOpen: item.initiallyOpen,
      nestedItems: item && item.nestedItems && item.nestedItems.map(function (nestedItem) {
        return {
          primaryText: nestedItem.leftIcon ? _react2.default.createElement(
            "div",
            { style: { alignItems: "center", display: "flex" } },
            nestedItem.leftIcon,
            _react2.default.createElement(_translationNode2.default, { label: nestedItem.primaryText, fontSize: "14px", color: "#484848", containerStyle: { marginLeft: "8px" } })
          ) : nestedItem.primaryText
          // <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />
          ,
          secondaryText: nestedItem.secondaryText,
          route: nestedItem.route,
          rightIcon: getRightIconItems(nestedItem, history, generalMDMSDataById)
        };
      })
    };
  });
};

var AssessmentList = function AssessmentList(_ref) {
  var items = _ref.items,
      history = _ref.history,
      onItemClick = _ref.onItemClick,
      button = _ref.button,
      innerDivStyle = _ref.innerDivStyle,
      listItemStyle = _ref.listItemStyle,
      noAssessmentMessage = _ref.noAssessmentMessage,
      yearDialogue = _ref.yearDialogue,
      closeDialogue = _ref.closeDialogue,
      onNewPropertyButtonClick = _ref.onNewPropertyButtonClick,
      hoverColor = _ref.hoverColor,
      generalMDMSDataById = _ref.generalMDMSDataById;

  return items.length == 0 ? _react2.default.createElement(_BlankAssessment2.default, {
    noAssessmentMessage: noAssessmentMessage,
    button: button,
    dialogueOpen: yearDialogue,
    closeDialogue: closeDialogue,
    onButtonClick: onNewPropertyButtonClick,
    history: history
  }) : _react2.default.createElement(_PTList2.default, {
    items: getListItems(items, history, generalMDMSDataById),
    history: history,
    onItemClick: onItemClick,
    innerDivStyle: innerDivStyle,
    listItemStyle: listItemStyle,
    hoverColor: hoverColor
  });
};

exports.default = AssessmentList;
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

var _PTList = require("../PTList");

var _PTList2 = _interopRequireDefault(_PTList);

var _BlankAssessment = require("../BlankAssessment");

var _BlankAssessment2 = _interopRequireDefault(_BlankAssessment);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getItemStatus = function getItemStatus(item, history) {
  var status = item.status;
  var styles = {
    paidIconStyle: {
      marginLeft: "10px",
      height: "18px"
    }
  };
  switch (status) {
    case "Paid":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: item.date ? { marginTop: "8px" } : { marginTop: "0px" } },
          _react2.default.createElement(_translationNode2.default, { label: item.status, labelStyle: { marginLeft: "8px" }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "8px" } },
          _react2.default.createElement(_translationNode2.default, { label: "DOWNLOAD RECEIPT", labelStyle: { marginLeft: "8px" }, color: "#fe7a51", fontSize: "12px" }),
          _react2.default.createElement(_components.Icon, { style: { marginLeft: 10, height: "18px" }, action: "editor", name: "vertical-align-bottom", color: "#fe7a51" })
        )
      );
      break;
    case "Partially Paid":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "8px" } },
          _react2.default.createElement(_translationNode2.default, { label: item.status, labelStyle: { marginLeft: "8px" }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "8px" } },
          _react2.default.createElement(_translationNode2.default, { label: "COMPLETE PAYMENT", labelStyle: { marginLeft: "8px" }, color: "#fe7a51", fontSize: "12px" }),
          _react2.default.createElement(_components.Icon, { style: { marginLeft: 10, height: "18px" }, action: "editor", name: "vertical-align-bottom", color: "#fe7a51" })
        ),
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "8px" } },
          _react2.default.createElement(_translationNode2.default, { label: "DOWNLOAD RECEIPT", labelStyle: { marginLeft: "8px" }, color: "#fe7a51", fontSize: "12px" }),
          _react2.default.createElement(_components.Icon, { style: { marginLeft: 10, height: "18px" }, action: "editor", name: "vertical-align-bottom", color: "#fe7a51" })
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
      return _react2.default.createElement(
        "div",
        { className: "assessment-displayInline" },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "ASSESS & PAY", fontSize: "12px" }),
          primary: true,
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

var getRightIconItems = function getRightIconItems(item, history) {
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
      getItemStatus(item, history)
    )
  ) : item.rightIcon;
};

var getListItems = function getListItems(items, history) {
  return items && items.map(function (item, index) {
    return {
      primaryText: item.primaryText, //<Label label="2018 - 2019" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />
      secondaryText: item.secondaryText && ((0, _typeof3.default)(item.secondaryText) === "object" ? item.secondaryText : _react2.default.createElement(_translationNode2.default, { label: item.secondaryText, fontSize: "14px", color: "#484848", containerStyle: { marginTop: "15px" } })),
      route: item.route,
      leftIcon: item.leftIcon,
      rightIcon: getRightIconItems(item, history),
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
          rightIcon: getRightIconItems(nestedItem)
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
      onNewPropertyButtonClick = _ref.onNewPropertyButtonClick;

  return items.length == 0 ? _react2.default.createElement(_BlankAssessment2.default, {
    noAssessmentMessage: noAssessmentMessage,
    button: button,
    dialogueOpen: yearDialogue,
    closeDialogue: closeDialogue,
    onButtonClick: onNewPropertyButtonClick
  }) : _react2.default.createElement(_PTList2.default, {
    items: getListItems(items, history),
    history: history,
    onItemClick: onItemClick,
    innerDivStyle: innerDivStyle,
    listItemStyle: listItemStyle
  });
};

exports.default = AssessmentList;
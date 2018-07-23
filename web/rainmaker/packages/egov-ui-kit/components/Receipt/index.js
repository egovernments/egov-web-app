"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Receipt = function Receipt(_ref) {
  var receiptItems = _ref.receiptItems,
      innerDivClass = _ref.innerDivClass;

  var _ref2 = receiptItems && receiptItems[0],
      leftItems = _ref2.leftItems,
      rightItems = _ref2.rightItems;

  var getItems = function getItems(items) {
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: innerDivClass ? innerDivClass : "col-xs-12 col-sm-4" },
        items && items.map(function (item, index) {
          return _react2.default.createElement(_translationNode2.default, { key: index, containerStyle: { marginTop: 10 }, label: item.key });
        })
      ),
      _react2.default.createElement(
        "div",
        { className: innerDivClass ? innerDivClass : "col-xs-12 col-sm-4" },
        items && items.map(function (item, index) {
          return _react2.default.createElement(_translationNode2.default, { key: index, containerStyle: { marginTop: 10 }, label: item.value });
        })
      )
    );
  };

  return receiptItems && _react2.default.createElement(
    "div",
    { className: "clearfix", style: { height: "inherit", marginTop: "10px", marginBottom: "15px" } },
    _react2.default.createElement(
      "div",
      { className: "col-xs-12 col-sm-5", style: { padding: "0px" } },
      getItems(leftItems)
    ),
    _react2.default.createElement(
      "div",
      { className: "col-xs-12 col-sm-5", style: { padding: "0px" } },
      getItems(rightItems)
    )
  );
};
exports.default = Receipt;
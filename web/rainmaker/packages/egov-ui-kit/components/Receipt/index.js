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
  var receiptItems = _ref.receiptItems;

  var getItems = function getItems(items) {
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "col-xs-12 col-sm-6" },
        items && items.map(function (item, index) {
          return _react2.default.createElement(_translationNode2.default, { label: item.key });
        })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-12 col-sm-6" },
        items && items.map(function (item, index) {
          return _react2.default.createElement(_translationNode2.default, { label: item.value });
        })
      )
    );
  };

  return receiptItems && _react2.default.createElement(
    "div",
    { className: "clearfix", style: { height: "inherit" } },
    receiptItems[0] && receiptItems[0].leftItems && _react2.default.createElement(
      "div",
      { className: "col-xs-12 col-sm-6" },
      getItems(receiptItems[0].leftItems)
    ),
    receiptItems[0] && receiptItems[0].leftItems && _react2.default.createElement(
      "div",
      { className: "col-xs-12 col-sm-6" },
      getItems(receiptItems[1].rightItems)
    )
  );
};
exports.default = Receipt;

// <div className="clearfix">
// <div className="col-xs-12 col-sm-6">
//   <div className="col-xs-12 col-sm-6">
//     <Label label="House No:" />
//     <Label label="Street Name:" />
//     <Label label="Pincode:" />
//   </div>
//   <div className="col-xs-12 col-sm-6">
//     <Label label="E2/14" />
//     <Label label="Kandwa Road" />
//     <Label label="560098" />
//   </div>
// </div>
/* <div className="col-xs-12 col-sm-6">
        <div className="col-xs-12 col-sm-6">
          <Label label="Colony Name:" />
          <Label label="Mohalla:" />
          <Label label="Property ID:" />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Label label="Salunke Vihar" />
          <Label label="Harinagar" />
          <Label label="XC-345-76" />
        </div>
      </div> */
// </div>
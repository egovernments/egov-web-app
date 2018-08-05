"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _PropertyInformation = require("../PropertyInformation");

var _PropertyInformation2 = _interopRequireDefault(_PropertyInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReceiptDialog = function (_Component) {
  (0, _inherits3.default)(ReceiptDialog, _Component);

  function ReceiptDialog() {
    (0, _classCallCheck3.default)(this, ReceiptDialog);
    return (0, _possibleConstructorReturn3.default)(this, (ReceiptDialog.__proto__ || Object.getPrototypeOf(ReceiptDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(ReceiptDialog, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          closeDialogue = _props.closeDialogue;

      return _react2.default.createElement(_components.Dialog, {
        titleStyle: { textAlign: "left", padding: "5px 15px" },
        bodyStyle: { padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" },
        title: "Paid",
        modal: false,
        onRequestClose: closeDialogue,
        autoScrollBodyContent: true,
        handleClose: closeDialogue,
        open: open,
        children: [_react2.default.createElement(_PropertyInformation2.default, null)]
        // bodyStyle={{ backgroundColor: "#ffffff" }}
        , isClose: true,
        contentStyle: { width: "80%" }
      });
    }
  }]);
  return ReceiptDialog;
}(_react.Component);

exports.default = ReceiptDialog;
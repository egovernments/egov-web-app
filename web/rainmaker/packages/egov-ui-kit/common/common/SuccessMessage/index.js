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

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SuccessMessage = function (_Component) {
  (0, _inherits3.default)(SuccessMessage, _Component);

  function SuccessMessage() {
    (0, _classCallCheck3.default)(this, SuccessMessage);
    return (0, _possibleConstructorReturn3.default)(this, (SuccessMessage.__proto__ || Object.getPrototypeOf(SuccessMessage)).apply(this, arguments));
  }

  (0, _createClass3.default)(SuccessMessage, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          successmessage = _props.successmessage,
          secondaryLabel = _props.secondaryLabel,
          tertiaryLabel = _props.tertiaryLabel,
          icon = _props.icon,
          backgroundColor = _props.backgroundColor;

      return _react2.default.createElement(
        "div",
        { className: "success-message-main-cont " },
        _react2.default.createElement(
          "div",
          { className: "success-message-inner-cont" },
          _react2.default.createElement(
            "div",
            { className: "success-message-icon-cont" },
            _react2.default.createElement(
              _FloatingActionButton2.default,
              { className: "floating-button", style: { boxShadow: 0 }, backgroundColor: backgroundColor },
              icon
            )
          ),
          _react2.default.createElement(_translationNode2.default, { className: "thankyou-text", label: successmessage, color: "#767676" }),
          _react2.default.createElement(_translationNode2.default, { className: "secondary-text", label: secondaryLabel, color: "#767676" }),
          _react2.default.createElement(_translationNode2.default, { className: "tertiary-text", label: tertiaryLabel, color: "#767676" })
        )
      );
    }
  }]);
  return SuccessMessage;
}(_react.Component);

exports.default = SuccessMessage;
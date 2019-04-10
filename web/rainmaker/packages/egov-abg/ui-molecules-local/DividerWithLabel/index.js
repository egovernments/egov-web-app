"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
  position: "relative",
  fontFamily: "Roboto",
  fontSize: 14,
  letterSpacing: 0.6,
  padding: "5px 0px",
  display: "inline-block"
};

var underlineStyle = {
  position: "absolute",
  bottom: -1,
  borderBottom: "2px solid #FE7A51",
  width: "100%"
};

var dividerStyle = {
  borderBottom: "1px solid rgba(5, 5, 5, 0.12)"
};

var DividerWithLabel = function (_Component) {
  (0, _inherits3.default)(DividerWithLabel, _Component);

  function DividerWithLabel() {
    (0, _classCallCheck3.default)(this, DividerWithLabel);
    return (0, _possibleConstructorReturn3.default)(this, (DividerWithLabel.__proto__ || Object.getPrototypeOf(DividerWithLabel)).apply(this, arguments));
  }

  (0, _createClass3.default)(DividerWithLabel, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          labelProps = _props.labelProps,
          label = _props.label;

      return _react2.default.createElement(
        "div",
        { style: dividerStyle },
        _react2.default.createElement(
          "div",
          { style: (0, _extends3.default)({}, labelStyle, labelProps.style) },
          _react2.default.createElement(
            "span",
            null,
            label
          ),
          _react2.default.createElement("div", { style: underlineStyle })
        )
      );
    }
  }]);
  return DividerWithLabel;
}(_react.Component);

exports.default = DividerWithLabel;
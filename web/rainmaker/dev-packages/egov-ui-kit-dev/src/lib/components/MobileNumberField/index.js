"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require("../TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box"
};

var textFieldBaseStyle = {
  textIndent: 35
};

var prefixBaseStyle = {
  position: "absolute",
  color: "#969696",
  zIndex: 2,
  top: 35,
  paddingRight: 5,
  borderRight: "1px solid #eee"
};

var floatingLabelStyle = {
  left: -35
};

var MobileNumberField = function MobileNumberField(_ref) {
  var className = _ref.className,
      _ref$textFieldStyle = _ref.textFieldStyle,
      textFieldStyle = _ref$textFieldStyle === undefined ? {} : _ref$textFieldStyle,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? "+91" : _ref$prefix,
      _ref$prefixStyle = _ref.prefixStyle,
      prefixStyle = _ref$prefixStyle === undefined ? {} : _ref$prefixStyle,
      textFieldProps = (0, _objectWithoutProperties3.default)(_ref, ["className", "textFieldStyle", "prefix", "prefixStyle"]);

  return _react2.default.createElement(
    "div",
    { style: containerStyle },
    _react2.default.createElement(
      "div",
      { style: (0, _extends3.default)({}, prefixBaseStyle, prefixStyle) },
      prefix
    ),
    _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
      className: "mobile-number-field " + className,
      id: "mobile-number-field",
      name: "mobile-number-field",
      errorStyle: { marginLeft: "-35px" },
      style: (0, _extends3.default)({}, textFieldBaseStyle, textFieldStyle)
    }, textFieldProps, {
      floatingLabelStyle: floatingLabelStyle,
      type: "number"
    }))
  );
};

MobileNumberField.propTypes = {
  textFieldStyle: _propTypes2.default.object,
  prefixStyle: _propTypes2.default.object,
  prefix: _propTypes2.default.string
};

exports.default = MobileNumberField;
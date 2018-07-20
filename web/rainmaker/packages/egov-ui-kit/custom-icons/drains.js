"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("material-ui/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Animals = function Animals(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 24 24", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M11 7.763c.915 0 1.525-.66 2.44-.66s1.525.66 2.44.66c.222 0 .425-.038.62-.096l-.62 2.076c-.915 0-1.525-.66-2.44-.66s-1.525.66-2.44.66-1.525-.66-2.44-.66-1.524.66-2.44.66L5.5 7.667c.195.058.399.096.62.096.915 0 1.525-.66 2.44-.66s1.525.66 2.44.66zM0 .11h1.848L6.16 13.75H0V.11zm15.84 13.64L20.152.11H22v13.64h-6.16zM11 13.608c-.915 0-1.525-.66-2.44-.66-.456 0-.945.211-1.324.375l-.526-1.785c.621-.18 1.145-.57 1.85-.57.915 0 1.525.66 2.44.66s1.525-.66 2.44-.66c.705 0 1.23.39 1.85.57l-.526 1.785c-.38-.164-.868-.375-1.324-.375-.915 0-1.525.66-2.44.66zm0-9.71c.909 0 1.514-.66 2.423-.66s1.515.66 2.423.66c.75 0 1.296-.444 1.974-.602l-.68 2.295c-.223.076-1.035.288-1.294.288-.909 0-1.514-.66-2.423-.66s-1.515.66-2.423.66c-.909 0-1.514-.66-2.423-.66-.908 0-1.514.66-2.423.66-.259 0-1.07-.212-1.294-.288l-.68-2.295c.678.158 1.224.602 1.974.602.908 0 1.514-.66 2.423-.66s1.514.66 2.423.66z",
      id: "a"
    })
  );
};

exports.default = Animals;
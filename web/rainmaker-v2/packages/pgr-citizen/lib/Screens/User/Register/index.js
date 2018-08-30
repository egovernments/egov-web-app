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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _RegisterForm = require("./components/RegisterForm");

var _RegisterForm2 = _interopRequireDefault(_RegisterForm);

var _Banner = require("egov-ui-kit/common/common/Banner");

var _Banner2 = _interopRequireDefault(_Banner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegisterFormHOC = (0, _form2.default)({ formKey: "register" })(_RegisterForm2.default);

var Register = function (_Component) {
  (0, _inherits3.default)(Register, _Component);

  function Register() {
    (0, _classCallCheck3.default)(this, Register);
    return (0, _possibleConstructorReturn3.default)(this, (Register.__proto__ || Object.getPrototypeOf(Register)).apply(this, arguments));
  }

  (0, _createClass3.default)(Register, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _Banner2.default,
        { hideBackButton: true },
        _react2.default.createElement(RegisterFormHOC, null)
      );
    }
  }]);
  return Register;
}(_react.Component);

exports.default = Register;
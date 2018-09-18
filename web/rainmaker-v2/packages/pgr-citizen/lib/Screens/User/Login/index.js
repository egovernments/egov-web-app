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

var _LoginForm = require("./components/LoginForm");

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginFormHOC = (0, _form2.default)({ formKey: "login" })(_LoginForm2.default);

var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login() {
    (0, _classCallCheck3.default)(this, Login);
    return (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
  }

  (0, _createClass3.default)(Login, [{
    key: "render",

    //className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8"
    value: function render() {
      return _react2.default.createElement(
        _common.Banner,
        null,
        _react2.default.createElement(LoginFormHOC, null)
      );
    }
  }]);
  return Login;
}(_react.Component);

exports.default = Login;
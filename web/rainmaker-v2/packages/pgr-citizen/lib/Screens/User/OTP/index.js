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

var _reactRedux = require("react-redux");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _common = require("modules/common");

var _OTPForm = require("./components/OTPForm");

var _OTPForm2 = _interopRequireDefault(_OTPForm);

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/auth/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTPFormHOC = (0, _form2.default)({ formKey: "otp" })(_OTPForm2.default);

var OTP = function (_Component) {
  (0, _inherits3.default)(OTP, _Component);

  function OTP() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OTP);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OTP.__proto__ || Object.getPrototypeOf(OTP)).call.apply(_ref, [this].concat(args))), _this), _this.resendOTP = function () {
      var _this$props = _this.props,
          sendOTP = _this$props.sendOTP,
          intent = _this$props.intent;

      sendOTP(intent);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(OTP, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var previousRoute = this.props.previousRoute;

      if (previousRoute.length === 0) {
        this.props.history.push("/user/register");
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          submitForm = _props.submitForm,
          handleFieldChange = _props.handleFieldChange,
          previousRoute = _props.previousRoute;

      var otpElement = document.getElementById("otp");
      otpElement.addEventListener("smsReceived", function (e) {
        localStorage.setItem("isNative", true);
        var otp = e.detail.otp;

        handleFieldChange("otp", "otp", otp);
        if (previousRoute === "/citizen/user/register") {
          submitForm("otp", "/user/citizen/_create");
        } else {
          submitForm("otp");
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var otpElement = document.getElementById("otp");
      otpElement.removeEventListener("smsReceived", null);
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          phoneNumber = _props2.phoneNumber,
          loading = _props2.loading;
      var resendOTP = this.resendOTP;


      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "force-padding-0" },
        _react2.default.createElement(
          _common.Banner,
          null,
          _react2.default.createElement(OTPFormHOC, { resendOTP: resendOTP, phoneNumber: phoneNumber })
        )
      );
    }
  }]);
  return OTP;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var authenticating = state.auth.authenticating;
  var previousRoute = state.app.previousRoute;

  var intent = previousRoute.endsWith("register") ? "register" : previousRoute.endsWith("login") ? "login" : null;
  var phoneNumber = null;
  if (intent) {
    phoneNumber = state.form[intent].fields.phone.value;
  }
  return { previousRoute: previousRoute, intent: intent, phoneNumber: phoneNumber, loading: authenticating };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    },
    submitForm: function submitForm(formKey, saveUrl) {
      return dispatch((0, _actions.submitForm)(formKey, saveUrl));
    },
    sendOTP: function sendOTP(otp) {
      return dispatch((0, _actions2.sendOTP)(otp));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OTP);
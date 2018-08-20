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

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PastPaymentDetailsForm = function PastPaymentDetailsForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { className: "past-payment-form" },
    _react2.default.createElement(_field2.default, { fieldKey: "receipt", field: fields.receipt, handleFieldChange: handleFieldChange, className: "receipt" }),
    _react2.default.createElement(_field2.default, { fieldKey: "amount", field: fields.amount, handleFieldChange: handleFieldChange, className: "amount" }),
    _react2.default.createElement(_field2.default, { fieldKey: "misplacedReceipt", field: fields.misplacedReceipt, handleFieldChange: handleFieldChange, className: "misplacedReceipt" })
  );
};

var PastPaymentDetailsFormHoc = function PastPaymentDetailsFormHoc(props) {
  var DetailsForm = (0, _form2.default)((0, _extends3.default)({}, props))(PastPaymentDetailsForm);
  return _react2.default.createElement(DetailsForm, null);
};

var PastPaymentDetails = function (_React$Component) {
  (0, _inherits3.default)(PastPaymentDetails, _React$Component);

  function PastPaymentDetails() {
    (0, _classCallCheck3.default)(this, PastPaymentDetails);
    return (0, _possibleConstructorReturn3.default)(this, (PastPaymentDetails.__proto__ || Object.getPrototypeOf(PastPaymentDetails)).apply(this, arguments));
  }

  (0, _createClass3.default)(PastPaymentDetails, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(PastPaymentDetailsFormHoc, (0, _extends3.default)({ path: "PropertyTaxPay" }, this.props));
    }
  }]);
  return PastPaymentDetails;
}(_react2.default.Component);

exports.default = PastPaymentDetails;
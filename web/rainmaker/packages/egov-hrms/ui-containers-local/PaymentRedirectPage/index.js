"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("../../ui-utils/api");

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentRedirect = function (_Component) {
  (0, _inherits3.default)(PaymentRedirect, _Component);

  function PaymentRedirect() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PaymentRedirect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaymentRedirect.__proto__ || Object.getPrototypeOf(PaymentRedirect)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var search, pgUpdateResponse, moduleId, tenantId, transactionId;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //let { history } = this.props;
              search = _this.props.location.search;
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)("post", "pg-service/transaction/v1/_update" + search, "_update", [], {});

            case 4:
              pgUpdateResponse = _context.sent;
              moduleId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].moduleId");
              tenantId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].tenantId");
              //let txnAmount = get(pgUpdateResponse, "Transaction[0].txnAmount");

              if ((0, _get2.default)(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
                window.location.href = "/hrms/egov-ui-framework/hrms/acknowledgement?purpose=" + "pay" + "&status=" + "failure" + "&applicationNumber=" + moduleId + "&tenantId=" + tenantId;
              } else {
                transactionId = (0, _get2.default)(pgUpdateResponse, "Transaction[0].txnId");


                window.location.href = "/hrms/egov-ui-framework/hrms/acknowledgement?purpose=" + "pay" + "&status=" + "success" + "&applicationNumber=" + moduleId + "&tenantId=" + tenantId + "&secondNumber=" + transactionId;
              }
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);

              alert(_context.t0);
              // history.push("/property-tax/payment-success/"+moduleId.split("-",(moduleId.split("-").length-1)).join("-"))

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 10]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PaymentRedirect, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null);
    }
  }]);
  return PaymentRedirect;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)(PaymentRedirect);
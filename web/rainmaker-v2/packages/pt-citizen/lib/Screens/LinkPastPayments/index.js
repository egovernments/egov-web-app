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

var _common = require("modules/common");

var _PastPaymentList = require("./PastPaymentList");

var _PastPaymentList2 = _interopRequireDefault(_PastPaymentList);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkLastPayments = function (_Component) {
  (0, _inherits3.default)(LinkLastPayments, _Component);

  function LinkLastPayments() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LinkLastPayments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LinkLastPayments.__proto__ || Object.getPrototypeOf(LinkLastPayments)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      items: [{
        primaryText: "2016 - 2017"
      }, {
        primaryText: "2017 - 2018"
      }, {
        primaryText: "2017 - 2018"
      }, {
        primaryText: "2018 - 2019"
      }, {
        primaryText: "2018 - 2019"
      }]
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LinkLastPayments, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _common.Screen,
        { className: "pt-home-screen" },
        _react2.default.createElement(_PastPaymentList2.default, {
          items: this.state.items,
          header: "Have you paid yor property tax before?",
          subHeader: "If yes, please indicate below to link your payments"
        })
      );
    }
  }]);
  return LinkLastPayments;
}(_react.Component);

exports.default = LinkLastPayments;
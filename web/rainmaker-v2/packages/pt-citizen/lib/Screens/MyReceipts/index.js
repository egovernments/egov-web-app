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

var _components = require("components");

var _PTList = require("../common/PTList");

var _PTList2 = _interopRequireDefault(_PTList);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyReceipts = function (_Component) {
  (0, _inherits3.default)(MyReceipts, _Component);

  function MyReceipts() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MyReceipts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MyReceipts.__proto__ || Object.getPrototypeOf(MyReceipts)).call.apply(_ref, [this].concat(args))), _this), _this.reciepts = [{
      name: "E2/14, Salunke Vihar",
      years: [{
        yearRange: "2018-2019"
      }, {
        yearRange: "2017-2018"
      }]
    }, {
      name: "P-9.2, Tilak Nagar",
      years: [{
        yearRange: "2018-2019"
      }, {
        yearRange: "2017-2018"
      }]
    }], _this.getListItems = function (reciepts) {
      return reciepts.map(function (reciept, index) {
        return {
          primaryText: _react2.default.createElement(_components.Label, { label: reciept.name, fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 900 } }),
          leftIcon: _react2.default.createElement(_components.Icon, { action: "action", name: "receipt" }),
          nestedItems: reciept.years && reciept.years.map(function (year) {
            return {
              primaryText: _react2.default.createElement(_components.Label, { label: year.yearRange, fontSize: "16px", color: "#484848" })
            };
          })
        };
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MyReceipts, [{
    key: "render",
    value: function render() {
      var getListItems = this.getListItems,
          reciepts = this.reciepts;

      return _react2.default.createElement(
        _common.Screen,
        null,
        _react2.default.createElement(_PTList2.default, { items: getListItems(reciepts), label: "My Receipts" })
      );
    }
  }]);
  return MyReceipts;
}(_react.Component);

exports.default = MyReceipts;
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

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LanguageSelection = function (_Component) {
  (0, _inherits3.default)(LanguageSelection, _Component);

  function LanguageSelection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LanguageSelection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LanguageSelection.__proto__ || Object.getPrototypeOf(LanguageSelection)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: localStorage.getItem("locale"),
      items: [{
        label: "ENGLISH",
        value: "en_IN"
      }, {
        label: "हिंदी",
        value: "hi_IN"
      }, {
        label: "ਪੰਜਾਬੀ",
        value: "pn_IN"
      }]
    }, _this.onClick = function (value) {
      _this.setState({ value: value });
      _this.props.fetchLocalizationLabel(value);
    }, _this.onLanguageSelect = function () {
      _this.props.history.push("/user/register");
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LanguageSelection, [{
    key: "render",
    value: function render() {
      var _state = this.state,
          items = _state.items,
          value = _state.value;
      var onLanguageSelect = this.onLanguageSelect,
          onClick = this.onClick;


      return _react2.default.createElement(
        _common.Banner,
        { className: "language-selection" },
        _react2.default.createElement(_common.LanguageSelectionForm, { items: items, value: value, onLanguageSelect: onLanguageSelect, onClick: onClick })
      );
    }
  }]);
  return LanguageSelection;
}(_react.Component);

var dispatchToProps = function dispatchToProps(dispatch) {
  return {
    fetchLocalizationLabel: function fetchLocalizationLabel(locale) {
      return dispatch((0, _actions.fetchLocalizationLabel)(locale));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, dispatchToProps)(LanguageSelection);
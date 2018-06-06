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
      value: localStorage.getItem("locale")
    }, _this.onClick = function (value) {
      _this.setState({ value: value });
      _this.props.fetchLocalizationLabel(value);
    }, _this.languages = [{
      label: "ENGLISH",
      value: "en_IN"
    }, {
      label: "हिंदी",
      value: "hi_IN"
    }, {
      label: "ਪੰਜਾਬੀ",
      value: "pn_IN"
    }], _this.styles = {
      selectedLabelStyle: {
        color: "#ffffff"
      },
      selectedStyle: {
        backgroundColor: "rgb(254, 122, 81)",
        border: "1px solid rgb(254, 122, 81)"
      },
      defaultStyle: {
        border: "1px solid #484848",
        borderRadius: "1px",
        marginRight: "4.65%",
        height: "30px",
        lineHeight: "30px",
        width: "28.48%",
        minWidth: "inherit",
        padding: 0
      },
      defaultLabelStyle: {
        textTransform: "none",
        fontWeight: "500",
        color: "#484848",
        verticalAlign: "initial",
        padding: 0
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LanguageSelection, [{
    key: "render",
    value: function render() {
      var styles = this.styles,
          languages = this.languages,
          onClick = this.onClick;
      var value = this.state.value;

      return _react2.default.createElement(
        "div",
        { className: "drawer-button-toggle-container" },
        _react2.default.createElement(_components.ButtonGroup, {
          items: languages,
          onClick: onClick,
          selected: value,
          defaultStyle: styles.defaultStyle,
          defaultLabelStyle: styles.defaultLabelStyle,
          selectedStyle: styles.selectedStyle,
          selectedLabelStyle: styles.selectedLabelStyle,
          multiple: false
        })
      );
    }
  }]);
  return LanguageSelection;
}(_react.Component);

exports.default = LanguageSelection;
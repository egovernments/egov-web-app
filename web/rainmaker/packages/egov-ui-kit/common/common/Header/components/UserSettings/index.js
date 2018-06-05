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

var _faceTwo = require("egov-ui-kit/assets/images/faceTwo.jpg");

var _faceTwo2 = _interopRequireDefault(_faceTwo);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSettings = function (_Component) {
  (0, _inherits3.default)(UserSettings, _Component);

  function UserSettings() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UserSettings);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UserSettings.__proto__ || Object.getPrototypeOf(UserSettings)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      languageSelected: localStorage.getItem("locale")
    }, _this.items = [{
      label: "ENGLISH",
      value: "en_IN"
    }, {
      label: "हिंदी",
      value: "hi_IN"
    }, {
      label: "ਪੰਜਾਬੀ",
      value: "pn_IN"
    }], _this.style = {
      baseStyle: {
        background: "#ffffff",
        height: "65px",
        marginRight: "30px",
        width: "98px",
        marginBottom: "24px"
      },
      label: {
        color: "#5F5C57",
        fontSize: "12px",
        paddingRight: "0px"
      },
      arrowIconStyle: {
        marginTop: "7px",
        marginLeft: "10px"
      },
      iconStyle: {
        marginRight: "30px"
      }
    }, _this.onChange = function (event, index, value) {
      _this.setState({ languageSelected: value });
      _this.props.fetchLocalizationLabel(value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UserSettings, [{
    key: "render",
    value: function render() {
      var languageSelected = this.state.languageSelected;
      var items = this.items,
          style = this.style;
      var onIconClick = this.props.onIconClick;


      return _react2.default.createElement(
        "div",
        { className: "userSettingsContainer" },
        _react2.default.createElement(_components.DropDown, { onChange: this.onChange, style: style.baseStyle, labelStyle: style.label, dropDownData: items, value: languageSelected }),
        _react2.default.createElement(_components.Icon, { action: "social", name: "notifications", color: "#767676", style: style.iconStyle }),
        _react2.default.createElement(
          "div",
          { onClick: onIconClick, className: "userSettingsInnerContainer" },
          _react2.default.createElement(_components.Image, { height: 33, width: 33, circular: true, source: _faceTwo2.default }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "arrow-drop-down", color: "#767676", style: style.arrowIconStyle })
        )
      );
    }
  }]);
  return UserSettings;
}(_react.Component);

exports.default = UserSettings;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _search = require("material-ui/svg-icons/action/search");

var _search2 = _interopRequireDefault(_search);

var _TextFieldIcon = require("../TextFieldIcon");

var _TextFieldIcon2 = _interopRequireDefault(_TextFieldIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSuggest = function (_Component) {
  _inherits(AutoSuggest, _Component);

  function AutoSuggest() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AutoSuggest);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutoSuggest.__proto__ || Object.getPrototypeOf(AutoSuggest)).call.apply(_ref, [this].concat(args))), _this), _this.state = { inputValue: "" }, _this.styles = {
      defaultContainerStyle: { background: "#fff", padding: "0px 10px" },
      defaultTextFieldStyle: { border: "1px solid  #e0e0e0", background: "#f7f7f7", height: "48px" },
      defaultIconStyle: { left: "5px", bottom: "10px", color: "#767676" }
    }, _this.fetchSuggestions = function (inputValue) {
      inputValue = inputValue.toLowerCase();
      if (inputValue.length > 0) {
        var _this$props = _this.props,
            searchKey = _this$props.searchKey,
            dataSource = _this$props.dataSource;

        return dataSource.filter(function (result) {
          return _typeof(result[searchKey]) === "object" ? result[searchKey].props.label.toLowerCase().indexOf(inputValue) !== -1 : result[searchKey].toLowerCase().indexOf(inputValue) !== -1;
        });
      }
    }, _this.onChange = function (e) {
      var inputValue = e.target.value;
      var suggestions = _this.fetchSuggestions(inputValue);
      _this.props.callback(suggestions, inputValue);
      _this.setState({ inputValue: inputValue });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AutoSuggest, [{
    key: "render",
    value: function render() {
      var onChange = this.onChange,
          styles = this.styles;
      var inputValue = this.state.inputValue;
      var _props = this.props,
          containerStyle = _props.containerStyle,
          textFieldStyle = _props.textFieldStyle,
          iconStyle = _props.iconStyle,
          searchInputText = _props.searchInputText,
          hintStyle = _props.hintStyle,
          iconPosition = _props.iconPosition,
          autoFocus = _props.autoFocus;


      return _react2.default.createElement(
        "div",
        { style: _extends({}, styles.defaultContainerStyle, containerStyle), className: "search-field-container" },
        _react2.default.createElement(_TextFieldIcon2.default, {
          textFieldStyle: _extends({}, styles.defaultTextFieldStyle, textFieldStyle),
          inputStyle: { marginTop: "8px" },
          hintStyle: _extends({ bottom: 8 }, hintStyle),
          iconStyle: _extends({}, styles.defaultIconStyle, iconStyle),
          iconPosition: iconPosition ? iconPosition : "before",
          underlineShow: false,
          fullWidth: true,
          hintText: searchInputText,
          Icon: _search2.default,
          onChange: onChange,
          value: inputValue,
          id: this.props.id,
          autoFocus: autoFocus
        })
      );
    }
  }]);

  return AutoSuggest;
}(_react.Component);

AutoSuggest.propTypes = { callback: _propTypes2.default.func, dataSource: _propTypes2.default.array, searchKey: _propTypes2.default.string };
exports.default = AutoSuggest;
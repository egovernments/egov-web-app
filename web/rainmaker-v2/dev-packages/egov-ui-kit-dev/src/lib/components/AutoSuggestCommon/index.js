"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _search = require("material-ui/svg-icons/action/search");

var _search2 = _interopRequireDefault(_search);

var _TextFieldIcon = require("../TextFieldIcon");

var _TextFieldIcon2 = _interopRequireDefault(_TextFieldIcon);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoSuggest = function (_Component) {
  (0, _inherits3.default)(AutoSuggest, _Component);

  function AutoSuggest() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoSuggest);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoSuggest.__proto__ || Object.getPrototypeOf(AutoSuggest)).call.apply(_ref, [this].concat(args))), _this), _this.state = { inputValue: "" }, _this.styles = {
      defaultContainerStyle: { background: "#fff", padding: "0px 10px" },
      defaultTextFieldStyle: { border: "1px solid  #e0e0e0", background: "#f7f7f7", height: "48px" },
      defaultIconStyle: { left: "5px", color: "#767676" }
    }, _this.filterSuggestion = function (suggestion, searchTerm, searchKey) {
      var searchValue = (0, _get2.default)(suggestion, searchKey);
      return searchValue.toLowerCase().replace(/\s+/g, "").indexOf(searchTerm) !== -1;
    }, _this.fetchSuggestions = function (inputValue) {
      inputValue = inputValue.replace(/\s+/g, "").toLowerCase();
      if (inputValue.length > 0) {
        var _this$props = _this.props,
            searchKey = _this$props.searchKey,
            dataSource = _this$props.dataSource;

        return dataSource.filter(function (result) {
          return _this.filterSuggestion(result, inputValue, searchKey);
        });
      }
    }, _this.onChange = function (e) {
      var inputValue = e.target.value;
      var suggestions = _this.fetchSuggestions(inputValue);
      _this.props.callback(suggestions, inputValue);
      _this.setState({ inputValue: inputValue });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoSuggest, [{
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
        { style: (0, _extends3.default)({}, styles.defaultContainerStyle, containerStyle), className: "search-field-container" },
        _react2.default.createElement(_TextFieldIcon2.default, {
          textFieldStyle: (0, _extends3.default)({}, styles.defaultTextFieldStyle, textFieldStyle),
          inputStyle: { marginTop: "8px" },
          hintStyle: (0, _extends3.default)({ bottom: 8 }, hintStyle),
          iconStyle: (0, _extends3.default)({}, styles.defaultIconStyle, iconStyle),
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
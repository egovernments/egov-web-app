"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _AutoSuggestDropdown$;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require("material-ui/AutoComplete");

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "#b3b3b3"
};
var floatingLabelStyle = {
  color: "rgb(0, 188, 209)",
  fontSize: 16,
  letterSpacing: 0.6,
  fontWeight: 500,
  marginBottom: 5
};
var underlineFocusBaseStyle = {
  borderColor: "#e0e0e0"
};
var requiredStyle = {
  color: "red"
};
var underlineDisabledStyle = {
  borderBottom: "1px solid #e0e0e0"
};

var AutoSuggestDropdown = function (_React$Component) {
  (0, _inherits3.default)(AutoSuggestDropdown, _React$Component);

  function AutoSuggestDropdown() {
    (0, _classCallCheck3.default)(this, AutoSuggestDropdown);
    return (0, _possibleConstructorReturn3.default)(this, (AutoSuggestDropdown.__proto__ || Object.getPrototypeOf(AutoSuggestDropdown)).apply(this, arguments));
  }

  (0, _createClass3.default)(AutoSuggestDropdown, [{
    key: "render",

    //  state = {
    //   searchText: '',
    // };
    //
    // handleUpdateInput = (searchText) => {
    //   this.setState({
    //     searchText: searchText,
    //   });
    // };

    value: function render() {
      var _props = this.props,
          onChange = _props.onChange,
          dataSource = _props.dataSource,
          floatingLabelText = _props.floatingLabelText,
          className = _props.className,
          required = _props.required,
          value = _props.value,
          jsonPath = _props.jsonPath,
          errorMessage = _props.errorMessage,
          boundary = _props.boundary,
          dropDownData = _props.dropDownData,
          dataFetchConfig = _props.dataFetchConfig,
          restProps = (0, _objectWithoutProperties3.default)(_props, ["onChange", "dataSource", "floatingLabelText", "className", "required", "value", "jsonPath", "errorMessage", "boundary", "dropDownData", "dataFetchConfig"]);


      return _react2.default.createElement(_AutoComplete2.default, (0, _extends3.default)({
        className: "autosuggest " + className,
        floatingLabelFixed: true,
        floatingLabelStyle: (0, _extends3.default)({}, floatingLabelStyle),
        hintStyle: (0, _extends3.default)({}, hintBaseStyle),
        underlineFocusStyle: (0, _extends3.default)({}, underlineFocusBaseStyle),
        filter: _AutoComplete2.default.caseInsensitiveFilter,
        openOnFocus: false,
        fullWidth: true,
        value: value,
        dataSource: dataSource && [].concat((0, _toConsumableArray3.default)(dataSource)) || [],
        menuStyle: { maxHeight: "150px", overflowY: "auto" },
        dataSourceConfig: { text: "label", value: "value" },
        onNewRequest: onChange,
        underlineDisabledStyle: underlineDisabledStyle,
        floatingLabelText: [floatingLabelText, required ? _react2.default.createElement(
          "span",
          { key: "error-" + className, style: requiredStyle },
          " ",
          "*"
        ) : null]
      }, restProps));
    }
  }]);
  return AutoSuggestDropdown;
}(_react2.default.Component);

AutoSuggestDropdown.propTypes = (_AutoSuggestDropdown$ = {
  onNewRequest: _propTypes2.default.func,
  errorText: _propTypes2.default.string,
  hintStyle: _propTypes2.default.object,
  underlineFocusStyle: _propTypes2.default.object
}, (0, _defineProperty3.default)(_AutoSuggestDropdown$, "hintStyle", _propTypes2.default.object), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "floatingLabelStyle", _propTypes2.default.object), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "value", _propTypes2.default.string), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "floatingLabelFixed", _propTypes2.default.bool), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "dataSource", _propTypes2.default.array), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "hintText", _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "required", _propTypes2.default.bool), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "openOnFocus", _propTypes2.default.bool), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "floatingLabelText", _propTypes2.default.string), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "className", _propTypes2.default.string), _AutoSuggestDropdown$);

exports.default = AutoSuggestDropdown;

// value={value}
// searchKey={value}
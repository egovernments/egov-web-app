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

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "rgba(0, 0, 0, 0.3799999952316284)"
};
var floatingLabelStyle = {
  color: "rgba(0, 0, 0, 0.6000000238418579)",
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
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoSuggestDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoSuggestDropdown.__proto__ || Object.getPrototypeOf(AutoSuggestDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      searchText: ""
    }, _this.getNameById = function (id) {
      var dropDownData = _this.props.dropDownData;

      var filteredArray = (0, _filter2.default)(dropDownData, { value: id });
      return filteredArray.length > 0 ? filteredArray[0].label : id;
    }, _this.onChangeText = function (searchText, dataSource, params) {
      _this.setState({ searchText: searchText });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoSuggestDropdown, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var getNameById = this.getNameById;

      if (!(0, _isUndefined2.default)(nextProps.value)) {
        this.setState({ searchText: getNameById(nextProps.value) });
      }
    }
  }, {
    key: "render",
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
          toolTip = _props.toolTip,
          updateDependentFields = _props.updateDependentFields,
          toolTipMessage = _props.toolTipMessage,
          restProps = (0, _objectWithoutProperties3.default)(_props, ["onChange", "dataSource", "floatingLabelText", "className", "required", "value", "jsonPath", "errorMessage", "boundary", "dropDownData", "toolTip", "updateDependentFields", "toolTipMessage"]);
      var filterAutoComplete = this.filterAutoComplete,
          getNameById = this.getNameById,
          onChangeText = this.onChangeText;
      var searchText = this.state.searchText;

      var items = (0, _sortBy2.default)(dataSource, ["label"]);
      return _react2.default.createElement(_AutoComplete2.default, (0, _extends3.default)({
        className: "autosuggest " + className,
        floatingLabelFixed: true,
        floatingLabelStyle: (0, _extends3.default)({}, floatingLabelStyle),
        hintStyle: (0, _extends3.default)({}, hintBaseStyle),
        underlineFocusStyle: (0, _extends3.default)({}, underlineFocusBaseStyle),
        openOnFocus: true,
        fullWidth: true,
        searchText: searchText,
        underlineDisabledStyle: underlineDisabledStyle,
        dataSource: items && [].concat((0, _toConsumableArray3.default)(items)) || [],
        menuStyle: { maxHeight: "150px", overflowY: "auto" },
        dataSourceConfig: { text: "label", value: "value" },
        onNewRequest: onChange,
        onUpdateInput: onChangeText,
        filter: function filter(searchText, key) {
          return key.toLowerCase().includes(getNameById(searchText) && getNameById(searchText.toLowerCase()));
        },
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
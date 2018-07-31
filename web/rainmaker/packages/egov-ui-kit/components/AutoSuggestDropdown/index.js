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

var _AutoSuggestDropdown$;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require("material-ui/AutoComplete");

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var AutoSuggestDropdown = function AutoSuggestDropdown(_ref) {
  var onChange = _ref.onChange,
      dataSource = _ref.dataSource,
      floatingLabelText = _ref.floatingLabelText,
      className = _ref.className,
      required = _ref.required,
      value = _ref.value,
      restProps = (0, _objectWithoutProperties3.default)(_ref, ["onChange", "dataSource", "floatingLabelText", "className", "required", "value"]);

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
    floatingLabelText: [floatingLabelText, required ? _react2.default.createElement(
      "span",
      { key: "error-" + className, style: requiredStyle },
      " ",
      "*"
    ) : null]
  }, restProps));
};

AutoSuggestDropdown.propTypes = (_AutoSuggestDropdown$ = {
  onNewRequest: _propTypes2.default.func,
  errorText: _propTypes2.default.string,
  hintStyle: _propTypes2.default.object,
  underlineFocusStyle: _propTypes2.default.object
}, (0, _defineProperty3.default)(_AutoSuggestDropdown$, "hintStyle", _propTypes2.default.object), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "floatingLabelStyle", _propTypes2.default.object), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "value", _propTypes2.default.string), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "floatingLabelFixed", _propTypes2.default.bool), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "dataSource", _propTypes2.default.array), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "hintText", _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "required", _propTypes2.default.bool), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "openOnFocus", _propTypes2.default.bool), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "floatingLabelText", _propTypes2.default.string), (0, _defineProperty3.default)(_AutoSuggestDropdown$, "className", _propTypes2.default.string), _AutoSuggestDropdown$);

exports.default = AutoSuggestDropdown;
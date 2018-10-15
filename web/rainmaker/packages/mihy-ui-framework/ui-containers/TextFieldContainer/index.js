"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiMolecules = require("../../ui-molecules");

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _commons = require("../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse(window.localStorage.getItem("localization_en_IN"));

var getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = (0, _commons.getTranslatedLabel)(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

var TextFieldContainer = function (_React$Component) {
  (0, _inherits3.default)(TextFieldContainer, _React$Component);

  function TextFieldContainer() {
    (0, _classCallCheck3.default)(this, TextFieldContainer);
    return (0, _possibleConstructorReturn3.default)(this, (TextFieldContainer.__proto__ || Object.getPrototypeOf(TextFieldContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(TextFieldContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$label = _props.label,
          label = _props$label === undefined ? {} : _props$label,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? {} : _props$placeholder,
          jsonPath = _props.jsonPath,
          _props$iconObj = _props.iconObj,
          iconObj = _props$iconObj === undefined ? {} : _props$iconObj,
          value = _props.value,
          dropdownData = _props.dropdownData,
          _props$data = _props.data,
          data = _props$data === undefined ? [] : _props$data,
          _props$optionValue = _props.optionValue,
          optionValue = _props$optionValue === undefined ? "code" : _props$optionValue,
          _props$optionLabel = _props.optionLabel,
          optionLabel = _props$optionLabel === undefined ? "code" : _props$optionLabel,
          sourceJsonPath = _props.sourceJsonPath,
          state = _props.state,
          dispatch = _props.dispatch,
          rest = (0, _objectWithoutProperties3.default)(_props, ["label", "placeholder", "jsonPath", "iconObj", "value", "dropdownData", "data", "optionValue", "optionLabel", "sourceJsonPath", "state", "dispatch"]);


      if (!(0, _isEmpty2.default)(iconObj) && iconObj.onClickDefination) {
        iconObj = (0, _extends3.default)({}, iconObj, {
          onClick: function onClick() {
            return iconObj.onClickDefination.callBack(state, dispatch);
          }
        });
      }
      var transfomedKeys = (0, _commons.transformById)(localizationLabels, "code");
      var translatedLabel = getLocaleLabelsforTL(label.labelName, label.labelKey, transfomedKeys);
      var translatedPlaceholder = getLocaleLabelsforTL(placeholder.labelName, placeholder.labelKey, transfomedKeys);

      if (dropdownData.length > 0) {
        return _react2.default.createElement(
          _uiMolecules.TextfieldWithIcon,
          (0, _extends3.default)({
            label: translatedLabel,
            placeholder: translatedPlaceholder,
            iconObj: iconObj,
            value: value ? value : translatedPlaceholder
          }, rest),
          _react2.default.createElement(
            _MenuItem2.default,
            { value: translatedPlaceholder, disabled: true },
            translatedPlaceholder
          ),
          dropdownData.map(function (option, key) {
            return _react2.default.createElement(
              _MenuItem2.default,
              { key: key, value: option.value },
              getLocaleLabelsforTL(option.value, "TL_" + option.value, transfomedKeys)
            );
          })
        );
      } else {
        return _react2.default.createElement(_uiMolecules.TextfieldWithIcon, (0, _extends3.default)({
          label: translatedLabel,
          placeholder: translatedPlaceholder,
          iconObj: iconObj,
          value: value
        }, rest));
      }
    }
  }]);
  return TextFieldContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var jsonPath = ownprops.jsonPath,
      value = ownprops.value,
      select = ownprops.select,
      data = ownprops.data,
      optionValue = ownprops.optionValue,
      optionLabel = ownprops.optionLabel,
      sourceJsonPath = ownprops.sourceJsonPath;
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  var fieldValue = value === undefined ? (0, _get2.default)(preparedFinalObject, jsonPath) : value;
  var dropdownData = [];
  if (select) {
    var constructDropdown = function constructDropdown(dt) {
      return dt.map(function (d) {
        return {
          value: d[optionValue],
          label: d[optionLabel]
        };
      });
    };
    if (data && data.length > 0) {
      dropdownData = constructDropdown(data || []);
    } else if (sourceJsonPath) {
      dropdownData = constructDropdown((0, _get2.default)(preparedFinalObject, sourceJsonPath, []));
    }
  }
  return { value: fieldValue, dropdownData: dropdownData, state: state };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(TextFieldContainer);
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

var _utils = require("../../ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse(window.localStorage.getItem("localization_en_IN"));

var TextFieldContainer = function (_React$Component) {
  (0, _inherits3.default)(TextFieldContainer, _React$Component);

  function TextFieldContainer() {
    (0, _classCallCheck3.default)(this, TextFieldContainer);
    return (0, _possibleConstructorReturn3.default)(this, (TextFieldContainer.__proto__ || Object.getPrototypeOf(TextFieldContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(TextFieldContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          hasDependant = _props.hasDependant,
          onChange = _props.onChange,
          value = _props.value;

      if (hasDependant && value) {
        onChange({ target: { value: value } });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          _props2$label = _props2.label,
          label = _props2$label === undefined ? {} : _props2$label,
          _props2$placeholder = _props2.placeholder,
          placeholder = _props2$placeholder === undefined ? {} : _props2$placeholder,
          jsonPath = _props2.jsonPath,
          _props2$iconObj = _props2.iconObj,
          iconObj = _props2$iconObj === undefined ? {} : _props2$iconObj,
          value = _props2.value,
          dropdownData = _props2.dropdownData,
          _props2$data = _props2.data,
          data = _props2$data === undefined ? [] : _props2$data,
          _props2$optionValue = _props2.optionValue,
          optionValue = _props2$optionValue === undefined ? "code" : _props2$optionValue,
          _props2$optionLabel = _props2.optionLabel,
          optionLabel = _props2$optionLabel === undefined ? "code" : _props2$optionLabel,
          sourceJsonPath = _props2.sourceJsonPath,
          index = _props2.index,
          componentJsonpath = _props2.componentJsonpath,
          state = _props2.state,
          infoIcon = _props2.infoIcon,
          dispatch = _props2.dispatch,
          title = _props2.title,
          rest = (0, _objectWithoutProperties3.default)(_props2, ["label", "placeholder", "jsonPath", "iconObj", "value", "dropdownData", "data", "optionValue", "optionLabel", "sourceJsonPath", "index", "componentJsonpath", "state", "infoIcon", "dispatch", "title"]);


      if (!(0, _isEmpty2.default)(iconObj) && iconObj.onClickDefination) {
        iconObj = (0, _extends3.default)({}, iconObj, {
          onClick: function onClick() {
            return iconObj.onClickDefination.callBack(state, dispatch, {
              index: index,
              componentJsonpath: componentJsonpath
            });
          }
        });
      }
      var transfomedKeys = (0, _commons.transformById)(localizationLabels, "code");
      var translatedLabel = (0, _commons.getLocaleLabels)(label.labelName, label.labelKey, transfomedKeys);
      var translatedPlaceholder = (0, _commons.getLocaleLabels)(placeholder.labelName, placeholder.labelKey, transfomedKeys);

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
            _react2.default.createElement(
              "div",
              { className: "select-field-placeholder" },
              translatedPlaceholder
            )
          ),
          dropdownData.map(function (option, key) {
            return _react2.default.createElement(
              _MenuItem2.default,
              { key: key, value: option.value },
              (0, _commons.getLocaleLabels)(option.value, "TL_" + option.value, transfomedKeys)
            );
          })
        );
      } else {
        return this.props.select ? _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
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
              _react2.default.createElement(
                "div",
                { className: "select-field-placeholder" },
                translatedPlaceholder
              )
            )
          ),
          title && !(0, _isEmpty2.default)(title) && infoIcon && _react2.default.createElement(_uiMolecules.Tooltip, { val: title, icon: infoIcon })
        ) : _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_uiMolecules.TextfieldWithIcon, (0, _extends3.default)({
            label: translatedLabel,
            placeholder: translatedPlaceholder,
            iconObj: iconObj,
            value: this.props.type === "date" && !value ? translatedPlaceholder : value
          }, rest)),
          title && !(0, _isEmpty2.default)(title) && infoIcon && _react2.default.createElement(_uiMolecules.Tooltip, { val: title, icon: infoIcon })
        );
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
  // Convert epoch to YYYY-MM-DD and set date picker value
  if (ownprops.type && ownprops.type === "date") fieldValue = (0, _commons.epochToYmd)(fieldValue);
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
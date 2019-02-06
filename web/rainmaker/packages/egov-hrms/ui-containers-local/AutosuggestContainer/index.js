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

var _uiAtomsLocal = require("../../ui-atoms-local");

var _commons = require("../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse(window.localStorage.getItem("localization_en_IN"));
var transfomedKeys = (0, _commons2.transformById)(localizationLabels, "code");

var AutoSuggestor = function (_Component) {
  (0, _inherits3.default)(AutoSuggestor, _Component);

  function AutoSuggestor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoSuggestor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoSuggestor.__proto__ || Object.getPrototypeOf(AutoSuggestor)).call.apply(_ref, [this].concat(args))), _this), _this.onSelect = function (value) {
      var onChange = _this.props.onChange;
      //Storing multiSelect values not handled yet

      console.log("============", value);
      onChange({ target: { value: value } });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoSuggestor, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          value = _props.value,
          preparedFinalObject = _props.preparedFinalObject,
          label = _props.label,
          placeholder = _props.placeholder,
          suggestions = _props.suggestions,
          rest = (0, _objectWithoutProperties3.default)(_props, ["value", "preparedFinalObject", "label", "placeholder", "suggestions"]);

      var translatedLabel = (0, _commons2.getLocaleLabels)(label.labelName, label.labelKey, transfomedKeys);
      var translatedPlaceholder = (0, _commons2.getLocaleLabels)(placeholder.labelName, placeholder.labelKey, transfomedKeys);
      //For multiSelect to be enabled, pass "isMulti: true" in props.
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_uiAtomsLocal.AutoSuggest, (0, _extends3.default)({
          onSelect: this.onSelect,
          suggestions: suggestions,
          value: value,
          label: translatedLabel,
          placeholder: translatedPlaceholder
        }, rest))
      );
    }
  }]);
  return AutoSuggestor;
}(_react.Component);

var getLocalisedSuggestions = function getLocalisedSuggestions(suggestions) {
  return suggestions && suggestions.length > 0 && suggestions.map(function (option, key) {
    option.name = (0, _commons2.getLocaleLabels)(option.code, "TL_" + option.code, transfomedKeys);
    return option;
  });
};

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var jsonPath = ownprops.jsonPath,
      value = ownprops.value,
      sourceJsonPath = ownprops.sourceJsonPath,
      labelsFromLocalisation = ownprops.labelsFromLocalisation,
      data = ownprops.data,
      labelName = ownprops.labelName,
      valueName = ownprops.valueName;

  var suggestions = data && data.length > 0 ? data : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, sourceJsonPath, []);
  value = value ? value : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath);
  //To fetch corresponding labels from localisation for the suggestions, if needed.
  // console.log("========>", value, suggestions);
  value = value && value.map(function (item) {
    return {
      label: (0, _get2.default)(item, labelName) == null ? item.label : (0, _get2.default)(item, labelName),
      value: (0, _get2.default)(item, valueName) == null ? item.value : (0, _get2.default)(item, valueName)
    };
  });
  // value = { label: "Emmm", value: "EMP" };
  if (labelsFromLocalisation) {
    suggestions = getLocalisedSuggestions(JSON.parse(JSON.stringify(suggestions)));
  }
  //To find correct option object as per the value (for showing the selected value).
  var selectedItem = (0, _commons.findItemInArrayOfObject)(suggestions, function (item) {
    if (item.code === value) {
      return true;
    } else return false;
  });
  //Make value object as the Autosuggest expects.
  if (selectedItem && selectedItem.name) {
    value = { label: selectedItem.name, value: selectedItem.code };
  }
  return { value: value, jsonPath: jsonPath, suggestions: suggestions };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AutoSuggestor);
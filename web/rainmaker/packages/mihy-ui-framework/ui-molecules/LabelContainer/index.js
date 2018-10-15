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

var _uiAtoms = require("mihy-ui-framework/ui-atoms");

var _utils = require("mihy-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = (0, _utils.getTranslatedLabel)(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

var LabelContainer = function (_React$Component) {
  (0, _inherits3.default)(LabelContainer, _React$Component);

  function LabelContainer() {
    (0, _classCallCheck3.default)(this, LabelContainer);
    return (0, _possibleConstructorReturn3.default)(this, (LabelContainer.__proto__ || Object.getPrototypeOf(LabelContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(LabelContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          label = _props.label,
          labelKey = _props.labelKey,
          rest = (0, _objectWithoutProperties3.default)(_props, ["label", "labelKey"]);

      var localizationLabels = JSON.parse(window.localStorage.getItem("localization_en_IN"));
      var transfomedKeys = (0, _utils.transformById)(localizationLabels, "code");
      var translatedLabel = getLocaleLabelsforTL(label, labelKey, transfomedKeys);

      return _react2.default.createElement(_uiAtoms.Label, (0, _extends3.default)({ label: translatedLabel }, rest));
    }
  }]);
  return LabelContainer;
}(_react2.default.Component);

exports.default = LabelContainer;
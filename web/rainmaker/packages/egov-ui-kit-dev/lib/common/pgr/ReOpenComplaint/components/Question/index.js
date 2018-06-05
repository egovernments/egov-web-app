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

var _translationNode = require("utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  labelStyle: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#767676",
    letterSpacing: "0.3px",
    marginBottom: "26px"
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px"
  },
  selectedLabelStyle: {
    color: "#00bbd3"
  },
  radioButtonLabelStyle: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#767676",
    letterSpacing: "0.3px"
  }
};

var Question = function (_Component) {
  (0, _inherits3.default)(Question, _Component);

  function Question() {
    (0, _classCallCheck3.default)(this, Question);
    return (0, _possibleConstructorReturn3.default)(this, (Question.__proto__ || Object.getPrototypeOf(Question)).apply(this, arguments));
  }

  (0, _createClass3.default)(Question, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          options = _props.options,
          label = _props.label,
          handleChange = _props.handleChange,
          valueSelected = _props.valueSelected;


      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, { label: label, labelStyle: styles.labelStyle }),
        _react2.default.createElement(_components.RadioButton, {
          id: "reopencomplaint-radio-button",
          name: "reopencomplaint-radio-button",
          valueSelected: valueSelected,
          options: options,
          handleChange: handleChange,
          radioButtonItemStyle: styles.radioButtonItemStyle,
          labelStyle: styles.radioButtonLabelStyle,
          selectedLabelStyle: styles.selectedLabelStyle
        })
      );
    }
  }]);
  return Question;
}(_react.Component);

exports.default = Question;
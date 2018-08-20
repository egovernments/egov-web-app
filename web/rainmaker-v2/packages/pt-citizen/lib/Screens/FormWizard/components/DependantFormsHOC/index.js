"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("../GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DependantFormsHOC = function (_React$Component) {
  (0, _inherits3.default)(DependantFormsHOC, _React$Component);

  function DependantFormsHOC(props) {
    (0, _classCallCheck3.default)(this, DependantFormsHOC);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DependantFormsHOC.__proto__ || Object.getPrototypeOf(DependantFormsHOC)).call(this, props));

    _this.setFormContent = function (combination) {
      var _this$props = _this.props,
          formsToAdd = _this$props.formsToAdd,
          removeForm = _this$props.removeForm;

      formsToAdd && formsToAdd.removeForms.forEach(function (formKey) {
        removeForm(formKey);
      });
      _this.setState({
        dependentForms: _this.getAllForms(combination)
      });
    };

    _this.getAllForms = function (combination) {
      var _this$props2 = _this.props,
          formsToAdd = _this$props2.formsToAdd,
          moduleName = _this$props2.moduleName;

      return formsToAdd && formsToAdd.formKeys.map(function (formKey, index) {
        var DependantForm = (0, _form2.default)({ formKey: formKey, path: moduleName + "/" + combination })(_GenericForm2.default);
        return _react2.default.createElement(
          "div",
          { key: index },
          _react2.default.createElement(DependantForm, null)
        );
      });
    };

    _this.state = {
      dependentForms: []
    };
    return _this;
  }

  (0, _createClass3.default)(DependantFormsHOC, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.combination !== nextProps.combination) {
        this.setFormContent(nextProps.combination);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var combination = this.props.combination;

      this.setFormContent(combination);
    }
  }, {
    key: "render",
    value: function render() {
      var dependentForms = this.state.dependentForms;

      return _react2.default.createElement(
        "div",
        null,
        dependentForms && [].concat((0, _toConsumableArray3.default)(this.state.dependentForms))
      );
    }
  }]);
  return DependantFormsHOC;
}(_react2.default.Component);

exports.default = DependantFormsHOC;
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

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _Switch = require("../../ui-atoms-local/Switch");

var _Switch2 = _interopRequireDefault(_Switch);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _reactRedux = require("react-redux");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwitchWithLabel = function (_Component) {
  (0, _inherits3.default)(SwitchWithLabel, _Component);

  function SwitchWithLabel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SwitchWithLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SwitchWithLabel.__proto__ || Object.getPrototypeOf(SwitchWithLabel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      checked: false,
      value: false
    }, _this.onChange = function (event, checked) {
      var _this$props = _this.props,
          prepareFinalObject = _this$props.prepareFinalObject,
          jsonPath = _this$props.jsonPath;

      _this.setState({
        checked: checked,
        value: event.target.checked
      });
      prepareFinalObject(jsonPath, event.target.checked);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SwitchWithLabel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          FormControlProps = _props.FormControlProps,
          SwitchProps = _props.SwitchProps,
          switchValue = _props.switchValue;

      return _react2.default.createElement(
        _FormGroup2.default,
        null,
        items.map(function (item, index) {
          return _react2.default.createElement(_FormControlLabel2.default, (0, _extends3.default)({
            className: "form-control-switch",
            key: "form-" + index,
            control: _react2.default.createElement(_Switch2.default, (0, _extends3.default)({
              value: switchValue ? switchValue : _this2.state.value,
              checked: switchValue ? switchValue : _this2.state.checked,
              onChange: _this2.onChange
            }, SwitchProps)),
            label: item.label
          }, FormControlProps));
        })
      );
    }
  }]);
  return SwitchWithLabel;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var jsonPath = ownprops.jsonPath;

  var switchValue = (0, _get2.default)(preparedFinalObject, jsonPath);
  return { switchValue: switchValue };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SwitchWithLabel);
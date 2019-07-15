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

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _core = require("@material-ui/core");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogContainer = function (_React$Component) {
  (0, _inherits3.default)(DialogContainer, _React$Component);

  function DialogContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DialogContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
      var screenKey = _this.props.screenKey;

      _this.props.handleField(screenKey, "components.adhocDialog", "props.open", false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DialogContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          maxWidth = _props.maxWidth,
          children = _props.children;

      return _react2.default.createElement(
        _core.Dialog,
        { open: open, maxWidth: maxWidth, onClose: this.handleClose },
        _react2.default.createElement(_core.DialogContent, { children: children })
      );
    }
  }]);
  return DialogContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;
  var screenKey = ownProps.screenKey;
  var screenConfig = screenConfiguration.screenConfig;

  var open = (0, _get2.default)(screenConfig, screenKey + ".components.adhocDialog.props.open");

  return {
    open: open,
    screenKey: screenKey,
    screenConfig: screenConfig
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { handleField: function handleField(a, b, c, d) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(a, b, c, d));
    } };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogContainer);
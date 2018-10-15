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

var _LinearSpinner = require("../../ui-atoms/LinearSpinner");

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _Item = require("../../ui-atoms/Layout/Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentInterface = function (_React$Component) {
  (0, _inherits3.default)(ComponentInterface, _React$Component);

  function ComponentInterface(props) {
    (0, _classCallCheck3.default)(this, ComponentInterface);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentInterface.__proto__ || Object.getPrototypeOf(ComponentInterface)).call(this, props));

    _this.state = { module: null };
    return _this;
  }

  (0, _createClass3.default)(ComponentInterface, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          componentPath = _props.componentPath,
          uiFramework = _props.uiFramework;

      var LoadableComponent = void 0;
      switch (uiFramework) {
        case "carbon":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("carbon-components-react").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-atoms":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("../../ui-atoms").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-molecules":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("../../ui-molecules").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "material-ui":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("@material-ui/core").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        default:
          LoadableComponent = null;
      }

      this.setState({ module: LoadableComponent });
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.state.module; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

      var _props2 = this.props,
          id = _props2.id,
          uiFramework = _props2.uiFramework,
          props = _props2.props,
          children = _props2.children,
          gridDefination = _props2.gridDefination;

      if (gridDefination) {
        return Component && _react2.default.createElement(
          _Item2.default,
          gridDefination,
          _react2.default.createElement(
            Component,
            (0, _extends3.default)({ id: uiFramework + "-" + id }, props),
            children && children
          )
        );
      } else {
        return Component && _react2.default.createElement(
          Component,
          (0, _extends3.default)({ id: uiFramework + "-" + id }, props),
          children && children
        );
      }
    }
  }]);
  return ComponentInterface;
}(_react2.default.Component);

exports.default = ComponentInterface;
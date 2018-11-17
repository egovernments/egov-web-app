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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

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

      var LoadableComponent = null;
      switch (uiFramework) {
        // case "carbon":
        //   LoadableComponent = Loadable({
        //     loader: () =>
        //       import("carbon-components-react").then(
        //         module => module[componentPath]
        //       ),
        //     loading: () => <LinearProgress />
        //   });
        //   break;
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
        case "custom-atoms-local":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("ui-atoms-local").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-molecules-local":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("ui-molecules-local").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-containers":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("../../ui-containers").then(function (module) {
                return module[componentPath];
              });
            },
            loading: function loading() {
              return _react2.default.createElement(_LinearSpinner2.default, null);
            }
          });
          break;
        case "custom-containers-local":
          LoadableComponent = (0, _reactLoadable2.default)({
            loader: function loader() {
              return import("ui-containers-local").then(function (module) {
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
          gridDefination = _props2.gridDefination,
          _props2$visible = _props2.visible,
          visible = _props2$visible === undefined ? true : _props2$visible,
          _props2$roleDefinatio = _props2.roleDefination,
          roleDefination = _props2$roleDefinatio === undefined ? {} : _props2$roleDefinatio;


      if (visible && !(0, _isEmpty2.default)(roleDefination)) {
        var splitList = (0, _get2.default)(roleDefination, "rolePath").split(".");
        var localdata = JSON.parse(localStorage.getItem(splitList[0]));
        var localRoles = (0, _get2.default)(localdata, splitList.slice(1).join("."), localdata);

        var roleCodes = localRoles.map(function (elem) {
          return (0, _get2.default)(elem, "code");
        });
        var roles = (0, _get2.default)(roleDefination, "roles");
        var found = roles.some(function (elem) {
          return roleCodes.includes(elem);
        });
        visible = found;
      }

      if (gridDefination) {
        return Component && visible && _react2.default.createElement(
          _Item2.default,
          gridDefination,
          _react2.default.createElement(
            Component,
            (0, _extends3.default)({ id: uiFramework + "-" + id }, props),
            children && children
          )
        );
      } else {
        return Component && visible && _react2.default.createElement(
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
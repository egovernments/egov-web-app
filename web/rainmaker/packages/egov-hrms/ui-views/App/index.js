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

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _uiRoutes = require("ui-routes");

var _uiRoutes2 = _interopRequireDefault(_uiRoutes);

var _Div = require("egov-ui-framework/ui-atoms/HtmlElements/Div");

var _Div2 = _interopRequireDefault(_Div);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App() {
    (0, _classCallCheck3.default)(this, App);
    return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  (0, _createClass3.default)(App, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextRoute = nextProps.route;
      var _props = this.props,
          currentRoute = _props.route,
          history = _props.history,
          setRoute = _props.setRoute;

      if (nextRoute && currentRoute !== nextRoute) {
        history.push(nextRoute);
        setRoute("");
        window.parent.postMessage("/hrms" + nextRoute, "*");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var authenticated = this.props.authenticated;

      var childProps = {
        isAuthenticated: authenticated
      };
      return _react2.default.createElement(
        _Div2.default,
        { className: "App" },
        _react2.default.createElement(_uiRoutes2.default, { childProps: childProps })
      );
    }
  }]);
  return App;
}(_react2.default.Component);
//import LoadingIndicator from "egov-ui-framework/ui-molecules/LoadingIndicator";


var mapStateToProps = function mapStateToProps(_ref) {
  var app = _ref.app,
      auth = _ref.auth;
  var route = app.route,
      spinner = app.spinner;
  var authenticated = auth.authenticated;

  return {
    route: route,
    spinner: spinner,
    authenticated: authenticated
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    }
  };
};

exports.default = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(App);
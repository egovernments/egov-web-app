"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _LoadingIndicator = require("../../ui-molecules/LoadingIndicator");

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _Div = require("../../ui-atoms/HtmlElements/Div");

var _Div2 = _interopRequireDefault(_Div);

var _actions = require("ui-redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { logout } from "ui-redux/auth/actions";
var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // const {authenticatedFn}=this.props;
              try {
                // if (await Auth.currentSession()) {
                //   authenticatedFn();
                // }
              } catch (e) {
                if (e !== "No current user") {
                  console.log(e);
                }
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          spinner = _props2.spinner,
          authenticated = _props2.authenticated;

      var childProps = {
        isAuthenticated: authenticated
      };
      return _react2.default.createElement(
        _Div2.default,
        { className: "App" },
        _react2.default.createElement(_uiRoutes2.default, { childProps: childProps }),
        spinner && _react2.default.createElement(_LoadingIndicator2.default, null)
      );
    }
  }]);
  return App;
}(_react2.default.Component);
// import {authenticated} from "ui-redux/auth/actions";

// import { Auth } from "aws-amplify";


var mapStateToProps = function mapStateToProps(_ref3) {
  var app = _ref3.app,
      auth = _ref3.auth;
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
    // authenticatedFn:()=>dispatch(authenticated()),
    // logout:()=>dispatch(logout())
  };
};

exports.default = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(App);
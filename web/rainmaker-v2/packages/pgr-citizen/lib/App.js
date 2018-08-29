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

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _components = require("components");

var _commons = require("egov-ui-kit/utils/commons");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _Router = require("./Router");

var _Router2 = _interopRequireDefault(_Router);

var _common = require("config/common");

var _common2 = _interopRequireDefault(_common);

var _Routes = require("./Routes");

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    var currentPath = props.location.pathname;


    props.history.listen(function (location, action) {
      var nextPath = location.pathname;

      (0, _commons.addBodyClass)(nextPath);
      props.toggleSnackbarAndSetText(false, "");
    });

    (0, _commons.addBodyClass)(currentPath);
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          fetchLocalizationLabel = _props.fetchLocalizationLabel,
          fetchCurrentLocation = _props.fetchCurrentLocation,
          fetchMDMSData = _props.fetchMDMSData;

      var requestBody = {
        MdmsCriteria: {
          tenantId: _common2.default.tenantId,
          moduleDetails: [{
            moduleName: "common-masters",
            masterDetails: [{
              name: "Department"
            }, {
              name: "Designation"
            }]
          }, {
            moduleName: "tenant",
            masterDetails: [{
              name: "tenants"
            }]
          }]
        }
      };
      // can be combined into one mdms call
      fetchLocalizationLabel(localStorage.getItem("locale") || "en_IN");
      // current location
      fetchCurrentLocation();
      fetchMDMSData(requestBody);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextRoute = nextProps.route;
      var _props2 = this.props,
          currentRoute = _props2.route,
          history = _props2.history,
          setRoute = _props2.setRoute;

      if (nextRoute && currentRoute !== nextRoute) {
        history.push(nextRoute);
        setRoute("");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var toast = this.props.toast;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_Router2.default, { routes: _Routes2.default }),
        toast && toast.open && toast.message.length && _react2.default.createElement(_components.Toast, {
          open: toast.open,
          message: toast.message,
          error: toast.error
        })
      );
    }
  }]);
  return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$app = state.app,
      route = _state$app.route,
      toast = _state$app.toast;

  var props = {};
  if (route && route.length) {
    props.route = route;
  }
  if (toast && toast.open && toast.message && toast.message.length) {
    props.toast = toast;
  }
  return props;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchLocalizationLabel: function fetchLocalizationLabel(locale) {
      return dispatch((0, _actions.fetchLocalizationLabel)(locale));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
    },
    fetchMDMSData: function fetchMDMSData(criteria) {
      return dispatch((0, _actions2.fetchMDMSData)(criteria));
    },
    fetchCurrentLocation: function fetchCurrentLocation() {
      return dispatch((0, _actions.fetchCurrentLocation)());
    },
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    }
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App));
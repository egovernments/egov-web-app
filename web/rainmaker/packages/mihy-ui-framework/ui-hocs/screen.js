"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _actions = require("../ui-redux/screen-configuration/actions");

var _actions2 = require("../ui-redux/app/actions");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { addComponentJsonpath } from "../ui-utils";
var screenHoc = function screenHoc(_ref) {
  var _ref$path = _ref.path,
      path = _ref$path === undefined ? "" : _ref$path,
      screenKey = _ref.screenKey,
      _ref$hasOwnConfig = _ref.hasOwnConfig,
      hasOwnConfig = _ref$hasOwnConfig === undefined ? false : _ref$hasOwnConfig,
      defaultScreenConfig = _ref.screenConfig,
      _ref$hasRemoteConfig = _ref.hasRemoteConfig,
      hasRemoteConfig = _ref$hasRemoteConfig === undefined ? false : _ref$hasRemoteConfig,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["path", "screenKey", "hasOwnConfig", "screenConfig", "hasRemoteConfig"]);
  return function (Screen) {
    var ScreenWrapper = function (_React$Component) {
      (0, _inherits3.default)(ScreenWrapper, _React$Component);

      function ScreenWrapper(props) {
        (0, _classCallCheck3.default)(this, ScreenWrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ScreenWrapper.__proto__ || Object.getPrototypeOf(ScreenWrapper)).call(this, props));

        _this.handleScreenConfigurationFieldChange = function (screenKey, componentJsonpath, property, value) {
          var handleScreenConfigurationFieldChange = _this.props.handleScreenConfigurationFieldChange;

          handleScreenConfigurationFieldChange(screenKey, componentJsonpath, property, value);
        };

        _this.onClick = function (onClickDefination) {
          var componentJsonpath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
          var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

          switch (onClickDefination.action) {
            case "submit":
              var _submitForm = _this.props.submitForm;
              var method = onClickDefination.method,
                  endPoint = onClickDefination.endPoint,
                  purpose = onClickDefination.purpose,
                  redirectionUrl = onClickDefination.redirectionUrl,
                  bodyObjectsJsonPaths = onClickDefination.bodyObjectsJsonPaths,
                  queryObjectJsonPath = onClickDefination.queryObjectJsonPath;

              _submitForm(screenKey, method, endPoint, purpose, redirectionUrl, bodyObjectsJsonPaths || {}, queryObjectJsonPath || []);
              break;
            case "condition":
              var _this$props = _this.props,
                  state = _this$props.state,
                  dispatchAction = _this$props.dispatchAction;
              var callBack = onClickDefination.callBack;

              if (typeof callBack === "function") {
                callBack(state, dispatchAction, { componentJsonpath: componentJsonpath, index: index });
              }
              break;
            case "page_change":
              var _setRoute = _this.props.setRoute;
              var _path = onClickDefination.path;

              _setRoute(_path);
              break;
            default:
          }
        };

        var initScreen = props.initScreen;

        _this.screenConfig = {};
        try {
          var getConfig = function getConfig(path, screenKey) {
            return require("ui-config/screens/specs/" + path + "/" + screenKey).default;
          };
          if (hasOwnConfig) {
            _this.screenConfig = defaultScreenConfig || {};
          } else if (hasRemoteConfig) {
            // const url=`http://rawgit.com/muralim4242/mihy-repo/master/packages/ui-client-app/src/ui-config/screens/specs/${path}/${screenKey}.js`;
            // $.getScript(url, function( data, textStatus, jqxhr ) {
            //     console.log( data ); // Data returned
            //     console.log( textStatus ); // Success
            //     console.log( jqxhr.status ); // 200
            //     console.log( "Load was performed." );
            // });
            _this.screenConfig = getConfig(path, screenKey);
          } else {
            _this.screenConfig = getConfig(path, screenKey);
          }
          // if (!isEmpty(this.screenConfig)) {
          //   addComponentJsonpath(this.screenConfig.components);
          // }
          initScreen(screenKey, (0, _cloneDeep2.default)(_this.screenConfig));
        } catch (error) {
          // the error is assumed to have occured due to absence of config; so ignore it!
          console.log(error);
        }
        return _this;
      }

      (0, _createClass3.default)(ScreenWrapper, [{
        key: "render",
        value: function render() {
          var _props = this.props,
              screenConfig = _props.screenConfig,
              toast = _props.toast,
              spinner = _props.spinner;
          var currentScreenConfig = screenConfig[screenKey],
              preparedFinalObject = screenConfig.preparedFinalObject;

          if (currentScreenConfig) {
            var _React$createElement;

            var _handleScreenConfigurationFieldChange = this.handleScreenConfigurationFieldChange,
                onClick = this.onClick;
            var uiFramework = currentScreenConfig.uiFramework,
                components = currentScreenConfig.components,
                name = currentScreenConfig.name;

            return _react2.default.createElement(Screen, (_React$createElement = {
              uiFramework: uiFramework,
              screenKey: screenKey,
              components: components
            }, (0, _defineProperty3.default)(_React$createElement, "screenKey", name), (0, _defineProperty3.default)(_React$createElement, "onFieldChange", _handleScreenConfigurationFieldChange), (0, _defineProperty3.default)(_React$createElement, "onComponentClick", onClick), (0, _defineProperty3.default)(_React$createElement, "preparedFinalObject", preparedFinalObject), (0, _defineProperty3.default)(_React$createElement, "toast", toast), (0, _defineProperty3.default)(_React$createElement, "spinner", spinner), _React$createElement));
          } else {
            return null;
          }
        }
      }]);
      return ScreenWrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var screenConfiguration = state.screenConfiguration,
          app = state.app;
      var toast = app.toast,
          spinner = app.spinner;
      var screenConfig = screenConfiguration.screenConfig,
          preparedFinalObject = screenConfiguration.preparedFinalObject;

      return { screenConfig: screenConfig, preparedFinalObject: preparedFinalObject, state: state, toast: toast, spinner: spinner };
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return {
        handleScreenConfigurationFieldChange: function handleScreenConfigurationFieldChange(screenKey, componentJsonpath, property, value) {
          return dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentJsonpath, property, value));
        },
        submitForm: function submitForm(screenKey, method, endpoint, action) {
          var bodyObjectsJsonPaths = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
          var queryObjectJsonPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
          return dispatch((0, _actions.submitForm)(screenKey, method, endpoint, action, bodyObjectsJsonPaths, queryObjectJsonPath));
        },
        initScreen: function initScreen(screenKey, screenConfig) {
          return dispatch((0, _actions.initScreen)(screenKey, screenConfig));
        },
        dispatchAction: dispatch,
        setRoute: function setRoute(path) {
          return dispatch((0, _actions2.setRoute)(path));
        }
      };
    };

    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ScreenWrapper);
  };
};

exports.default = screenHoc;
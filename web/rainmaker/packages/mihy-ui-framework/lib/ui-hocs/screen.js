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

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _actions = require("../ui-redux/screen-configuration/actions");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _uiUtils = require("../ui-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import $ from "jquery";

var screenHoc = function screenHoc(_ref) {
  var _ref$path = _ref.path,
      path = _ref$path === undefined ? "" : _ref$path,
      screenKey = _ref.screenKey,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["path", "screenKey"]),
      _ref$hasOwnConfig = _ref.hasOwnConfig,
      hasOwnConfig = _ref$hasOwnConfig === undefined ? false : _ref$hasOwnConfig,
      defaultScreenConfig = _ref.screenConfig,
      _ref$hasRemoteConfig = _ref.hasRemoteConfig,
      hasRemoteConfig = _ref$hasRemoteConfig === undefined ? false : _ref$hasRemoteConfig;
  return function (Screen) {
    var ScreenWrapper = function (_React$Component) {
      (0, _inherits3.default)(ScreenWrapper, _React$Component);

      function ScreenWrapper(props) {
        (0, _classCallCheck3.default)(this, ScreenWrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ScreenWrapper.__proto__ || Object.getPrototypeOf(ScreenWrapper)).call(this, props));

        _this.handleScreenConfigurationFieldChange = function () {
          var sreenKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
          var componentJsonpath = arguments[1];
          var jsonPath = arguments[2];
          var value = arguments[3];
          var handleScreenConfigurationFieldChange = _this.props.handleScreenConfigurationFieldChange;

          handleScreenConfigurationFieldChange(screenKey, componentJsonpath, "value", value);
        };

        _this.onClick = function (onClickDefination) {
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
          if (!(0, _isEmpty2.default)(_this.screenConfig)) {
            (0, _uiUtils.addComponentJsonpath)(_this.screenConfig.components);
          }
          initScreen(screenKey, JSON.parse(JSON.stringify(_this.screenConfig)));
        } catch (error) {
          // the error is assumed to have occured due to absence of config; so ignore it!
          console.log(error);
        }
        return _this;
      }

      (0, _createClass3.default)(ScreenWrapper, [{
        key: "render",
        value: function render() {
          var screenConfig = this.props.screenConfig;
          var currentScreenConfig = screenConfig[screenKey],
              preparedFinalObject = screenConfig.preparedFinalObject;
          // console.log(this);
          // console.log(currentScreenConfig);

          if (currentScreenConfig) {
            var _handleScreenConfigurationFieldChange = this.handleScreenConfigurationFieldChange,
                onClick = this.onClick;
            var uiFramework = currentScreenConfig.uiFramework,
                components = currentScreenConfig.components,
                name = currentScreenConfig.name;

            return _react2.default.createElement(Screen, {
              uiFramework: uiFramework,
              components: components,
              screenKey: name,
              onFieldChange: _handleScreenConfigurationFieldChange,
              onComponentClick: onClick,
              preparedFinalObject: preparedFinalObject
            });
          } else {
            return null;
          }
        }
      }]);
      return ScreenWrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(_ref2) {
      var screenConfiguration = _ref2.screenConfiguration;
      var screenConfig = screenConfiguration.screenConfig,
          preparedFinalObject = screenConfiguration.preparedFinalObject;

      return { screenConfig: screenConfig, preparedFinalObject: preparedFinalObject };
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return {
        handleScreenConfigurationFieldChange: function handleScreenConfigurationFieldChange(screenKey, componentJsonpath, jsonPath, value) {
          return dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, componentJsonpath, jsonPath, value));
        },
        submitForm: function submitForm(screenKey, method, endpoint, action) {
          var bodyObjectsJsonPaths = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
          var queryObjectJsonPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
          return dispatch((0, _actions.submitForm)(screenKey, method, endpoint, action, bodyObjectsJsonPaths, queryObjectJsonPath));
        },
        initScreen: function initScreen(screenKey, screenConfig) {
          return dispatch((0, _actions.initScreen)(screenKey, screenConfig));
        }
        // deleteForm: () => dispatch(deleteForm(formKey)),
      };
    };

    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ScreenWrapper);
  };
};

exports.default = screenHoc;
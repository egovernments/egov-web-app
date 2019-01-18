'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

var _themes = require('ui-config/themes');

var _themes2 = _interopRequireDefault(_themes);

var _reactRedux = require('react-redux');

var _store = require('ui-redux/store');

var _store2 = _interopRequireDefault(_store);

require('./index.css');

var _App = require('ui-views/App');

var _App2 = _interopRequireDefault(_App);

var _awsAmplify = require('aws-amplify');

var _awsAmplify2 = _interopRequireDefault(_awsAmplify);

var _awsConfig = require('./awsConfig');

var _awsConfig2 = _interopRequireDefault(_awsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import registerServiceWorker from './registerServiceWorker';
var theme = (0, _styles.createMuiTheme)(_themes2.default);

_awsAmplify2.default.configure({
  Auth: {
    mandatorySignIn: true,
    region: _awsConfig2.default.cognito.REGION,
    userPoolId: _awsConfig2.default.cognito.USER_POOL_ID,
    identityPoolId: _awsConfig2.default.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: _awsConfig2.default.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: _awsConfig2.default.s3.REGION,
    bucket: _awsConfig2.default.s3.BUCKET,
    identityPoolId: _awsConfig2.default.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [{
      name: "notes",
      endpoint: _awsConfig2.default.apiGateway.URL,
      region: _awsConfig2.default.apiGateway.REGION
    }]
  }
});

_reactDom2.default.render(_react2.default.createElement(
  _styles.MuiThemeProvider,
  { theme: theme },
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(_App2.default, null)
    )
  )
), document.getElementById('root'));
// registerServiceWorker();
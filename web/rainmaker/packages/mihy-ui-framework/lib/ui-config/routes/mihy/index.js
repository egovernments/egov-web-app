'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LinearSpinner = require('../../../ui-atoms/LinearSpinner');

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

var _routeNames = require('./route-names');

var mainRouteConstants = _interopRequireWildcard(_routeNames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement(_LinearSpinner2.default, null);
};

var ScreenInterface = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import('ui-views/ScreenInterface');
  },
  loading: Loading
});

var mainRoutes = [{
  path: mainRouteConstants.SCREEN_INTERFACE,
  component: ScreenInterface
}];

exports.default = mainRoutes;
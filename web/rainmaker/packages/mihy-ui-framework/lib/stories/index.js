'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonLinks = require('@storybook/addon-links');

var _demo = require('@storybook/react/demo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Welcome', module).add('to Storybook', function () {
  return _react2.default.createElement(_demo.Welcome, { showApp: (0, _addonLinks.linkTo)('Button') });
});

(0, _react3.storiesOf)('Button', module).add('with text', function () {
  return _react2.default.createElement(
    _demo.Button,
    { onClick: (0, _addonActions.action)('clicked') },
    'Hello Button'
  );
}).add('with some emoji', function () {
  return _react2.default.createElement(
    _demo.Button,
    { onClick: (0, _addonActions.action)('clicked') },
    _react2.default.createElement(
      'span',
      { role: 'img', 'aria-label': 'so cool' },
      '\uD83D\uDE00 \uD83D\uDE0E \uD83D\uDC4D \uD83D\uDCAF'
    )
  );
});
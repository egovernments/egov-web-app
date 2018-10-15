"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("../../ui-atoms");

var _AppCard = require("../AppCard");

var _AppCard2 = _interopRequireDefault(_AppCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppCards = function AppCards(_ref) {
  var appCards = _ref.appCards;

  return _react2.default.createElement(
    _uiAtoms.Div,
    null,
    _react2.default.createElement(
      _uiAtoms.Container,
      null,
      appCards.map(function (item, key) {
        return _react2.default.createElement(
          _uiAtoms.Item,
          (0, _extends3.default)({}, item.itemProps, { key: key }),
          _react2.default.createElement(_AppCard2.default, { item: item })
        );
      })
    )
  );
};

exports.default = AppCards;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("../../ui-atoms");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppCarosel = function AppCarosel(_ref) {
  var item = _ref.item;

  return _react2.default.createElement(
    _uiAtoms.Container,
    null,
    _react2.default.createElement(_uiAtoms.Item, { xs: 2 }),
    _react2.default.createElement(
      _uiAtoms.Item,
      { xs: 8 },
      _react2.default.createElement(
        _uiAtoms.Card,
        {
          style: {
            height: "190px"
          }
        },
        _react2.default.createElement(
          _uiAtoms.CardContent,
          null,
          _react2.default.createElement(_uiAtoms.Div, { className: "mihy-app-carosel" })
        )
      )
    ),
    _react2.default.createElement(_uiAtoms.Item, { xs: 2 })
  );
};

exports.default = AppCarosel;
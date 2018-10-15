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
    _react2.default.createElement(_uiAtoms.Item, { xs: 1, sm: 3 }),
    _react2.default.createElement(
      _uiAtoms.Item,
      { xs: 10, sm: 6 },
      _react2.default.createElement(
        _uiAtoms.Button,
        {
          fullWidth: true,
          variant: "extendedFab",
          className: "mihy-app-carosel-card"
        },
        _react2.default.createElement(
          _uiAtoms.Container,
          null,
          _react2.default.createElement(
            _uiAtoms.Item,
            { xs: 6 },
            _react2.default.createElement(_uiAtoms.Div, { className: "mihy-app-carosel", style: item.itemImage ? {
                backgroundImage: "url(" + item.itemImage + ")",
                backgroundSize: "cover"
              } : {} })
          ),
          _react2.default.createElement(
            _uiAtoms.Item,
            { xs: 6 },
            _react2.default.createElement(
              _uiAtoms.Div,
              null,
              _react2.default.createElement(
                _uiAtoms.Typegraphy,
                { variant: "body2", className: "mihy-black-color", align: "left" },
                item.displayLabel
              ),
              _react2.default.createElement(
                _uiAtoms.Typegraphy,
                { variant: "caption", className: "mihy-black-color", align: "left", style: { marginTop: "16px" } },
                item.displaySubLabel
              )
            )
          )
        )
      )
    ),
    _react2.default.createElement(_uiAtoms.Item, { xs: 1, sm: 3 })
  );
};

exports.default = AppCarosel;
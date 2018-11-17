"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("../../ui-atoms");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppCard = function AppCard(_ref) {
  var item = _ref.item;

  return _react2.default.createElement(
    _uiAtoms.Button,
    (0, _extends3.default)({
      fullWidth: true,
      variant: "extendedFab",
      "aria-label": item.displayLabel
    }, item.buttonProps, {
      className: "mihy-app-card"
    }),
    _react2.default.createElement(
      _uiAtoms.Container,
      null,
      _react2.default.createElement(
        _uiAtoms.Item,
        { xs: 3, sm: 4 },
        _react2.default.createElement(_uiAtoms.Div, { className: "mihy-left-icon-style", style: {
            backgroundImage: "url(" + item.iconImgae + ")",
            backgroundSize: "cover"
          } })
      ),
      _react2.default.createElement(
        _uiAtoms.Item,
        { xs: 9, sm: 8 },
        _react2.default.createElement(
          _uiAtoms.Div,
          { className: "mihy-app-right-section" },
          _react2.default.createElement(
            _uiAtoms.Typegraphy,
            { variant: "body2", className: "mihy-black-color", align: "left" },
            item.displayLabel
          ),
          _react2.default.createElement(
            _uiAtoms.Typegraphy,
            { variant: "caption", className: "mihy-black-color", align: "left" },
            item.displaySubLabel
          )
        )
      )
    )
  );
};

exports.default = AppCard;
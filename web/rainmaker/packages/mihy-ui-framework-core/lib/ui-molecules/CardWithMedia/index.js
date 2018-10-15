"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("@material-ui/core/styles");

var _uiAtoms = require("../../ui-atoms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PropTypes from "prop-types";
var styles = function styles(theme) {
  return {
    cover: {
      height: "100%"
    }
  };
};

function CardWithMadia(props) {
  var classes = props.classes,
      cardContent = props.cardContent,
      cardMedia = props.cardMedia,
      heading = props.heading;
  var src = cardMedia.src,
      title = cardMedia.title;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _uiAtoms.Card,
      null,
      _react2.default.createElement(
        _uiAtoms.Container,
        null,
        _react2.default.createElement(
          _uiAtoms.Item,
          { xs: 12, sm: 4 },
          _react2.default.createElement(_uiAtoms.CardMedia, { className: classes.cover, image: src, title: title })
        ),
        _react2.default.createElement(
          _uiAtoms.Item,
          { xs: 12, sm: 8 },
          _react2.default.createElement(
            _uiAtoms.CardContent,
            null,
            _react2.default.createElement(
              _uiAtoms.Typegraphy,
              { variant: "display1", gutterBottom: true },
              heading
            ),
            _react2.default.createElement(
              "ul",
              null,
              cardContent.map(function (item, key) {
                return _react2.default.createElement(
                  "li",
                  { key: key },
                  _react2.default.createElement(
                    _uiAtoms.Typegraphy,
                    { variant: "headline", gutterBottom: true },
                    item
                  )
                );
              })
            )
          )
        )
      )
    )
  );
}

// CardWithMadia.propTypes = {};

exports.default = (0, _styles.withStyles)(styles, { withTheme: true })(CardWithMadia);
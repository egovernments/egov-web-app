"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginBottom: "16px"
    },
    documentIcon: {
      backgroundColor: "#FFFFFF",
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "0.83px",
      lineHeight: "24px"
    },
    documentSuccess: {
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39CB74",
      color: "white"
    }
  };
};

var DocumentList = function DocumentList(props) {
  var classes = props.classes,
      documents = props.documents;


  return _react2.default.createElement(
    "div",
    null,
    documents.map(function (document, key) {
      return _react2.default.createElement(
        "div",
        { className: classes.documentContainer },
        _react2.default.createElement(
          _Grid2.default,
          { container: true },
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 2, sm: 1, align: "center" },
            document.uploaded ? _react2.default.createElement(
              "div",
              { className: classes.documentSuccess },
              _react2.default.createElement(
                _Icon2.default,
                null,
                "done"
              )
            ) : _react2.default.createElement(
              "div",
              { className: classes.documentIcon },
              _react2.default.createElement(
                "span",
                null,
                key + 1
              )
            )
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 6, sm: 6, align: "left" },
            _react2.default.createElement(
              _Typography2.default,
              { variant: "body2" },
              document.name,
              document.required && _react2.default.createElement(
                "sup",
                { style: { color: "#E54D42" } },
                "*"
              )
            ),
            _react2.default.createElement(
              _Typography2.default,
              { variant: "caption" },
              "Only .jpg and .pdf files. 500kb max file size."
            )
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 12, sm: 5, align: "right" },
            document.uploaded ? _react2.default.createElement(
              _Button2.default,
              {
                variant: "outlined",
                style: {
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(5, 5, 5, 0.11999999731779099)"
                }
              },
              document.fileName,
              _react2.default.createElement(
                _Icon2.default,
                { style: { color: "#E54D42", marginLeft: "16px" } },
                "highlight_off"
              )
            ) : _react2.default.createElement(
              _Button2.default,
              { variant: "outlined", color: "primary" },
              "ADD FILE"
            )
          )
        )
      );
    })
  );
};

DocumentList.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  documents: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(DocumentList);
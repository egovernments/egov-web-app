"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _uiContainers = require("../../ui-containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  whiteCard: {
    maxWidth: 250,
    backgroundColor: "#FFFFFF",
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 11,
    paddingBottom: 0,
    marginRight: 16,
    marginTop: 16
  },
  subtext: {
    paddingTop: 7
  }
};

var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px"
};

function MultiCardDownloadGrid(props) {
  var classes = props.classes,
      data = props.data,
      rest = (0, _objectWithoutProperties3.default)(props, ["classes", "data"]);

  return _react2.default.createElement(
    _Grid2.default,
    (0, _extends3.default)({ container: true }, rest),
    data.map(function (item, key) {
      return _react2.default.createElement(
        _Grid2.default,
        { item: true, container: true, xs: 6, sm: 4, className: classes.whiteCard },
        _react2.default.createElement(
          _Grid2.default,
          { xs: 12 },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: item.title,
            labelKey: item.title,
            style: documentTitle
          })
        ),
        _react2.default.createElement(
          _Grid2.default,
          { container: true },
          _react2.default.createElement(
            _Grid2.default,
            { xs: 6, className: classes.subtext },
            _react2.default.createElement(
              _Typography2.default,
              null,
              item.name
            )
          ),
          _react2.default.createElement(
            _Grid2.default,
            { xs: 6, align: "right" },
            _react2.default.createElement(
              _Button2.default,
              { href: item.link, color: "primary" },
              item.linkText
            )
          )
        )
      );
    })
  );
}

MultiCardDownloadGrid.propTypes = {
  title: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  link: _propTypes2.default.array.isRequired,
  linktext: _propTypes2.default.array.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(MultiCardDownloadGrid);
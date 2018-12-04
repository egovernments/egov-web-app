"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _styles = require("@material-ui/core/styles");

var _Share = require("@material-ui/icons/Share");

var _Share2 = _interopRequireDefault(_Share);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex"
    },
    paper: {
      marginRight: theme.spacing.unit * 2
    },
    fab: {
      position: "fixed",
      top: theme.spacing.unit * 9,
      right: theme.spacing.unit * 2,
      zIndex: 999
    },
    menuItem: {
      zIndex: 99999
    }
  };
};

var CommonShare = function (_React$Component) {
  (0, _inherits3.default)(CommonShare, _React$Component);

  function CommonShare() {
    (0, _classCallCheck3.default)(this, CommonShare);
    return (0, _possibleConstructorReturn3.default)(this, (CommonShare.__proto__ || Object.getPrototypeOf(CommonShare)).apply(this, arguments));
  }

  (0, _createClass3.default)(CommonShare, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          shareCallback = _props.shareCallback,
          classes = _props.classes,
          _props$visible = _props.visible,
          visible = _props$visible === undefined ? true : _props$visible,
          _props$roleDefination = _props.roleDefination,
          roleDefination = _props$roleDefination === undefined ? {} : _props$roleDefination;

      if (visible && !(0, _isEmpty2.default)(roleDefination)) {
        var splitList = (0, _get2.default)(roleDefination, "rolePath").split(".");
        var localdata = JSON.parse(localStorage.getItem(splitList[0]));
        var localRoles = (0, _get2.default)(localdata, splitList.slice(1).join("."), localdata);

        var roleCodes = localRoles.map(function (elem) {
          return (0, _get2.default)(elem, "code");
        });
        var roles = (0, _get2.default)(roleDefination, "roles");
        var found = roles.some(function (elem) {
          return roleCodes.includes(elem);
        });
        visible = found;
      }

      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          "div",
          { className: classes.menuItem },
          visible && _react2.default.createElement(
            _Button2.default,
            {
              variant: "fab",
              className: classes.fab + " share-btn-main",
              visible: "false",
              onClick: function onClick() {
                shareCallback();
              }
            },
            _react2.default.createElement(_Share2.default, null)
          )
        )
      );
    }
  }]);
  return CommonShare;
}(_react2.default.Component);

CommonShare.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(CommonShare);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _ClickAwayListener = require("@material-ui/core/ClickAwayListener");

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _Grow = require("@material-ui/core/Grow");

var _Grow2 = _interopRequireDefault(_Grow);

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Popper = require("@material-ui/core/Popper");

var _Popper2 = _interopRequireDefault(_Popper);

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuList = require("@material-ui/core/MenuList");

var _MenuList2 = _interopRequireDefault(_MenuList);

var _styles = require("@material-ui/core/styles");

var _Icon = require("egov-ui-framework/ui-atoms/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex"
    },
    paper: {
      marginRight: theme.spacing.unit * 2
    },
    button: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    }
  };
};
//import Icon from "@material-ui/core/Icon";

var MenuListComposition = function (_React$Component) {
  (0, _inherits3.default)(MenuListComposition, _React$Component);

  function MenuListComposition() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuListComposition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuListComposition.__proto__ || Object.getPrototypeOf(MenuListComposition)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleToggle = function () {
      _this.setState(function (state) {
        return { open: !state.open };
      });
    }, _this.handleClose = function (event) {
      if (_this.anchorEl.contains(event.target)) {
        return;
      }
      _this.setState({ open: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuListComposition, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          data = _props.data;
      var open = this.state.open;


      return _react2.default.createElement(
        "div",
        { className: classes.root, "data-html2canvas-ignore": true },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _Button2.default,
            (0, _extends3.default)({
              buttonRef: function buttonRef(node) {
                _this2.anchorEl = node;
              },
              "aria-owns": open ? "menu-list-grow" : null,
              "aria-haspopup": "true",
              onClick: this.handleToggle
            }, data.props),
            _react2.default.createElement(_Icon2.default, { className: classes.leftIcon, iconName: data.leftIcon }),
            data.label,
            _react2.default.createElement(_Icon2.default, { className: classes.rightIcon, iconName: data.rightIcon })
          ),
          _react2.default.createElement(
            _Popper2.default,
            { open: open, anchorEl: this.anchorEl, transition: true, disablePortal: true },
            function (_ref2) {
              var TransitionProps = _ref2.TransitionProps,
                  placement = _ref2.placement;
              return _react2.default.createElement(
                _Grow2.default,
                (0, _extends3.default)({}, TransitionProps, {
                  id: "menu-list-grow",
                  style: {
                    transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                  }
                }),
                _react2.default.createElement(
                  _Paper2.default,
                  null,
                  _react2.default.createElement(
                    _ClickAwayListener2.default,
                    { onClickAway: _this2.handleClose },
                    _react2.default.createElement(
                      _MenuList2.default,
                      null,
                      data.menu.map(function (item, key) {
                        return _react2.default.createElement(
                          _MenuItem2.default,
                          { key: key, onClick: item.link },
                          _react2.default.createElement(_Icon2.default, {
                            className: classes.leftIcon,
                            iconName: item.leftIcon
                          }),
                          item.label,
                          _react2.default.createElement(_Icon2.default, {
                            className: classes.leftIcon,
                            iconName: item.rightIcon
                          })
                        );
                      })
                    )
                  )
                )
              );
            }
          )
        )
      );
    }
  }]);
  return MenuListComposition;
}(_react2.default.Component);

MenuListComposition.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(MenuListComposition);
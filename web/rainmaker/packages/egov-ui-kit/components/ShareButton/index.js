"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Share = require("@material-ui/icons/Share");

var _Share2 = _interopRequireDefault(_Share);

var _DialogWithTextBox = require("../DialogWithTextBox");

var _DialogWithTextBox2 = _interopRequireDefault(_DialogWithTextBox);

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _reactRedux = require("react-redux");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

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
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
      zIndex: 999
    },
    menuItem: {
      zIndex: 99999
    }
  };
};

// const suggestions = ["Red", "Orange", "Yellow", "Green", "Blue", "Pur=ple", "Black", "White"];

var suggestions = [{
  id: "1234",
  tenantId: "pb.amrtisar",
  userId: "abcd",
  name: "abcd",
  phone: "9987654322",
  email: "asd1@gmail.com"
}, {
  id: "123",
  tenantId: "pb.amrtisar",
  userId: "abc",
  name: "abc",
  phone: "9987654321",
  email: "asd@gmail.com "
}];

var MenuListComposition = function (_React$Component) {
  (0, _inherits3.default)(MenuListComposition, _React$Component);

  function MenuListComposition() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuListComposition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuListComposition.__proto__ || Object.getPrototypeOf(MenuListComposition)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      popOpen: false,
      lableText: "",
      errorText: "",
      dataSource: suggestions,
      popupLablesPlaceHolders: {
        sendLabel: "",
        nameLabel: "",
        secondaryLabel: "",
        sendPalceHolder: "",
        namePlaceHolder: "",
        secondaryPlaceHolder: "",
        sendDataType: "",
        secondaryDataType: "",
        dataConfigval: "",
        dataSecondaryConfig: ""
      },
      nameVal: "",
      secondaryVal: ""
    }, _this.onNameHandleChange = function (event, val) {
      _this.setState({ nameVal: val });
    }, _this.onSecondValueHandleChange = function (event, val) {
      _this.setState({ secondaryVal: val });
    }, _this.onAutoCompletTextChangeCallBack = function (val) {
      console.log("sudhan", _this.state.popupLablesPlaceHolders["sendDataType"]);
      var type = _this.state.popupLablesPlaceHolders["sendDataType"];
      var matched = (0, _commons.checkPattern)(val, type);
      if (matched) {
        _this.state.dataSource.map(function (elem) {
          var _this$state$popupLabl = _this.state.popupLablesPlaceHolders,
              dataConfigval = _this$state$popupLabl.dataConfigval,
              dataSecondaryConfig = _this$state$popupLabl.dataSecondaryConfig;


          if (elem[dataConfigval] === val) {
            debugger;
            _this.setState({ nameVal: elem["name"], secondaryVal: elem[dataSecondaryConfig] });
          }
        });
      }
    }, _this.handleToggle = function () {
      _this.setState(function (state) {
        return { open: !state.open };
      });
    }, _this.handleClose = function (event) {
      if (_this.anchorEl.contains(event.target)) {
        return;
      }

      _this.setState({ open: false });
    }, _this.popUp = function (elem) {
      _this.setState({ popOpen: true });
      _this.setState({ lableText: elem });
      _this.setState({ popupLablesPlaceHolders: (0, _commons.sharePopupLabels)(elem) });

      _this.props.sendMessage(elem.toUpperCase(), "ShareMetaData.shareMedia");
    }, _this.closeDialog = function () {
      _this.setState({ popOpen: false });
    }, _this.onSend = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(val) {
        var shareMedia, matched, ShareMetaData, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shareMedia = _this.props.ShareMetaData.shareMedia;
                matched = shareMedia === "SMS" || shareMedia === "WHATSAPP" ? (0, _commons.checkPattern)(val, "Mobile") : (0, _commons.checkPattern)(val, "Email");

                matched ? _this.setState({ errorText: "" }) : _this.setState({ errorText: "Enter Correct Details" });

                if (!matched) {
                  _context.next = 10;
                  break;
                }

                _this.props.sendMessage(val, "ShareMetaData.shareContent.to");
                _this.setState({ popOpen: false });
                ShareMetaData = _this.props.ShareMetaData;
                _context.next = 9;
                return (0, _api.httpRequest)("/egov-ui-transform-service/share/v1/_create", "", [], ShareMetaData);

              case 9:
                payload = _context.sent;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuListComposition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onLoadFn();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var classes = this.props.classes;
      var open = this.state.open;

      var defaultShare = ["SMS", "Email", "Whatsapp"];
      var extraShare = this.props.extraShare;

      var shareList = extraShare && extraShare instanceof Array ? [].concat(defaultShare, (0, _toConsumableArray3.default)(extraShare)) : defaultShare;
      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          "div",
          { className: classes.menuItem },
          _react2.default.createElement(
            _Button2.default,
            {
              buttonRef: function buttonRef(node) {
                _this3.anchorEl = node;
              },
              variant: "fab",
              className: classes.fab,
              "aria-owns": open ? "menu-list-grow" : undefined,
              "aria-haspopup": "true",
              onClick: this.handleToggle
            },
            _react2.default.createElement(_Share2.default, null)
          ),
          _react2.default.createElement(
            _Popper2.default,
            { open: open, anchorEl: this.anchorEl, transition: true, disablePortal: true },
            function (_ref3) {
              var TransitionProps = _ref3.TransitionProps,
                  placement = _ref3.placement;
              return _react2.default.createElement(
                _Grow2.default,
                (0, _extends3.default)({}, TransitionProps, { id: "menu-list-grow", style: { transformOrigin: placement === "bottom" ? "center top" : "center bottom" } }),
                _react2.default.createElement(
                  _Paper2.default,
                  null,
                  _react2.default.createElement(
                    _ClickAwayListener2.default,
                    { onClickAway: _this3.handleClose },
                    _react2.default.createElement(
                      _MenuList2.default,
                      null,
                      shareList.map(function (elem, index) {
                        return _react2.default.createElement(
                          _MenuItem2.default,
                          { key: index, value: index, onClick: function onClick(e) {
                              return _this3.popUp(elem);
                            } },
                          elem
                        );
                      })
                    )
                  )
                )
              );
            }
          ),
          _react2.default.createElement(_DialogWithTextBox2.default, {
            lableText: this.state.lableText,
            errorText: this.state.errorText,
            popOpen: this.state.popOpen,
            closeDialog: this.closeDialog,
            onSend: function onSend(a) {
              return _this3.onSend(a);
            },
            onAutoCompletTextChangeCallBack: this.onAutoCompletTextChangeCallBack,
            dataSource: this.state.dataSource,
            popupLablesPlaceHolders: this.state.popupLablesPlaceHolders,
            onNameHandleChange: this.onNameHandleChange,
            onSecondValueHandleChange: this.onSecondValueHandleChange,
            nameVal: this.state.nameVal,
            secondaryVal: this.state.secondaryVal
          })
        )
      );
    }
  }]);
  return MenuListComposition;
}(_react2.default.Component);

MenuListComposition.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    sendMessage: function sendMessage(message, jsonPath) {
      return dispatch((0, _actions.sendMessage)(message, jsonPath));
    }
  };
};

var mapStateToProps = function mapStateToProps(state) {
  var complaints = state.complaints;
  var ShareMetaData = complaints.ShareMetaData;

  return { ShareMetaData: ShareMetaData };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _styles.withStyles)(styles)(MenuListComposition));
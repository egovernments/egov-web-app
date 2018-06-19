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

var _reactRedux = require("react-redux");

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _components = require("components");

var _AppBar = require("./components/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _LogoutDialog = require("./components/LogoutDialog");

var _LogoutDialog2 = _interopRequireDefault(_LogoutDialog);

var _NavigationDrawer = require("./components/NavigationDrawer");

var _NavigationDrawer2 = _interopRequireDefault(_NavigationDrawer);

var _actions = require("egov-ui-kit/redux/auth/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get userInfo role
var Header = function (_Component) {
  (0, _inherits3.default)(Header, _Component);

  function Header() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      toggleMenu: false,
      logoutPopupOpen: false,
      right: false,
      left: false
    }, _this._handleToggleMenu = function () {
      var toggleMenu = _this.state.toggleMenu;

      _this.setState({
        toggleMenu: !toggleMenu
      });
    }, _this._onUpdateMenuStatus = function (status) {
      _this.setState({
        toggleMenu: status
      });
    }, _this._handleBackNavigation = function () {
      _this.props.history.goBack();
    }, _this._logout = function () {
      _this._closeLogoutDialog();
      _this.props.logout();
    }, _this._closeLogoutDialog = function () {
      _this.setState({
        logoutPopupOpen: false
      });
    }, _this._appBarProps = function () {
      var _this$props$options = _this.props.options,
          isHomeScreen = _this$props$options.isHomeScreen,
          hideBackButton = _this$props$options.hideBackButton;

      var isComplaintType = /(complaint-type)\/?$/.test(window.location.pathname);

      var style = { overflowX: "hidden", width: "initial", overflowY: "hidden" };
      if (isComplaintType) {
        style.boxShadow = "none";
      }

      var iconElementLeft = _react2.default.createElement(
        "div",
        { className: "appbar-left-icon" },
        _react2.default.createElement(
          _IconButton2.default,
          { id: "icon-hamburger" },
          isHomeScreen ? _react2.default.createElement(_components.Icon, { id: "icon-hamburger", action: "custom", name: "hamburger" }) : hideBackButton ? null : _react2.default.createElement(_components.Icon, { id: "back-navigator", action: "navigation", name: "arrow-back" })
        )
      );

      var onLeftIconButtonClick = isHomeScreen ? _this._handleToggleMenu : hideBackButton ? null : _this._handleBackNavigation;
      //const onLeftIconButtonClick = this._handleToggleMenu;

      return { style: style, iconElementLeft: iconElementLeft, onLeftIconButtonClick: onLeftIconButtonClick, isHomeScreen: isHomeScreen };
    }, _this._handleItemClick = function (item, index) {
      var route = item.route;
      // close the navigation bar

      _this._handleToggleMenu();
      // this logic is a bit shaky!! might break in future
      switch (route.slice(1)) {
        case "logout":
          _this.setState({
            logoutPopupOpen: true
          });
          break;
        case "language-selection":
          break;
        default:
          _this.props.history.push(route);
          break;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  //header related actions


  (0, _createClass3.default)(Header, [{
    key: "render",
    value: function render() {
      var _state = this.state,
          toggleMenu = _state.toggleMenu,
          logoutPopupOpen = _state.logoutPopupOpen;
      var _onUpdateMenuStatus = this._onUpdateMenuStatus,
          _handleItemClick = this._handleItemClick,
          _logout = this._logout,
          _closeLogoutDialog = this._closeLogoutDialog,
          _appBarProps = this._appBarProps;

      var appBarProps = _appBarProps();
      var _props = this.props,
          className = _props.className,
          role = _props.role,
          cities = _props.cities,
          history = _props.history,
          title = _props.title,
          fetchLocalizationLabel = _props.fetchLocalizationLabel,
          userInfo = _props.userInfo,
          isHomeScreen = _props.isHomeScreen;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_AppBar2.default, (0, _extends3.default)({
          className: className,
          title: title,
          role: role
        }, appBarProps, {
          fetchLocalizationLabel: fetchLocalizationLabel,
          userInfo: userInfo
        })),
        _react2.default.createElement(_NavigationDrawer2.default, {
          handleItemClick: _handleItemClick,
          onUpdateMenuStatus: _onUpdateMenuStatus,
          toggleMenu: toggleMenu,
          history: history,
          cities: cities,
          userInfo: userInfo,
          fetchLocalizationLabel: fetchLocalizationLabel,
          role: role && role === "citizen" ? "citizen" : "employee",
          openSecondary: true,
          width: 300,
          containerStyle: { top: "64px" }
        }),
        _react2.default.createElement(_LogoutDialog2.default, { logoutPopupOpen: logoutPopupOpen, closeLogoutDialog: _closeLogoutDialog, logout: _logout })
      );
    }
  }]);
  return Header;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var cities = state.common.cities || [];
  return { cities: cities };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logout: function logout() {
      return dispatch((0, _actions.logout)());
    },
    fetchLocalizationLabel: function fetchLocalizationLabel(locale) {
      return dispatch((0, _actions2.fetchLocalizationLabel)(locale));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);
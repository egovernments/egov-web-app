"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _styles = require("@material-ui/core/styles");

var _uiAtoms = require("../../ui-atoms");

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _uiMolecules = require("../../ui-molecules");

var _mihy = require("ui-config/routes/mihy");

var _mihy2 = _interopRequireDefault(_mihy);

var _css = require("./css");

var _css2 = _interopRequireDefault(_css);

var _recompose = require("recompose");

var _reactRedux = require("react-redux");

var _actions = require("ui-redux/auth/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Landing = function (_React$Component) {
  (0, _inherits3.default)(Landing, _React$Component);

  function Landing() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Landing);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Landing.__proto__ || Object.getPrototypeOf(Landing)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mobileOpen: false
    }, _this.handleDrawerToggle = function () {
      _this.setState(function (state) {
        return { mobileOpen: !state.mobileOpen };
      });
    }, _this.logout = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Landing, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          theme = _props.theme,
          match = _props.match,
          logout = _props.logout;


      var drawer = _react2.default.createElement(
        _uiAtoms.Div,
        null,
        _react2.default.createElement(_uiAtoms.Div, { className: classes.toolbar }),
        _react2.default.createElement(_Divider2.default, null),
        _react2.default.createElement(
          _uiAtoms.List,
          null,
          _react2.default.createElement(
            _uiAtoms.ListItem,
            { button: true },
            _react2.default.createElement(_uiAtoms.ListItemText, { primary: "Home" })
          ),
          _react2.default.createElement(
            _uiAtoms.ListItem,
            { button: true, component: "a", href: "#simple-list" },
            _react2.default.createElement(_uiAtoms.ListItemText, { primary: "Edit Profile" })
          ),
          _react2.default.createElement(
            _uiAtoms.ListItem,
            { button: true },
            _react2.default.createElement(_uiAtoms.ListItemText, { primary: "Contact Us" })
          ),
          _react2.default.createElement(
            _uiAtoms.ListItem,
            { button: true, onClick: function onClick() {
                logout();
              } },
            _react2.default.createElement(_uiAtoms.ListItemText, { primary: "Logout" })
          )
        )
      );
      return _react2.default.createElement(
        _uiAtoms.Div,
        { className: classes.root },
        _react2.default.createElement(
          _uiAtoms.AppBar,
          { className: classes.appBar },
          _react2.default.createElement(
            _uiAtoms.Toolbar,
            null,
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: "inherit",
                "aria-label": "Open drawer",
                onClick: this.handleDrawerToggle,
                className: classes.navIconHide
              },
              _react2.default.createElement(_uiAtoms.Icon, { iconName: "menu" })
            ),
            _react2.default.createElement(
              _uiAtoms.Typegraphy,
              { variant: "title", color: "inherit", noWrap: true },
              "Mihy"
            )
          )
        ),
        _react2.default.createElement(
          _Hidden2.default,
          { mdUp: true },
          _react2.default.createElement(
            _uiAtoms.Drawer,
            {
              variant: "temporary",
              anchor: theme.direction === "rtl" ? "right" : "left",
              open: this.state.mobileOpen,
              onClose: this.handleDrawerToggle,
              classes: {
                paper: classes.drawerPaper
              },
              ModalProps: {
                keepMounted: true // Better open performance on mobile.
              }
            },
            drawer
          )
        ),
        _react2.default.createElement(
          _Hidden2.default,
          { smDown: true, implementation: "css" },
          _react2.default.createElement(
            _uiAtoms.Drawer,
            {
              variant: "permanent",
              open: true,
              classes: {
                paper: classes.drawerPaper
              }
            },
            drawer
          )
        ),
        _react2.default.createElement(
          _uiAtoms.Main,
          { className: classes.content },
          _react2.default.createElement("div", { className: classes.toolbar }),
          _react2.default.createElement(_uiMolecules.RenderRoutes, { basePath: match.url, routes: _mihy2.default })
        )
      );
    }
  }]);
  return Landing;
}(_react2.default.Component);
// import BloodDashboard from "apps/ui-blood/views/Dashboard";
// import SearchDonor from "apps/ui-blood/views/SearchDonor";
// import Registration from "apps/ui-blood/views/Registration";
// import DonorProcess from "apps/ui-blood/views/DonorProcess";


Landing.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired
};

// const mapStateToProps=(state)=>{
//   return null
// }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logout: function logout() {
      return dispatch((0, _actions.logout)());
    }
  };
};

exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(null, mapDispatchToProps), (0, _styles.withStyles)(_css2.default, { withTheme: true }))(Landing);
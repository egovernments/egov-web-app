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

var _styles = require("@material-ui/core/styles");

var _uiAtoms = require("../../ui-atoms");

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _css = require("./css");

var _css2 = _interopRequireDefault(_css);

var _recompose = require("recompose");

var _reactJsonView = require("react-json-view");

var _reactJsonView2 = _interopRequireDefault(_reactJsonView);

var _uiHocs = require("../../ui-hocs");

var _CommonView = require("../../ui-molecules/CommonView");

var _CommonView2 = _interopRequireDefault(_CommonView);

var _apply = require("../../ui-config/screens/specs/tradelicence/apply");

var _apply2 = _interopRequireDefault(_apply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import defaultScreenConfig from "ui-config/screens/specs/tradelicence/wizard";


var initScreenConfig = _apply2.default;
// import defaultScreenConfig from "ui-config/screens/specs/blood/dashboard";

var Playground = function (_React$Component) {
  (0, _inherits3.default)(Playground, _React$Component);

  function Playground() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Playground);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Playground.__proto__ || Object.getPrototypeOf(Playground)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mobileOpen: false,
      screenConfig: initScreenConfig,
      view: null
    }, _this.handleDrawerToggle = function () {
      _this.setState(function (state) {
        return { mobileOpen: !state.mobileOpen };
      });
    }, _this.initScreen = function (screenConfig) {
      var hasOwnConfig = true;
      _this.setState({
        view: (0, _uiHocs.screenHoc)({ hasOwnConfig: hasOwnConfig, screenConfig: screenConfig })(_CommonView2.default)
      });
    }, _this.updateScreen = function (jsonStatus, action) {
      _this.initScreen(jsonStatus.updated_src);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Playground, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var screenConfig = this.state.screenConfig;

      this.initScreen(screenConfig);
    }
  }, {
    key: "render",
    value: function render() {
      var updateScreen = this.updateScreen;
      var _props = this.props,
          classes = _props.classes,
          theme = _props.theme;
      var _state = this.state,
          View = _state.view,
          screenConfig = _state.screenConfig;


      var drawer = _react2.default.createElement(
        _uiAtoms.Div,
        null,
        _react2.default.createElement(
          _uiAtoms.AppBar,
          { style: { backgroundColor: "#880E4F" } },
          _react2.default.createElement(
            _uiAtoms.Toolbar,
            null,
            _react2.default.createElement(
              _uiAtoms.Typegraphy,
              { variant: "title", color: "inherit", noWrap: true },
              "Screen configuration"
            )
          )
        ),
        _react2.default.createElement("br", null),
        _react2.default.createElement(_reactJsonView2.default, {
          src: screenConfig,
          displayDataTypes: false,
          collapsed: 2,
          onAdd: function onAdd(add) {
            updateScreen(add, "add");
          },
          onDelete: function onDelete(del) {
            updateScreen(del, "del");
          },
          onEdit: function onEdit(edit) {
            updateScreen(edit, "edit");
          },
          onSelect: function onSelect(select) {
            console.log(select);
          }
        })
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
              "Mihy Playground"
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
          "main",
          { className: classes.content },
          _react2.default.createElement("div", { className: classes.toolbar }),
          View && _react2.default.createElement(View, null)
        )
      );
    }
  }]);
  return Playground;
}(_react2.default.Component);

Playground.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired
};

exports.default = (0, _recompose.compose)((0, _styles.withStyles)(_css2.default, { withTheme: true }))(Playground);
//
// <br />
// <br />
// <Button variant="contained" color="primary" fullWidth="true">
//   Export
// </Button>
// <br />
// <br />
// <Button variant="contained" color="secondary" fullWidth="true">
//   Import
// </Button>
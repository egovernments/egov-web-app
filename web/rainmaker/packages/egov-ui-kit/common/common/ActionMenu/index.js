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

var _reactRedux = require("react-redux");

var _lodash = require("lodash");

var _components = require("../ActionMenu/components");

var _components2 = _interopRequireDefault(_components);

require("./index.css");

var _actions = require("egov-ui-kit/redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionMenu = function (_Component) {
  (0, _inherits3.default)(ActionMenu, _Component);

  function ActionMenu() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ActionMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ActionMenu.__proto__ || Object.getPrototypeOf(ActionMenu)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var userInfo, fetchActionMenu, roles, roleCodes;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userInfo = JSON.parse(localStorage.getItem("user-info"));
              fetchActionMenu = _this.props.fetchActionMenu;
              roles = (0, _lodash.get)(userInfo, "roles");
              roleCodes = roles ? roles.map(function (role) {
                return role.code;
              }) : [];
              _context.next = 6;
              return fetchActionMenu({
                roleCodes: roleCodes,
                tenantId: "pb",
                actionMaster: "actions-test",
                enabled: true
              }, {
                ts: new Date().getTime()
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ActionMenu, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          actionListArr = _props.actionListArr,
          activeRoutePath = _props.activeRoutePath,
          updateActiveRoute = _props.updateActiveRoute,
          toggleDrawer = _props.toggleDrawer,
          menuDrawerOpen = _props.menuDrawerOpen;

      var transformedRole = "";
      // actionListArr.push({url:"https://www.google.com",navigationURL:"newTab",path:"test.new tab"});
      return actionListArr && actionListArr.length > 0 ? _react2.default.createElement(_components2.default, { role: transformedRole,
        actionListArr: actionListArr,
        activeRoutePath: activeRoutePath,
        toggleDrawer: toggleDrawer,
        menuDrawerOpen: menuDrawerOpen,
        updateActiveRoute: updateActiveRoute }) : null;
    }
  }]);
  return ActionMenu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref3) {
  var app = _ref3.app;

  var actionListArr = app.menu || [];
  var activeRoutePath = app.activeRoutePath;

  return { actionListArr: actionListArr, activeRoutePath: activeRoutePath };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleToggle: function handleToggle(showMenu) {
      return dispatch({ type: "MENU_TOGGLE", showMenu: showMenu });
    },
    setRoute: function setRoute(route) {
      return dispatch({ type: "SET_ROUTE", route: route });
    },
    fetchActionMenu: function fetchActionMenu(role, ts) {
      return dispatch((0, _actions.fetchActionItems)(role, ts));
    },
    updateActiveRoute: function updateActiveRoute(routepath, routeName) {
      return dispatch((0, _actions.updateActiveRoute)(routepath, routeName));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ActionMenu);
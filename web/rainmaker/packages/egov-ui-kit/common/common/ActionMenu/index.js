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

var _reactRouterDom = require("react-router-dom");

var _Menu = require("material-ui/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactRedux = require("react-redux");

var _components = require("components");

var _lodash = require("lodash");

var _components2 = require("../ActionMenu/components");

var _components3 = _interopRequireDefault(_components2);

require("./index.css");

var _actions = require("egov-ui-kit/redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import actionList from "./actionList";

var styles = {
  menuStyle: {
    marginLeft: 15,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flex: 1
  },

  inputStyle: {
    color: "white !important",
    marginTop: "0px",
    marginLeft: "-10px"
  },
  fibreIconStyle: {
    height: "21px",
    width: "21px",
    margin: 0,
    position: "relative"
  },
  arrowIconStyle: {
    right: "-10px"
  },
  defaultMenuItemStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 0,
    padding: 0
  }
};

// const

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
      var _this$props, fetchActionMenu, role, roleCode;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //let userInfo = localStorage.getItem("user-info");
              _this$props = _this.props, fetchActionMenu = _this$props.fetchActionMenu, role = _this$props.role;
              roleCode = _this.getTransformedRole(role);
              _context.next = 4;
              return fetchActionMenu({
                roleCodes: [roleCode],
                tenantId: "pb",
                actionMaster: "actions-test",
                enabled: true
              }, {
                ts: new Date().getTime()
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.getTransformedRole = function (role) {
      switch (role) {
        case "citizen":
          return "CITIZEN";
          break;
        case "csr":
          return "CSR";
          break;
        case "ao":
          return "GRO";
          break;
        case "employee":
          return "EMPLOYEE";
          break;
        case "pgr-admin":
          return "PGR-ADMIN";
          break;
        default:
          return "";
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ActionMenu, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          actionListArr = _props.actionListArr,
          role = _props.role;
      // let { role } = this.props;
      //let actionListArr = actionList[role];

      var transformedRole = this.getTransformedRole(role);

      if (actionListArr && actionListArr.length > 0) {
        actionListArr.map(function (item) {
          if (transformedRole === "EMPLOYEE" && item.path && item.path.split(".") && item.path.split(".")[0] === "Property Tax") {
            item.navigationURL = "";
          }
        });
      }

      return actionListArr && actionListArr.length > 0 ? _react2.default.createElement(_components3.default, { role: transformedRole, actionListArr: actionListArr }) : null;
    }
  }]);
  return ActionMenu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref3) {
  var app = _ref3.app;

  var actionListArr = app.menu || [];
  return { actionListArr: actionListArr };
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
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ActionMenu);
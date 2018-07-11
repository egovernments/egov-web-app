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

var _actionList = require("./actionList");

var _actionList2 = _interopRequireDefault(_actionList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

//import { fetchActionItems } from "egov-ui-kit/redux/app/actions";

var ActionMenu = function (_Component) {
  (0, _inherits3.default)(ActionMenu, _Component);

  function ActionMenu() {
    (0, _classCallCheck3.default)(this, ActionMenu);
    return (0, _possibleConstructorReturn3.default)(this, (ActionMenu.__proto__ || Object.getPrototypeOf(ActionMenu)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActionMenu, [{
    key: "render",

    // componentDidMount = async () => {
    //   let userInfo = localStorage.getItem("user-info");
    //   let { fetchActionMenu, role } = this.props;
    //   await fetchActionMenu(
    //     {
    //       roleCodes: [role],
    //       tenantId: "pb",
    //       actionMaster: "actions-test",
    //       enabled: true,
    //     },
    //     {
    //       ts: 1531206285401,
    //     }
    //   );
    // };

    value: function render() {
      // let { actionListArr, role } = this.props;
      var role = this.props.role;

      var actionListArr = _actionList2.default[role];

      return actionListArr && actionListArr.length > 0 ? _react2.default.createElement(_components3.default, { role: role, actionListArr: actionListArr }) : null;
    }
  }]);
  return ActionMenu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var app = _ref.app;

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
    }
    // fetchActionMenu: (role, ts) => dispatch(fetchActionItems(role, ts)),
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ActionMenu);
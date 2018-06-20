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

var _actionList = require("./actionList");

var _actionList2 = _interopRequireDefault(_actionList);

require("./index.css");

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

var ActionMenu = function (_Component) {
  (0, _inherits3.default)(ActionMenu, _Component);

  function ActionMenu(props) {
    (0, _classCallCheck3.default)(this, ActionMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionMenu.__proto__ || Object.getPrototypeOf(ActionMenu)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({
        searchText: e.target.value
      });
    };

    _this.addMenuItems = function (path, splitArray, menuItems, index) {
      var role = _this.props.role;

      var actionList = _actionList2.default[role];

      if (splitArray.length > 1) {
        if (!(0, _lodash.some)(menuItems, { name: splitArray[0] })) {
          menuItems.push({
            path: path != "" ? path + "." + splitArray[0] : "",
            name: splitArray[0],
            url: "",
            queryParams: actionList[index].queryParams,
            orderNumber: actionList[index].orderNumber,
            navigationURL: actionList[index].navigationURL,
            leftIcon: actionList[index].leftIcon
          });
        }
      } else {
        menuItems.push({
          path: path != "" ? path + "." + splitArray[0] : "",
          name: actionList[index].displayName,
          url: actionList[index].url,
          queryParams: actionList[index].queryParams,
          orderNumber: actionList[index].orderNumber,
          navigationURL: actionList[index].navigationURL,
          leftIcon: actionList[index].leftIcon
        });
      }
      menuItems = (0, _lodash.orderBy)(menuItems, ["orderNumber"], ["asc"]);
      _this.setState({
        menuItems: menuItems,
        path: path
      });
    };

    _this.menuChange = function (pathParam) {
      var path = pathParam.path;
      var role = _this.props.role;

      var actionList = _actionList2.default[role];
      var menuItems = [];
      for (var i = 0; i < actionList.length; i++) {
        if (actionList[i].path !== "") {
          if (path && !path.parentMenu && actionList[i].path.startsWith(path + ".")) {
            var splitArray = actionList[i].path.split(path + ".")[1].split(".");
            _this.addMenuItems(path, splitArray, menuItems, i);
          } else if (pathParam && pathParam.parentMenu) {
            var _splitArray = actionList[i].path.split(".");
            _this.addMenuItems(path, _splitArray, menuItems, i);
          }
        }
      }
    };

    _this.changeLevel = function (path) {
      var searchText = _this.state.searchText;
      var setRoute = _this.props.setRoute;


      if (!path) {
        var pathParam = {
          path: "",
          parentMenu: true
        };
        _this.menuChange(pathParam);

        setRoute("/citizen/property-tax");
      } else {
        var splitArray = (0, _lodash.split)(path, ".");
        var x = splitArray.slice(0, splitArray.length - 1).join(".");
        if (x != "" && splitArray.length > 1) {
          var _pathParam = {
            path: x,
            parentMenu: false
          };
          _this.menuChange(_pathParam);
        } else {
          var _pathParam2 = {
            path: "",
            parentMenu: true
          };
          _this.menuChange(_pathParam2);
        }
      }
    };

    _this.changeRoute = function (route) {
      var setRoute = _this.props.setRoute;

      setRoute(route);
    };

    _this.state = {
      searchText: "",
      path: "",
      menuItems: []
    };
    // this.handleClickOutside = this.handleClickOutside.bind(this);
    _this.setWrapperRef = _this.setWrapperRef.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ActionMenu, [{
    key: "setWrapperRef",
    value: function setWrapperRef(node) {
      this.wrapperRef = node;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var pathParam = {
        path: "",
        parentMenu: true
      };
      this.menuChange(pathParam);
    }
  }, {
    key: "changeModulesActions",
    value: function changeModulesActions(modules, items) {
      this.setState({
        modules: modules,
        items: items
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          handleToggle = _props.handleToggle,
          role = _props.role;
      var _state = this.state,
          searchText = _state.searchText,
          modules = _state.modules,
          items = _state.items,
          changeModulesActions = _state.changeModulesActions,
          path = _state.path,
          menuItems = _state.menuItems;
      var changeLevel = this.changeLevel,
          menuChange = this.menuChange,
          changeRoute = this.changeRoute;

      var actionList = _actionList2.default[role];

      var showMenuItem = function showMenuItem() {
        if (searchText.length == 0) {
          return menuItems.map(function (item, index) {
            if (!item.url) {
              return _react2.default.createElement(_MenuItem2.default, {
                key: index,
                innerDivStyle: styles.defaultMenuItemStyle,
                style: { whiteSpace: "initial" },
                leftIcon: _react2.default.createElement(_components.Icon, {
                  name: item.leftIcon.name,
                  action: item.leftIcon.action,
                  color: "#b3b3b3",
                  style: styles.fibreIconStyle,
                  className: "material-icons whiteColor custom-style-for-" + item.leftIcon.name
                }),
                primaryText: _react2.default.createElement(
                  "div",
                  { className: "menuStyle whiteColor", style: styles.menuStyle },
                  _react2.default.createElement(
                    "span",
                    { className: "onHoverText hidden-xs" },
                    item.name || ""
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "#b3b3b3" } },
                    item.name || ""
                  )
                ),
                rightIcon: _react2.default.createElement(_components.Icon, {
                  name: "chevron-right",
                  action: "navigation",
                  color: "#b3b3b3",
                  className: "material-icons whiteColor",
                  style: styles.arrowIconStyle
                }),
                onClick: function onClick() {
                  var pathParam = {
                    path: !item.path ? item.name : item.path,
                    parentPath: false
                  };
                  menuChange(pathParam);
                }
              });
            } else {
              if (item.navigationURL) {
                return _react2.default.createElement(
                  _reactRouterDom.Link,
                  { key: index, to: "/citizen/" + item.navigationURL },
                  _react2.default.createElement(_MenuItem2.default, {
                    innerDivStyle: styles.defaultMenuItemStyle,
                    style: { whiteSpace: "initial" },
                    key: index,
                    onClick: function onClick() {
                      document.title = item.name;
                    },
                    leftIcon: _react2.default.createElement(_components.Icon, {
                      name: item.leftIcon.name,
                      action: item.leftIcon.action,
                      color: "#b3b3b3",
                      style: styles.fibreIconStyle,
                      className: "material-icons whiteColor custom-style-for-" + item.leftIcon.name
                    }),
                    primaryText: _react2.default.createElement(
                      "div",
                      { className: "menuStyle whiteColor", style: styles.menuStyle },
                      _react2.default.createElement(
                        "span",
                        { className: "onHoverText hidden-xs" },
                        item.name || ""
                      ),
                      _react2.default.createElement(
                        "span",
                        { style: { color: "#b3b3b3" } },
                        item.name || ""
                      )
                    )
                  })
                );
              }
            }
          });
        } else {
          return actionList.map(function (item, index) {
            if (item.path && item.url && item.displayName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
              if (item.navigationURL) {
                return _react2.default.createElement(
                  _reactRouterDom.Link,
                  { key: index, to: "/citizen/" + item.navigationURL },
                  _react2.default.createElement(_MenuItem2.default, {
                    innerDivStyle: styles.defaultMenuItemStyle,
                    style: { whiteSpace: "initial" },
                    onClick: function onClick() {
                      document.title = item.displayName;
                    },
                    leftIcon: _react2.default.createElement(_components.Icon, {
                      name: item.leftIcon.name,
                      action: item.leftIcon.action,
                      color: "#b3b3b3",
                      style: styles.fibreIconStyle,
                      className: "material-icons whiteColor custom-style-for-" + item.leftIcon.name
                    }),
                    primaryText: _react2.default.createElement(
                      "div",
                      { className: "menuStyle whiteColor", style: styles.menuStyle },
                      _react2.default.createElement(
                        "span",
                        { className: "onHoverText  hidden-xs" },
                        item.displayName || ""
                      ),
                      _react2.default.createElement(
                        "span",
                        { style: { color: "#b3b3b3" } },
                        item.displayName || ""
                      )
                    )
                  })
                );
              }
            }
          });
        }
      };

      return _react2.default.createElement(
        "div",
        { ref: this.setWrapperRef },
        _react2.default.createElement("div", { className: "whiteColor", style: { marginTop: "22px" } }),
        _react2.default.createElement(
          _Menu2.default,
          {
            disableAutoFocus: true,
            desktop: true,
            autoWidth: false,
            style: { width: "100%" },
            className: "actionMenuMenu",
            menuItemStyle: { paddingLeft: "0", width: "100%" }
          },
          (path || searchText) && _react2.default.createElement(
            "div",
            {
              className: "pull-left whiteColor pointerCursor",
              onClick: function onClick() {
                changeLevel(path);
              }
            },
            _react2.default.createElement(_components.Icon, { name: "arrow-back", action: "navigation", color: "#ffffff" })
          ),
          path && _react2.default.createElement(
            "div",
            {
              className: "pull-right pointerCursor",
              onClick: function onClick() {
                changeLevel("");
              }
            },
            _react2.default.createElement(_components.Icon, { name: "home", action: "action", color: "#ffffff" })
          ),
          _react2.default.createElement("div", { className: "clearfix" }),
          _react2.default.createElement(
            "div",
            { style: { paddingLeft: "-24px" } },
            showMenuItem()
          )
        )
      );
    }
  }]);
  return ActionMenu;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleToggle: function handleToggle(showMenu) {
      return dispatch({ type: "MENU_TOGGLE", showMenu: showMenu });
    },
    setRoute: function setRoute(route) {
      return dispatch({ type: "SET_ROUTE", route: route });
    }
  };
};
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ActionMenu);
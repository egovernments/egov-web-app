"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
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

var _components = require("components");

var _navigationItems = require("./navigationItems");

var _actions = require("egov-ui-kit/redux/app/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Footer = (function(_Component) {
  (0, _inherits3.default)(Footer, _Component);

  function Footer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Footer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = (0, _possibleConstructorReturn3.default)(
        this,
        (_ref = Footer.__proto__ || Object.getPrototypeOf(Footer)).call.apply(_ref, [this].concat(args))
      )),
      _this)),
      (_this.state = {
        selectedIndex: 0,
      }),
      (_this._onTabChange = function(tabIndex) {
        var role = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "citizen";

        var route = _navigationItems.navigationItems[role][tabIndex].route;
        _this.props.setBottomNavigationIndex(tabIndex);
        if (route.length) _this.props.history.push(route);
      }),
      (_this._bottomNavigationOptions = function() {
        var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "citizen";

        return _navigationItems.navigationItems[role].map(function(item) {
          var label = item.label,
            icon = item.icon;
          var action = icon.action,
            name = icon.name;

          return (0, _extends3.default)({}, item, {
            label: _react2.default.createElement(_translationNode2.default, {
              className: "citizen-footer-text",
              fontSize: "12px",
              label: label,
              color: "#969696",
            }),
            icon: _react2.default.createElement(_components.Icon, { action: action, name: name }),
          });
        });
      }),
      _temp)),
      (0, _possibleConstructorReturn3.default)(_this, _ret)
    );
  }

  (0, _createClass3.default)(Footer, [
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          bottomNavigationIndex = _props.bottomNavigationIndex,
          role = _props.role;
        var _onTabChange = this._onTabChange,
          _bottomNavigationOptions = this._bottomNavigationOptions;

        var options = _bottomNavigationOptions(role);
        return _react2.default.createElement(_components.BottomNavigation, {
          selectedIndex: bottomNavigationIndex,
          options: options,
          handleChange: function handleChange(index) {
            return _onTabChange(index, role);
          },
        });
      },
    },
  ]);
  return Footer;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var bottomNavigationIndex = state.app.bottomNavigationIndex;

  return { bottomNavigationIndex: bottomNavigationIndex };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setBottomNavigationIndex: function setBottomNavigationIndex(index) {
      return dispatch((0, _actions.setBottomNavigationIndex)(index));
    },
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Footer);

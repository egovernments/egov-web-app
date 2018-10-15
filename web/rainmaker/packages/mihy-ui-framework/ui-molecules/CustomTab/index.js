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

var _reactSwipeableViews = require("react-swipeable-views");

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _withStyles = require("@material-ui/core/styles/withStyles");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Tabs = require("@material-ui/core/Tabs");

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require("@material-ui/core/Tab");

var _Tab2 = _interopRequireDefault(_Tab);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _css = require("./css.js");

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @material-ui/core components

// nodejs library that concatenates classes
// import classNames from "classnames";
// nodejs library to set properties for components
var CustomTab = function (_React$Component) {
  (0, _inherits3.default)(CustomTab, _React$Component);

  function CustomTab(props) {
    (0, _classCallCheck3.default)(this, CustomTab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CustomTab.__proto__ || Object.getPrototypeOf(CustomTab)).call(this, props));

    _this.handleChange = function (event, active) {
      _this.setState({ active: active });
    };

    _this.handleChangeIndex = function (index) {
      _this.setState({ active: index });
    };

    _this.state = {
      active: props.active
    };
    return _this;
  }

  (0, _createClass3.default)(CustomTab, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          tabs = _props.tabs,
          direction = _props.direction,
          horizontal = _props.horizontal,
          alignCenter = _props.alignCenter;

      var tabButtons = _react2.default.createElement(
        _Tabs2.default,
        {
          classes: { root: classes.tabsRoot, indicator: classes.tabsIndicator },
          value: this.state.active,
          onChange: this.handleChange,
          centered: alignCenter,
          scrollable: true,
          scrollButtons: "off"
        },
        tabs.map(function (prop, key) {
          return _react2.default.createElement(_Tab2.default, {
            label: prop.tabButton,
            key: key,
            classes: { root: classes.tabRoot, selected: classes.tabSelected }
          });
        })
      );
      var tabContent = _react2.default.createElement(
        "div",
        { className: classes.contentWrapper },
        _react2.default.createElement(
          _reactSwipeableViews2.default,
          {
            axis: direction === "rtl" ? "x-reverse" : "x",
            index: this.state.active,
            onChangeIndex: this.handleChangeIndex
          },
          tabs.map(function (prop, key) {
            return _react2.default.createElement(
              "div",
              { className: classes.tabContent, key: key },
              prop.tabContent
            );
          })
        )
      );
      return horizontal !== undefined ? _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _Grid2.default,
          { container: true },
          _react2.default.createElement(
            _Grid2.default,
            (0, _extends3.default)({ item: true }, horizontal.tabsGrid),
            tabButtons
          ),
          _react2.default.createElement(
            _Grid2.default,
            (0, _extends3.default)({ item: true }, horizontal.contentGrid),
            tabContent
          )
        )
      ) : _react2.default.createElement(
        "div",
        { className: classes.root },
        tabButtons,
        tabContent
      );
    }
  }]);
  return CustomTab;
}(_react2.default.Component);

// core components


CustomTab.defaultProps = {
  active: 0,
  color: "primary"
};

CustomTab.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  // index of the default active pill
  active: _propTypes2.default.number,
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    tabButton: _propTypes2.default.string,
    tabIcon: _propTypes2.default.func,
    tabContent: _propTypes2.default.node
  })).isRequired,
  color: _propTypes2.default.oneOf(["primary", "warning", "danger", "success", "info", "rose"]),
  direction: _propTypes2.default.string,
  horizontal: _propTypes2.default.shape({
    tabsGrid: _propTypes2.default.object,
    contentGrid: _propTypes2.default.object
  }),
  alignCenter: _propTypes2.default.bool
};

exports.default = (0, _withStyles2.default)(_css2.default)(CustomTab);
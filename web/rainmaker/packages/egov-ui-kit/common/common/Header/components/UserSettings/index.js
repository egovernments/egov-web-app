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

var _components = require("components");

var _download = require("egov-ui-kit/assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

var _commonMenuItems = require("../NavigationDrawer/commonMenuItems");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSettings = function (_Component) {
  (0, _inherits3.default)(UserSettings, _Component);

  function UserSettings() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UserSettings);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UserSettings.__proto__ || Object.getPrototypeOf(UserSettings)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      languageSelected: localStorage.getItem("locale"),
      displayAccInfo: false
    }, _this.items = [{
      label: "ENGLISH",
      value: "en_IN"
    }, {
      label: "हिंदी",
      value: "hi_IN"
    }, {
      label: "ਪੰਜਾਬੀ",
      value: "pn_IN"
    }], _this.style = {
      baseStyle: {
        background: "#ffffff",
        height: "65px",
        marginRight: "30px",
        width: "98px",
        marginBottom: "24px"
      },
      label: {
        color: "#5F5C57",
        fontSize: "12px",
        paddingRight: "0px"
      },
      arrowIconStyle: {
        marginTop: "7px",
        marginLeft: "10px"
      },
      iconStyle: {
        marginRight: "30px"
      },
      listStyle: {
        display: "block"
      },
      listInnerDivStyle: {
        padding: "10px",
        display: "flex",
        alignItems: "center"
      }
    }, _this.onChange = function (event, index, value) {
      _this.setState({ languageSelected: value });
      _this.props.fetchLocalizationLabel(value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UserSettings, [{
    key: "toggleAccInfo",
    value: function toggleAccInfo() {
      this.setState({
        displayAccInfo: !this.state.displayAccInfo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          languageSelected = _state.languageSelected,
          displayAccInfo = _state.displayAccInfo;
      var items = this.items,
          style = this.style;
      var _props = this.props,
          onIconClick = _props.onIconClick,
          userInfo = _props.userInfo,
          handleItemClick = _props.handleItemClick;

      return _react2.default.createElement(
        "div",
        { className: "userSettingsContainer" },
        _react2.default.createElement(
          "div",
          {
            onClick: function onClick() {
              _this2.toggleAccInfo();
            },
            className: "userSettingsInnerContainer"
          },
          _react2.default.createElement(_components.Image, { width: "33px", circular: true, source: userInfo.photo || _download2.default }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "arrow-drop-down", color: "#767676", style: style.arrowIconStyle }),
          _react2.default.createElement(
            "div",
            { className: "user-acc-info" },
            displayAccInfo ? _react2.default.createElement(_components.List, {
              onItemClick: function onItemClick(item) {
                handleItemClick(item, false);
              },
              innerDivStyle: style.listInnerDivStyle,
              className: "drawer-list-style",
              items: _commonMenuItems.CommonMenuItems,
              listContainerStyle: { background: "#ffffff" },
              listItemStyle: { borderBottom: "1px solid #e0e0e0" }
            }) : ""
          )
        )
      );
    }
  }]);
  return UserSettings;
}(_react.Component);

exports.default = UserSettings;
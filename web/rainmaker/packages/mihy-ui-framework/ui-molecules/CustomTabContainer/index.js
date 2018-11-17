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

var _Div = require("mihy-ui-framework/ui-atoms/HtmlElements/Div");

var _Div2 = _interopRequireDefault(_Div);

var _RenderScreen = require("mihy-ui-framework/ui-molecules/RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _CustomTab = require("../CustomTab");

var _CustomTab2 = _interopRequireDefault(_CustomTab);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("mihy-ui-framework/ui-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiItem = function (_React$Component) {
  (0, _inherits3.default)(MultiItem, _React$Component);

  function MultiItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MultiItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MultiItem.__proto__ || Object.getPrototypeOf(MultiItem)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      // const { items } = this.props;
      // if (!items.length) {
      //   this.addItem();
      // }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultiItem, [{
    key: "render",


    // addItem = () => {
    //   const {
    //     onFieldChange: addItem,
    //     screenKey,
    //     scheama,
    //     componentJsonpath,
    //     headerName,
    //     headerJsonPath,
    //     screenConfig
    //   } = this.props;
    //   const items = get(
    //     screenConfig,
    //     `${screenKey}.${componentJsonpath}.props.items`
    //   );
    //   const itemsLength = items.length;
    //   set(scheama, headerJsonPath, `${headerName} - ${itemsLength + 1}`);
    //   addItem(
    //     screenKey,
    //     componentJsonpath,
    //     `props.items[${itemsLength}]`,
    //     JSON.parse(
    //       JSON.stringify(
    //         addComponentJsonpath(
    //           { [`item${itemsLength}`]: scheama },
    //           `${componentJsonpath}.props.items[${itemsLength}]`
    //         )
    //       )
    //     )
    //   );
    // };

    value: function render() {
      console.log(this.props);
      var _props = this.props,
          items = _props.items,
          scheama = _props.scheama,
          addItemLabel = _props.addItemLabel,
          id = _props.id,
          uiFramework = _props.uiFramework,
          onFieldChange = _props.onFieldChange,
          onComponentClick = _props.onComponentClick,
          hasAddItem = _props.hasAddItem,
          screenKey = _props.screenKey;
      var addItem = this.addItem,
          removeItem = this.removeItem;

      console.log(this.props);
      var transFormedProps = (0, _extends3.default)({}, this.props, {
        tabs: this.props.tabs.map(function (tab, key) {
          return (0, _extends3.default)({}, tab, {
            tabContent: _react2.default.createElement(_RenderScreen2.default, {
              key: key,
              screenKey: screenKey,
              components: tab.tabContent,
              uiFramework: uiFramework,
              onFieldChange: onFieldChange,
              onComponentClick: onComponentClick
            })
          });
        })
      });
      console.log(transFormedProps);
      return _react2.default.createElement(
        _Div2.default,
        null,
        _react2.default.createElement(_CustomTab2.default, transFormedProps)
      );
    }
  }]);
  return MultiItem;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var screenConfig = screenConfiguration.screenConfig,
      preparedFinalObject = screenConfiguration.preparedFinalObject;

  return { screenConfig: screenConfig, preparedFinalObject: preparedFinalObject, state: state };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return null;
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MultiItem);
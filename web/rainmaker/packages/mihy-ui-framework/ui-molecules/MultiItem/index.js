"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _Div = require("../../ui-atoms/HtmlElements/Div");

var _Div2 = _interopRequireDefault(_Div);

var _RenderScreen = require("../RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _Container = require("../../ui-atoms/Layout/Container");

var _Container2 = _interopRequireDefault(_Container);

var _Item = require("../../ui-atoms/Layout/Item");

var _Item2 = _interopRequireDefault(_Item);

var _Button = require("../../ui-atoms/Button");

var _Button2 = _interopRequireDefault(_Button);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Icon = require("../../ui-atoms/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("../../ui-utils");

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
      var items = _this.props.items;

      if (!items.length) {
        _this.addItem();
      }
    }, _this.addItem = function () {
      var _this$props = _this.props,
          addItem = _this$props.onFieldChange,
          screenKey = _this$props.screenKey,
          scheama = _this$props.scheama,
          componentJsonpath = _this$props.componentJsonpath,
          headerName = _this$props.headerName,
          headerJsonPath = _this$props.headerJsonPath,
          screenConfig = _this$props.screenConfig;

      var items = (0, _get2.default)(screenConfig, screenKey + "." + componentJsonpath + ".props.items");
      var itemsLength = items.length;
      (0, _set2.default)(scheama, headerJsonPath, headerName + " - " + (itemsLength + 1));
      addItem(screenKey, componentJsonpath, "props.items[" + itemsLength + "]", JSON.parse(JSON.stringify((0, _uiUtils.addComponentJsonpath)((0, _defineProperty3.default)({}, "item" + itemsLength, scheama), componentJsonpath + ".props.items[" + itemsLength + "]"))));
    }, _this.removeItem = function (index) {
      var _this$props2 = _this.props,
          removeItem = _this$props2.onFieldChange,
          screenKey = _this$props2.screenKey,
          componentJsonpath = _this$props2.componentJsonpath,
          screenConfig = _this$props2.screenConfig;

      var items = (0, _get2.default)(screenConfig, screenKey + "." + componentJsonpath + ".props.items");
      items.splice(index, 1);
      removeItem(screenKey, componentJsonpath, "props.items", items);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultiItem, [{
    key: "render",
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

      return _react2.default.createElement(
        _Div2.default,
        null,
        items.length > 0 && items.map(function (item, key) {
          console.log(item);
          return _react2.default.createElement(
            _Div2.default,
            { key: key },
            items.length > 1 && _react2.default.createElement(
              _Container2.default,
              null,
              _react2.default.createElement(
                _Item2.default,
                { xs: 12, align: "right" },
                _react2.default.createElement(
                  _IconButton2.default,
                  { style: { marginBottom: "-105px", width: "40px", height: "40px" }, onClick: function onClick(e) {
                      return removeItem(key);
                    }, "aria-label": "Remove" },
                  _react2.default.createElement(_Icon2.default, { iconName: "clear" })
                )
              )
            ),
            _react2.default.createElement(_RenderScreen2.default, {
              screenKey: screenKey,
              components: item,
              uiFramework: uiFramework,
              onFieldChange: onFieldChange,
              onComponentClick: onComponentClick
            })
          );
        }),
        hasAddItem !== false && _react2.default.createElement(
          _Container2.default,
          { style: { marginTop: "8px" } },
          _react2.default.createElement(
            _Item2.default,
            { xs: 12, align: "right" },
            _react2.default.createElement(
              _Button2.default,
              { onClick: function onClick(e) {
                  return addItem();
                }, color: "primary" },
              _react2.default.createElement(_Icon2.default, { iconName: "add" }),
              addItemLabel
            )
          )
        )
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
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MultiItem);
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

var _RenderScreen = require("../../ui-molecules/RenderScreen");

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

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _uiUtils = require("../../ui-utils");

var _actions = require("../../ui-redux/screen-configuration/actions");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkActiveItems = function checkActiveItems(items) {
  var count = 0;
  for (var i = 0; i < items.length; i++) {
    if (checkActiveItem(items[i])) count++;
  }
  return count;
};

var checkActiveItem = function checkActiveItem(item) {
  return item && (item.isDeleted === undefined || item.isDeleted !== false);
};

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
      _this.initMultiItem(_this.props);
    }, _this.initMultiItem = function (props) {
      var items = props.items,
          sourceJsonPath = props.sourceJsonPath,
          preparedFinalObject = props.preparedFinalObject;

      var editItems = (0, _get2.default)(preparedFinalObject, sourceJsonPath, []);
      if (editItems) {
        if (!items.length && !editItems.length) {
          _this.addItem();
        } else {
          if (items.length < editItems.length) {
            for (var i = 0; i < editItems.length; i++) {
              if (checkActiveItem(editItems[i])) {
                if (i) {
                  _this.addItem();
                } else {
                  _this.addItem(true);
                }
                // this.addItem(true);
              }
            }
          }
        }
      }
    }, _this.objectToDropdown = function (object) {
      var dropDown = [];
      for (var variable in object) {
        if (object.hasOwnProperty(variable)) {
          dropDown.push({ code: variable });
        }
      }
      return dropDown;
    }, _this.addItem = function () {
      var isNew = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props = _this.props,
          addItemToState = _this$props.onFieldChange,
          screenKey = _this$props.screenKey,
          scheama = _this$props.scheama,
          sourceJsonPath = _this$props.sourceJsonPath,
          prefixSourceJsonPath = _this$props.prefixSourceJsonPath,
          afterPrefixJsonPath = _this$props.afterPrefixJsonPath,
          componentJsonpath = _this$props.componentJsonpath,
          headerName = _this$props.headerName,
          headerJsonPath = _this$props.headerJsonPath,
          screenConfig = _this$props.screenConfig,
          preparedFinalObject = _this$props.preparedFinalObject;

      var items = isNew ? [] : (0, _get2.default)(screenConfig, screenKey + "." + componentJsonpath + ".props.items", []);
      var itemsLength = items.length;
      (0, _set2.default)(scheama, headerJsonPath, headerName + " - " + (itemsLength + 1));
      if (sourceJsonPath) {
        var multiItemContent = (0, _get2.default)(scheama, prefixSourceJsonPath, {});
        for (var variable in multiItemContent) {
          if (multiItemContent.hasOwnProperty(variable) && multiItemContent[variable].props && multiItemContent[variable].props.jsonPath) {
            var prefixJP = multiItemContent[variable].props.jsonPathUpdatePrefix ? multiItemContent[variable].props.jsonPathUpdatePrefix : sourceJsonPath;
            var splitedJsonPath = multiItemContent[variable].props.jsonPath.split(prefixJP);
            if (splitedJsonPath.length > 1) {
              var propertyName = splitedJsonPath[1].split("]");
              if (propertyName.length > 1) {
                multiItemContent[variable].jsonPath = prefixJP + "[" + itemsLength + "]" + propertyName[1];
                multiItemContent[variable].props.jsonPath = prefixJP + "[" + itemsLength + "]" + propertyName[1];
                multiItemContent[variable].index = itemsLength;
              }
            }
            //Temporary fix - For setting trade type - should be generalised
            var value = (0, _get2.default)(preparedFinalObject, multiItemContent[variable].props.jsonPath);
            if (multiItemContent[variable].props.setDataInField && value) {
              if (multiItemContent[variable].props.jsonPath.split(".")[0] === "LicensesTemp" && multiItemContent[variable].props.jsonPath.split(".").pop() === "tradeType") {
                var tradeTypeData = (0, _get2.default)(preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
                var tradeTypeDropdownData = tradeTypeData && tradeTypeData.TradeType && Object.keys(tradeTypeData.TradeType).map(function (item) {
                  return { code: item, active: true };
                });
                multiItemContent[variable].props.data = tradeTypeDropdownData;
                var data = tradeTypeData[value];
                if (data) {
                  multiItemContent["tradeType"].props.data = _this.objectToDropdown(data);
                }
              } else if (multiItemContent[variable].props.jsonPath.split(".").pop() === "tradeType") {
                var _data = (0, _get2.default)(preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType." + value.split(".")[0] + "." + value.split(".")[1]);
                if (_data) {
                  multiItemContent[variable].props.data = _data;
                }
              } else if (multiItemContent[variable].props.jsonPath.split(".").pop() === "uomValue" && value > 0) {
                multiItemContent[variable].props.disabled = false;
                multiItemContent[variable].props.required = true;
              }
            }
            if (multiItemContent[variable].props.setDataInField && multiItemContent[variable].props.disabled) {
              if (multiItemContent[variable].props.jsonPath.split(".").pop() === "uomValue") {
                var disabledValue = (0, _get2.default)(screenConfig[screenKey], multiItemContent[variable].componentJsonpath + ".props.disabled", true);
                multiItemContent[variable].props.disabled = disabledValue;
              }
            }
          } else if (afterPrefixJsonPath && multiItemContent.hasOwnProperty(variable) && (0, _get2.default)(multiItemContent[variable], afterPrefixJsonPath + ".props") && (0, _get2.default)(multiItemContent[variable], afterPrefixJsonPath + ".props.jsonPath")) {
            var _splitedJsonPath = (0, _get2.default)(multiItemContent[variable], afterPrefixJsonPath + ".props.jsonPath").split(sourceJsonPath);
            if (_splitedJsonPath.length > 1) {
              var _propertyName = _splitedJsonPath[1].split("]");
              if (_propertyName.length > 1) {
                (0, _set2.default)(multiItemContent[variable], afterPrefixJsonPath + ".props.jsonPath", sourceJsonPath + "[" + itemsLength + "]" + _propertyName[1]);
              }
            }
          }
        }
        (0, _set2.default)(scheama, prefixSourceJsonPath, multiItemContent);
      }
      items[itemsLength] = (0, _cloneDeep2.default)((0, _uiUtils.addComponentJsonpath)((0, _defineProperty3.default)({}, "item" + itemsLength, scheama), componentJsonpath + ".props.items[" + itemsLength + "]"));
      addItemToState(screenKey, componentJsonpath, "props.items", items);
    }, _this.removeItem = function (index) {
      var _this$props2 = _this.props,
          removeItem = _this$props2.onFieldChange,
          screenKey = _this$props2.screenKey,
          componentJsonpath = _this$props2.componentJsonpath,
          screenConfig = _this$props2.screenConfig,
          updatePreparedFormObject = _this$props2.updatePreparedFormObject,
          sourceJsonPath = _this$props2.sourceJsonPath;

      var items = (0, _get2.default)(screenConfig, screenKey + "." + componentJsonpath + ".props.items");
      updatePreparedFormObject(sourceJsonPath + "[" + index + "].isDeleted", false);
      items[index].isDeleted = false;
      // items.splice(index,1);
      removeItem(screenKey, componentJsonpath, "props.items", items);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultiItem, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(nextProps, this.props)) {
        this.initMultiItem(nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          items = _props.items,
          scheama = _props.scheama,
          addItemLabel = _props.addItemLabel,
          id = _props.id,
          uiFramework = _props.uiFramework,
          onFieldChange = _props.onFieldChange,
          onComponentClick = _props.onComponentClick,
          hasAddItem = _props.hasAddItem,
          screenKey = _props.screenKey,
          isReviewPage = _props.isReviewPage;
      var addItem = this.addItem,
          removeItem = this.removeItem;

      return _react2.default.createElement(
        _Div2.default,
        null,
        items.length > 0 && items.map(function (item, key) {
          if (checkActiveItem(item)) {
            return _react2.default.createElement(
              _Div2.default,
              { key: key },
              checkActiveItems(items) > 1 && !isReviewPage && _react2.default.createElement(
                _Container2.default,
                null,
                _react2.default.createElement(
                  _Item2.default,
                  { xs: 12, align: "right" },
                  _react2.default.createElement(
                    _IconButton2.default,
                    {
                      style: {
                        marginBottom: "-105px",
                        width: "40px",
                        height: "40px"
                      },
                      onClick: function onClick(e) {
                        return removeItem(key);
                      },
                      "aria-label": "Remove"
                    },
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
          }
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
  return {
    updatePreparedFormObject: function updatePreparedFormObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MultiItem);
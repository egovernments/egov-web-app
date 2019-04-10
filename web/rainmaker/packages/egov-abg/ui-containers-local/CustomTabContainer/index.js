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

var _RenderScreen = require("egov-ui-framework/ui-molecules/RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _CustomTab = require("../../ui-molecules-local/CustomTab");

var _CustomTab2 = _interopRequireDefault(_CustomTab);

var _reactRedux = require("react-redux");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MultiItem.__proto__ || Object.getPrototypeOf(MultiItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tabIndex: 0
    }, _this.fieldsToReset = ["ReceiptTemp[0].Bill[0].payer", "ReceiptTemp[0].Bill[0].paidBy", "ReceiptTemp[0].Bill[0].payerMobileNumber", "ReceiptTemp[0].instrument.transactionNumber", "ReceiptTemp[0].instrument.transactionDateInput", "ReceiptTemp[0].instrument.ifscCode", "ReceiptTemp[0].instrument.instrumentNumber", "ReceiptTemp[0].instrument.transactionNumberConfirm", "ReceiptTemp[0].instrument.bank.name", "ReceiptTemp[0].instrument.branchName"], _this.resetAllFields = function (children, dispatch, state) {
      for (var child in children) {
        if (children[child].children) {
          for (var innerChild in children[child].children) {
            if ((0, _get2.default)(state.screenConfiguration.screenConfig["pay"], children[child].children[innerChild].componentJsonpath + ".props.value")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "props.value", ""));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "props.error", false));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "isFieldValid", true));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", children[child].children[innerChild].componentJsonpath, "props.helperText", ""));
            }
          }
        }
      }
    }, _this.resetFields = function (dispatch, state) {
      // dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].payer", ""));
      // dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].paidBy", ""));
      // dispatch(
      //   prepareFinalObject("ReceiptTemp[0].Bill[0].payerMobileNumber", "")
      // );
      // dispatch(prepareFinalObject("ReceiptTemp[0].instrument", {}));
      if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.bank.name") && (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.branchName")) {
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.bank.name", ""));
        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.branchName", ""));
      } // Has to manually clear bank name and branch
      var keyToIndexMapping = [{
        index: 0,
        key: "cash"
      }, {
        index: 1,
        key: "cheque"
      }, {
        index: 2,
        key: "demandDraft"
      }, {
        index: 3,
        key: "card"
      }];

      keyToIndexMapping.forEach(function (item) {
        var objectJsonPath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + item.index + "].tabContent[" + item.key + "].children";
        var children = (0, _get2.default)(state.screenConfiguration.screenConfig["pay"], objectJsonPath, {});
        _this.resetAllFields(children, dispatch, state);
      });
    }, _this.setInstrumentType = function (value, dispatch) {
      dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", value));
    }, _this.onTabChange = function (tabIndex, dispatch, state) {
      _this.resetFields(dispatch, state);
      switch (tabIndex) {
        case 0:
          _this.setInstrumentType("Cash", dispatch);
          break;
        case 1:
          _this.setInstrumentType("Cheque", dispatch);
          break;
        case 2:
          _this.setInstrumentType("DD", dispatch);
          break;
        case 3:
          _this.setInstrumentType("Card", dispatch);
          break;
        default:
          _this.setInstrumentType("Cash", dispatch);
          break;
      }
    }, _this.onTabClick = function (tabIndex) {
      var _this$props = _this.props,
          state = _this$props.state,
          dispatch = _this$props.dispatch;

      _this.onTabChange(tabIndex, dispatch, state);
      _this.setState({ tabIndex: tabIndex });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MultiItem, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          uiFramework = _props.uiFramework,
          onFieldChange = _props.onFieldChange,
          onComponentClick = _props.onComponentClick,
          screenKey = _props.screenKey,
          componentJsonpath = _props.componentJsonpath;
      var onTabClick = this.onTabClick;


      var transFormedProps = (0, _extends3.default)({}, this.props, {
        tabs: this.props.tabs.map(function (tab, key) {
          return (0, _extends3.default)({}, tab, {
            tabContent: _react2.default.createElement(_RenderScreen2.default, {
              key: key,
              screenKey: screenKey,
              components: (0, _cloneDeep2.default)((0, _commons.addComponentJsonpath)(tab.tabContent, componentJsonpath + ".props.tabs[" + key + "].tabContent")),
              uiFramework: uiFramework,
              onFieldChange: onFieldChange,
              onComponentClick: onComponentClick
            })
          });
        })
      });
      return _react2.default.createElement(_CustomTab2.default, (0, _extends3.default)({ handleClick: onTabClick }, transFormedProps));
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

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MultiItem);
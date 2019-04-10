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

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _styles = require("@material-ui/core/styles");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _reactRedux = require("react-redux");

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      marginBottom: 8
    },
    container: {
      paddingBottom: 10
    }
  };
};

var closebuttonStyle = {
  width: "25px",
  height: "25px",
  color: "#767676"
};

var closeIcon = "close";

var getMultiItem = function getMultiItem(billingslabData, classes, style) {
  return billingslabData.map(function (item, index) {
    return _react2.default.createElement(
      _Grid2.default,
      { sm: 12, className: classes.container, container: true },
      _react2.default.createElement(
        _Grid2.default,
        { sm: 10 },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelKey: "TL_" + item.category,
          style: {
            color: "rgba(0, 0, 0, 0.6000000238418579)",
            fontSize: "14px",
            fontWeigt: 400,
            lineSpacing: "17px"
          }
        })
      ),
      _react2.default.createElement(
        _Grid2.default,
        { sm: 2 },
        _react2.default.createElement(_uiAtoms.Label, {
          label: "Rs " + item.rate,
          style: {
            color: "rgba(0, 0, 0, 0.8700000047683716)",
            fontSize: "14px",
            fontWeigt: 400,
            lineSpacing: "17px"
          }
        })
      )
    );
  });
};

var ViewBreakupContainer = function (_React$Component) {
  (0, _inherits3.default)(ViewBreakupContainer, _React$Component);

  function ViewBreakupContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ViewBreakupContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ViewBreakupContainer.__proto__ || Object.getPrototypeOf(ViewBreakupContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      style: {
        color: "rgba(0, 0, 0, 0.8700000047683716)",
        fontSize: "20px",
        fontWeigt: 500,
        lineSpacing: "28px",
        marginTop: 25
      }
    }, _this.getGridItem = function (total, classes, style) {
      return _react2.default.createElement(
        _Grid2.default,
        { sm: 12, className: classes.container, container: true },
        _react2.default.createElement(
          _Grid2.default,
          { sm: 10 },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: "Total",
            labelKey: "PT_FORM4_TOTAL",
            style: style ? style : {
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              fontSize: "14px",
              fontWeigt: 400,
              lineSpacing: "17px"
            }
          })
        ),
        _react2.default.createElement(
          _Grid2.default,
          { sm: 2 },
          _react2.default.createElement(_uiAtoms.Label, {
            label: "Rs " + total,
            style: style ? style : {
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              fontSize: "14px",
              fontWeigt: 400,
              lineSpacing: "17px"
            }
          })
        )
      );
    }, _this.handleClose = function () {
      var screenKey = _this.props.screenKey;

      _this.props.handleField(screenKey, "components.breakUpDialog", "props.open", false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ViewBreakupContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          tradeUnitData = _props.tradeUnitData,
          accessoriesUnitData = _props.accessoriesUnitData,
          tradeTotal = _props.tradeTotal,
          accessoriesTotal = _props.accessoriesTotal,
          classes = _props.classes;
      var style = this.state.style;
      var getGridItem = this.getGridItem,
          handleClose = this.handleClose;

      var totalBill = tradeTotal + accessoriesTotal;
      return _react2.default.createElement(_Dialog2.default, {
        open: open,
        onClose: handleClose,
        fullWidth: true,
        children: [accessoriesTotal > 0 || tradeTotal > 0 ? _react2.default.createElement(
          "div",
          { style: { padding: "16px" } },
          _react2.default.createElement(
            "div",
            {
              onClick: handleClose,
              style: { float: "right", cursor: "pointer" }
            },
            _react2.default.createElement(
              _Icon2.default,
              { style: closebuttonStyle },
              " ",
              _react2.default.createElement(
                "i",
                { "class": "material-icons" },
                closeIcon,
                " "
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { style: { paddingBottom: "16px", paddingTop: "8px" } },
            _react2.default.createElement(_uiAtoms.Label, {
              label: "Calculation Breakup",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "20px",
                fontWeigt: 500,
                lineSpacing: "28px"
              }
            })
          ),
          tradeUnitData && tradeUnitData.length > 0 && _react2.default.createElement(
            "div",
            { style: { paddingBottom: "12px" } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelName: "Trade Unit",
              labelKey: "TL_NEW_TRADE_DETAILS_TRADE_UNIT_HEADER",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "16px",
                fontWeigt: 400,
                lineSpacing: "19px"
              }
            })
          ),
          tradeUnitData && tradeUnitData.length > 0 && getMultiItem(tradeUnitData, classes),
          _react2.default.createElement(_Divider2.default, { className: classes.root }),
          tradeUnitData && tradeUnitData.length > 0 && getGridItem(tradeTotal, classes),
          accessoriesUnitData && accessoriesUnitData.length > 0 && _react2.default.createElement(
            "div",
            { style: { paddingBottom: "12px", marginTop: 20 } },
            _react2.default.createElement(_uiAtoms.Label, {
              label: "Accessory Unit",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "16px",
                fontWeigt: 400,
                lineSpacing: "19px"
              }
            })
          ),
          accessoriesUnitData && accessoriesUnitData.length > 0 && getMultiItem(accessoriesUnitData, classes),
          _react2.default.createElement(_Divider2.default, { className: classes.root }),
          accessoriesUnitData && accessoriesUnitData.length > 0 && getGridItem(accessoriesTotal, classes),
          accessoriesUnitData && accessoriesUnitData.length > 0 && getGridItem(totalBill, classes, style)
        ) : _react2.default.createElement(
          "div",
          { style: { padding: "16px", width: "500px" } },
          _react2.default.createElement(
            "div",
            { style: { paddingBottom: "16px" } },
            _react2.default.createElement(_uiAtoms.Label, {
              label: "Calculation Breakup",
              style: {
                color: "rgba(0, 0, 0, 0.8700000047683716)",
                fontSize: "20px",
                fontWeigt: 500,
                lineSpacing: "28px"
              }
            })
          ),
          getGridItem(totalBill, classes, style)
        )]
      });
    }
  }]);
  return ViewBreakupContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;
  var screenKey = ownProps.screenKey;
  var screenConfig = screenConfiguration.screenConfig,
      preparedFinalObject = screenConfiguration.preparedFinalObject;

  var accessoriesUnitData = (0, _get2.default)(preparedFinalObject, "LicensesTemp[0].billingSlabData.accessoriesUnitData");
  var tradeUnitData = (0, _get2.default)(preparedFinalObject, "LicensesTemp[0].billingSlabData.tradeUnitData");
  var tradeTotal = (0, _get2.default)(preparedFinalObject, "LicensesTemp[0].billingSlabData.tradeTotal");
  var accessoriesTotal = (0, _get2.default)(preparedFinalObject, "LicensesTemp[0].billingSlabData.accessoriesTotal");

  var open = (0, _get2.default)(screenConfig, screenKey + ".components.breakUpDialog.props.open");

  return {
    open: open,
    tradeUnitData: tradeUnitData,
    accessoriesUnitData: accessoriesUnitData,
    tradeTotal: tradeTotal,
    accessoriesTotal: accessoriesTotal,
    screenKey: screenKey,
    screenConfig: screenConfig
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { handleField: function handleField(a, b, c, d) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(a, b, c, d));
    } };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewBreakupContainer));
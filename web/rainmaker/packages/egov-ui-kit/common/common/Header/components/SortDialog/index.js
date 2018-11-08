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

var _reactRedux = require("react-redux");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _actions = require("egov-ui-kit/redux/complaints/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  logoutContentStyle: { textAlign: "center", padding: "24px 20px" },

  labelStyle: {
    fontSize: "16px",
    fontWeight: "normal",
    color: "#767676",
    letterSpacing: "0.3px",
    marginBottom: "26px"
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px"
  },
  selectedLabelStyle: {
    color: "#fe7a51"
  },
  radioButtonLabelStyle: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#767676",
    letterSpacing: "0.3px"
  }
};

var options = [{ value: "Old to New", label: _react2.default.createElement(_translationNode2.default, { label: "CS_SORT_OPTION_ONE" }) }, { value: "New to old", label: _react2.default.createElement(_translationNode2.default, { label: "CS_SORT_OPTION_TWO" }) }, { value: "SLA", label: _react2.default.createElement(_translationNode2.default, { label: "CS_SORT_OPTION_THREE" }) }];

var SortDialog = function (_Component) {
  (0, _inherits3.default)(SortDialog, _Component);

  function SortDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SortDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SortDialog.__proto__ || Object.getPrototypeOf(SortDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      actions: [_react2.default.createElement(_components.Button, {
        id: "logout-no-button",
        className: "logout-no-button",
        label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_LOGOUTPOPUP_CANCEL", color: "#FE7A51" }),
        backgroundColor: "#fff",
        style: { boxShadow: "none" }
      }), _react2.default.createElement(_components.Button, {
        id: "logout-yes-button",
        className: "logout-yes-button",
        label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "OK", color: "#FE7A51" }),
        backgroundColor: "#fff",
        onclick: function onclick() {
          (0, _actions.getComplaintDisplayOrder)(_this.state.valueSelected);
        },
        style: { boxShadow: "none" }
      })],
      valueSelected: ""
    }, _this.handleChange = function (event, value) {
      _this.setState({ valueSelected: value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SortDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          closeSortDialog = _props.closeSortDialog,
          sortPopOpen = _props.sortPopOpen,
          getComplaintDisplayOrder = _props.getComplaintDisplayOrder;
      var handleChange = this.handleChange,
          onConfirmClick = this.onConfirmClick;


      return _react2.default.createElement(_components.Dialog, {
        open: sortPopOpen,
        title: _react2.default.createElement(_translationNode2.default, {
          label: "Sort By",
          bold: true,
          color: "rgba(0, 0, 0, 0.8700000047683716)",
          fontSize: "20px",
          labelStyle: { padding: "16px 0px 0px 24px" }
        }),
        children: [_react2.default.createElement(
          "div",
          { style: { paddingTop: "22px", paddingLeft: "8px" } },
          _react2.default.createElement(_components.RadioButton, {
            id: "sortcomplaint-radio-button",
            name: "sortcomplaint-radio-button",
            valueSelected: this.state.valueSelected,
            options: options,
            handleChange: handleChange,
            radioButtonItemStyle: styles.radioButtonItemStyle,
            labelStyle: styles.radioButtonLabelStyle,
            selectedLabelStyle: styles.selectedLabelStyle
          })
        )],
        handleClose: closeSortDialog,
        actions: [_react2.default.createElement(_components.Button, {
          id: "logout-no-button",
          className: "logout-no-button",
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_LOGOUTPOPUP_CANCEL", color: "#FE7A51" }),
          backgroundColor: "#fff",
          onClick: closeSortDialog,
          style: { boxShadow: "none" }
        }), _react2.default.createElement(_components.Button, {
          id: "logout-yes-button",
          className: "logout-yes-button",
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "OK", color: "#FE7A51" }),
          backgroundColor: "#fff",
          onClick: function onClick() {
            getComplaintDisplayOrder(_this2.state.valueSelected);
            closeSortDialog();
          },
          style: { boxShadow: "none" }
        })],
        contentClassName: "logout-popup",
        contentStyle: { width: "90%" },
        isClose: true
      });
    }
  }]);
  return SortDialog;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getComplaintDisplayOrder: function getComplaintDisplayOrder(order) {
      return dispatch((0, _actions.getComplaintDisplayOrder)(order));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(SortDialog);
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

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogTitle = require("@material-ui/core/DialogTitle");

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogContent = require("@material-ui/core/DialogContent");

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogActions = require("@material-ui/core/DialogActions");

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogTitle = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderBottom: "1px solid " + theme.palette.divider,
      margin: 0,
      padding: theme.spacing.unit * 2
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500]
    }
  };
})(function (props) {
  var children = props.children,
      classes = props.classes,
      onClose = props.onClose;

  return _react2.default.createElement(
    _DialogTitle2.default,
    { disableTypography: true, className: classes.root },
    _react2.default.createElement(
      _Typography2.default,
      { variant: "h1" },
      children
    ),
    onClose ? _react2.default.createElement(
      _IconButton2.default,
      {
        "aria-label": "Close",
        className: classes.closeButton,
        onClick: onClose
      },
      _react2.default.createElement(_Close2.default, null)
    ) : null
  );
});

var DialogContent = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing.unit * 2
    }
  };
})(_DialogContent2.default);

var DialogActions = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderTop: "1px solid " + theme.palette.divider,
      margin: 0,
      padding: theme.spacing.unit
    }
  };
})(_DialogActions2.default);

var RequiredDocumentsContainer = function (_React$Component) {
  (0, _inherits3.default)(RequiredDocumentsContainer, _React$Component);

  function RequiredDocumentsContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequiredDocumentsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequiredDocumentsContainer.__proto__ || Object.getPrototypeOf(RequiredDocumentsContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
      var screenKey = _this.props.screenKey;

      _this.props.handleField(screenKey, "components.requiredDocumentsDialog", "props.open", false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequiredDocumentsContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          preparedFinalObject = _props.preparedFinalObject;

      return _react2.default.createElement(
        _Dialog2.default,
        { onClose: this.handleClose, open: true },
        _react2.default.createElement(
          DialogTitle,
          { onClose: this.handleClose },
          _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "ASDASDASDSAD" })
        ),
        _react2.default.createElement(
          DialogContent,
          null,
          _react2.default.createElement(
            _Typography2.default,
            { gutterBottom: true },
            "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
          ),
          _react2.default.createElement(
            _Typography2.default,
            { gutterBottom: true },
            "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
          ),
          _react2.default.createElement(
            _Typography2.default,
            { gutterBottom: true },
            "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."
          )
        ),
        _react2.default.createElement(
          DialogActions,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose, color: "primary" },
            "Save changes"
          )
        )
      );
    }
  }]);
  return RequiredDocumentsContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;
  var screenKey = ownProps.screenKey,
      open = ownProps.open;
  var screenConfig = screenConfiguration.screenConfig,
      preparedFinalObject = screenConfiguration.preparedFinalObject;

  // const open = get(
  //   screenConfig,
  //   `${screenKey}.components.breakUpDialog.props.open`
  // );

  return {
    open: open,
    screenKey: screenKey,
    screenConfig: screenConfig,
    preparedFinalObject: preparedFinalObject
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { handleField: function handleField(a, b, c, d) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(a, b, c, d));
    } };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RequiredDocumentsContainer);
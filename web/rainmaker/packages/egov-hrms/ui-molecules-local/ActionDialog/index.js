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

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require("@material-ui/core/DialogActions");

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require("@material-ui/core/DialogContent");

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogTitle = require("@material-ui/core/DialogTitle");

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Select = require("@material-ui/core/Select");

var _Select2 = _interopRequireDefault(_Select);

var _InputLabel = require("@material-ui/core/InputLabel");

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _Input = require("@material-ui/core/Input");

var _Input2 = _interopRequireDefault(_Input);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {
  title: "Deactivate Employee",
  content: {
    dropdown: {
      text: "Reason for Deactivation",
      items: [{ value: "ASD", label: "Asd" }, { value: "OTHERS", label: "Others" }]
    },
    datepicker: true,
    textInput1: {
      text: "Order No.",
      placeholder: "Enter Order No."
    },
    fileupload: true,
    textInput2: {
      text: "Remarks",
      placeholder: "Enter Remarks"
    }
  }
};

var styles = function styles(theme) {
  return {
    formControl: {
      minWidth: 400,
      width: "100%"
    },
    textField: {
      marginTop: 20,
      width: "100%"
    }
  };
};

var ActionDialog = function (_React$Component) {
  (0, _inherits3.default)(ActionDialog, _React$Component);

  function ActionDialog() {
    (0, _classCallCheck3.default)(this, ActionDialog);
    return (0, _possibleConstructorReturn3.default)(this, (ActionDialog.__proto__ || Object.getPrototypeOf(ActionDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActionDialog, [{
    key: "deactivateEmployeeClick",
    value: function deactivateEmployeeClick() {
      console.log("DEACTIVATE EMPLOYEE!");
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          open = _props.open,
          onFieldChange = _props.onFieldChange,
          screenKey = _props.screenKey,
          componentJsonpath = _props.componentJsonpath;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _Dialog2.default,
          {
            open: open,
            onClose: function onClose() {
              return onFieldChange(screenKey, componentJsonpath, "props.open", false);
            },
            "aria-labelledby": "alert-dialog-title",
            "aria-describedby": "alert-dialog-description"
          },
          _react2.default.createElement(
            _DialogTitle2.default,
            { id: "alert-dialog-title" },
            data.title
          ),
          _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
              _FormControl2.default,
              { className: classes.formControl, required: "true" },
              _react2.default.createElement(
                _InputLabel2.default,
                { shrink: true, htmlFor: "age-label-placeholder" },
                data.content.dropdown.text
              ),
              _react2.default.createElement(
                _Select2.default,
                {
                  onChange: this.handleChange,
                  input: _react2.default.createElement(_Input2.default, { name: "age", id: "age-label-placeholder" }),
                  displayEmpty: true,
                  name: "age",
                  className: classes.selectEmpty
                },
                data.content.dropdown.items.map(function (item) {
                  return _react2.default.createElement(
                    _MenuItem2.default,
                    { value: item.value },
                    item.label
                  );
                })
              )
            ),
            _react2.default.createElement(_TextField2.default, {
              id: "date",
              label: "Date",
              type: "date",
              className: classes.textField,
              required: "true",
              InputLabelProps: {
                shrink: true
              }
            }),
            _react2.default.createElement(_TextField2.default, {
              id: "order",
              label: "Order No.",
              placeholder: "Enter Remarks",
              className: classes.textField,
              InputLabelProps: {
                shrink: true
              }
            }),
            _react2.default.createElement(
              _Typography2.default,
              { className: classes.textField },
              "Supporting Documents"
            ),
            _react2.default.createElement(
              _Typography2.default,
              { variant: "caption", gutterBottom: true },
              "Only .jpg and .pdf files. 5MB max file size."
            ),
            _react2.default.createElement(
              _Button2.default,
              { variant: "outlined", className: classes.button },
              "UPLOAD FILE"
            ),
            _react2.default.createElement(_TextField2.default, {
              id: "remarks",
              label: "Remarks",
              placeholder: "Enter Remarks",
              className: classes.textField,
              InputLabelProps: {
                shrink: true
              }
            })
          ),
          _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
              _Button2.default,
              {
                onClick: this.deactivateEmployeeClick,
                color: "primary",
                variant: "contained"
              },
              "DEACTIVATE EMPLOYEE"
            )
          )
        )
      );
    }
  }]);
  return ActionDialog;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(ActionDialog);
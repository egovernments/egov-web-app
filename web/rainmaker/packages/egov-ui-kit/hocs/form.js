"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/form/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = function form(_ref) {
  var formKey = _ref.formKey,
      path = _ref.path,
      copyName = _ref.copyName,
      rowData = _ref.rowData,
      isCoreConfiguration = _ref.isCoreConfiguration,
      _ref$edit = _ref.edit,
      edit = _ref$edit === undefined ? false : _ref$edit,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["formKey", "path", "copyName", "rowData", "isCoreConfiguration", "edit"]);
  return function (Form) {
    var FormWrapper = function (_React$Component) {
      (0, _inherits3.default)(FormWrapper, _React$Component);

      function FormWrapper(props) {
        (0, _classCallCheck3.default)(this, FormWrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FormWrapper.__proto__ || Object.getPrototypeOf(FormWrapper)).call(this, props));

        _this.createCopy = function (formConf) {
          var updatedFormConf = (0, _extends4.default)({}, formConf);
          var _updatedFormConf = updatedFormConf,
              formatConfig = _updatedFormConf.formatConfig;

          updatedFormConf.name = copyName;
          formKey = updatedFormConf.name;
          if (formatConfig) {
            updatedFormConf = formatConfig((0, _extends4.default)({}, _this.props, rest, { config: updatedFormConf }));
          }
          return updatedFormConf;
        };

        _this.submitForm = function () {
          var form = _this.props.form;

          var saveUrl = edit ? form.editUrl : form.saveUrl;
          _this.props.submitForm(formKey, saveUrl);
        };

        _this.handleFieldChange = function (fieldKey, value) {
          _this.props.handleFieldChange(formKey, fieldKey, value);
        };

        var extraFields = rest.extraFields;

        try {
          if (isCoreConfiguration && path) {
            _this.formConfig = require("egov-ui-kit/config/forms/specs/" + path + "/" + formKey).default;
          } else if (path) {
            _this.formConfig = require("config/forms/specs/" + path + "/" + formKey).default;
          } else {
            _this.formConfig = require("config/forms/specs/" + formKey).default;
          }
          if (extraFields) {
            _this.formConfig = (0, _extends4.default)({}, _this.formConfig, (0, _defineProperty3.default)({}, "fields", (0, _extends4.default)({}, _this.formConfig.fields, extraFields)));
          }
        } catch (error) {
          // the error is assumed to have occured due to absence of config; so ignore it!
        }
        return _this;
      }

      (0, _createClass3.default)(FormWrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (this.formConfig && copyName) {
            var formConf = (0, _extends4.default)({}, this.formConfig);
            formConf = this.createCopy(formConf);
            this.props.initForm(formConf, rowData);
          } else {
            this.formConfig && this.props.initForm(this.formConfig, rowData);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var handleFieldChange = this.handleFieldChange,
              submitForm = this.submitForm;
          var loading = this.props.loading;

          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "form",
              {
                onSubmit: function onSubmit(e) {
                  e.preventDefault();
                  submitForm();
                }
              },
              _react2.default.createElement(Form, (0, _extends4.default)({}, this.props, { formKey: formKey, submitForm: submitForm, handleFieldChange: handleFieldChange }))
            ),
            loading && _react2.default.createElement(_components.LoadingIndicator, null)
          );
        }
      }]);
      return FormWrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var form = state.form[formKey] || {};
      var formKeys = Object.keys(state.form);

      var _ref2 = form || false,
          loading = _ref2.loading;

      return { form: form, formKeys: formKeys, loading: loading };
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return {
        handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
          return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
        },
        submitForm: function submitForm(formKey, saveUrl) {
          return dispatch((0, _actions.submitForm)(formKey, saveUrl));
        },
        initForm: function initForm(form) {
          return dispatch((0, _actions.initForm)(form));
        },
        deleteForm: function deleteForm() {
          return dispatch((0, _actions.deleteForm)(formKey));
        }
      };
    };

    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormWrapper);
  };
};

exports.default = form;
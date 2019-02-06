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

var _uiAtomsLocal = require("../../ui-atoms-local");

var _styles = require("@material-ui/core/styles");

var _commons = require("../../ui-utils/commons");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none"
    }
  };
};

var UploadMultipleFiles = function (_Component) {
  (0, _inherits3.default)(UploadMultipleFiles, _Component);

  function UploadMultipleFiles() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UploadMultipleFiles);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UploadMultipleFiles.__proto__ || Object.getPrototypeOf(UploadMultipleFiles)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      documents: []
    }, _this.handleDocument = function (file, fileStoreId) {
      var documents = _this.state.documents;
      var _this$props = _this.props,
          maxFiles = _this$props.maxFiles,
          prepareFinalObject = _this$props.prepareFinalObject,
          jsonPath = _this$props.jsonPath;


      if (documents.length + 1 > maxFiles) {
        alert("Can only upload " + maxFiles + " files");
      } else {
        documents.push({
          fileName: file.name,
          fileStoreId: fileStoreId,
          documentType: "Document - " + (documents.length + 1)
        });
        documents.slice(0, maxFiles);
        prepareFinalObject(jsonPath, documents);
        _this.setState({ documents: documents });
      }
    }, _this.removeDocument = function (index) {
      var documents = _this.state.documents;
      var _this$props2 = _this.props,
          prepareFinalObject = _this$props2.prepareFinalObject,
          jsonPath = _this$props2.jsonPath;

      documents.splice(index, 1);
      prepareFinalObject(jsonPath, documents);
      _this.setState({ documents: documents });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UploadMultipleFiles, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var documents = this.state.documents;

      return _react2.default.createElement(
        "div",
        null,
        documents && documents.map(function (document, index) {
          return _react2.default.createElement(
            "div",
            { style: { marginTop: 10 }, key: index },
            _react2.default.createElement(_uiAtomsLocal.UploadedDocument, {
              document: document,
              removeDocument: function removeDocument() {
                return _this2.removeDocument(index);
              }
            })
          );
        }),
        _react2.default.createElement(_uiAtomsLocal.UploadFile, {
          buttonProps: {
            variant: "outlined",
            color: "primary",
            style: { marginLeft: 0, marginTop: 10 }
          },
          handleFileUpload: function handleFileUpload(e) {
            return (0, _commons.handleFileUpload)(e, _this2.handleDocument, _this2.props);
          },
          inputProps: (0, _extends3.default)({ multiple: true }, this.props.inputProps),
          classes: this.props.classes,
          buttonLabel: this.props.buttonLabel
        })
      );
    }
  }]);
  return UploadMultipleFiles;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(null, mapDispatchToProps)(UploadMultipleFiles));
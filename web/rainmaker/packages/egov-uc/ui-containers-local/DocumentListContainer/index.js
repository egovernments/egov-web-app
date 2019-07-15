"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _styles = require("@material-ui/core/styles");

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none !important"
    }
  };
};

var DocumentListContainer = function (_Component) {
  (0, _inherits3.default)(DocumentListContainer, _Component);

  function DocumentListContainer() {
    (0, _classCallCheck3.default)(this, DocumentListContainer);
    return (0, _possibleConstructorReturn3.default)(this, (DocumentListContainer.__proto__ || Object.getPrototypeOf(DocumentListContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(DocumentListContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          uploadedDocuments = _props.uploadedDocuments,
          rest = (0, _objectWithoutProperties3.default)(_props, ["uploadedDocuments"]);

      return _react2.default.createElement(_uiMoleculesLocal.DocumentList, (0, _extends3.default)({ uploadedDocsInRedux: uploadedDocuments }, rest));
    }
  }]);
  return DocumentListContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration,
      documents = state.documents;

  var documentsList = documents || (0, _get2.default)(screenConfiguration.preparedFinalObject, "LicensesTemp[0].applicationDocuments", []);
  var uploadedDocuments = (0, _get2.default)(screenConfiguration.preparedFinalObject, "LicensesTemp[0].uploadedDocsInRedux", []);
  var tenantId = (0, _get2.default)(screenConfiguration.preparedFinalObject, "Licenses[0].tenantId", "");
  return { documentsList: documentsList, tenantId: tenantId, uploadedDocuments: uploadedDocuments };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, null)(DocumentListContainer));
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _InputLabel = require("@material-ui/core/InputLabel");

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Select = require("@material-ui/core/Select");

var _Select2 = _interopRequireDefault(_Select);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiMoleculesLocal = require("../../ui-molecules-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginBottom: "16px"
    },
    documentIcon: {
      backgroundColor: "#FFFFFF",
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "0.83px",
      lineHeight: "24px"
    },
    documentSuccess: {
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39CB74",
      color: "white"
    },
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none"
    },
    iconDiv: {
      display: "flex",
      alignItems: "center"
    },
    descriptionDiv: {
      display: "flex",
      alignItems: "center"
    },
    formControl: {
      minWidth: 250
    },
    fileUploadDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    }
  };
};

var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px"
};

var requiredIcon = _react2.default.createElement(
  "sup",
  { style: { color: "#E54D42", paddingLeft: "5px" } },
  "*"
);

var DocumentList = function (_Component) {
  (0, _inherits3.default)(DocumentList, _Component);

  function DocumentList() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DocumentList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DocumentList.__proto__ || Object.getPrototypeOf(DocumentList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      uploadedDocIndex: 0,
      uploadedIndex: [],
      uploadedDocuments: [],
      selectValue: []
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          prepareFinalObject = _this$props.prepareFinalObject,
          uploadedDocuments = _this$props.uploadedDocsInRedux;

      if (uploadedDocuments) {
        var uploadedIndex = Object.keys(uploadedDocuments).map(function (item) {
          return parseInt(item); //returns string so convert to integer
        });
        _this.setState({ uploadedDocuments: uploadedDocuments, uploadedIndex: uploadedIndex });
      }
      Object.values(uploadedDocuments).forEach(function (item, index) {
        prepareFinalObject("noc.documents[" + index + "]", (0, _extends4.default)({}, item[0]));
      });
    }, _this.onUploadClick = function (uploadedDocIndex) {
      _this.setState({ uploadedDocIndex: uploadedDocIndex });
    }, _this.handleDocument = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, fileStoreId) {
        var _this$state, uploadedDocIndex, uploadedDocuments, _this$props2, prepareFinalObject, documents, tenantId, _documents$uploadedDo, jsonPath, name, fileUrl;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, uploadedDocIndex = _this$state.uploadedDocIndex, uploadedDocuments = _this$state.uploadedDocuments;
                _this$props2 = _this.props, prepareFinalObject = _this$props2.prepareFinalObject, documents = _this$props2.documents, tenantId = _this$props2.tenantId;
                _documents$uploadedDo = documents[uploadedDocIndex], jsonPath = _documents$uploadedDo.jsonPath, name = _documents$uploadedDo.name;
                _context.next = 5;
                return (0, _commons.getFileUrlFromAPI)(fileStoreId);

              case 5:
                fileUrl = _context.sent;

                uploadedDocuments = (0, _extends4.default)({}, uploadedDocuments, (0, _defineProperty3.default)({}, uploadedDocIndex, [{
                  fileName: file.name,
                  fileStoreId: fileStoreId,
                  fileUrl: Object.values(fileUrl)[0],
                  documentType: name,
                  tenantId: tenantId
                }]));

                prepareFinalObject("nocTemp.uploadedDocsInRedux", (0, _extends4.default)({}, uploadedDocuments));

                prepareFinalObject(jsonPath, {
                  fileName: file.name,
                  fileStoreId: fileStoreId,
                  fileUrl: Object.values(fileUrl)[0],
                  documentType: name,
                  tenantId: tenantId
                });
                _this.setState({ uploadedDocuments: uploadedDocuments });
                _this.getFileUploadStatus(true, uploadedDocIndex);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.removeDocument = function (remDocIndex) {
      var uploadedDocuments = _this.state.uploadedDocuments;
      var _this$props3 = _this.props,
          prepareFinalObject = _this$props3.prepareFinalObject,
          documents = _this$props3.documents;

      var jsonPath = documents[remDocIndex].jsonPath;
      uploadedDocuments[remDocIndex] = {};
      prepareFinalObject(jsonPath, uploadedDocuments[remDocIndex]);
      _this.setState({ uploadedDocuments: uploadedDocuments });
      _this.getFileUploadStatus(false, remDocIndex);
    }, _this.getFileUploadStatus = function (status, index) {
      var uploadedIndex = _this.state.uploadedIndex;

      if (status) {
        uploadedIndex.push(index);
        _this.setState({ uploadedIndex: uploadedIndex });
      } else {
        var deletedIndex = uploadedIndex.findIndex(function (item) {
          return item === index;
        });
        uploadedIndex.splice(deletedIndex, 1);
        _this.setState({ uploadedIndex: uploadedIndex });
      }
    }, _this.handleChange = function (key, event) {
      var _this$props4 = _this.props,
          screenKey = _this$props4.screenKey,
          componentJsonpath = _this$props4.componentJsonpath,
          jsonPath = _this$props4.jsonPath,
          approveCheck = _this$props4.approveCheck,
          onFieldChange = _this$props4.onFieldChange,
          prepareFinalObject = _this$props4.prepareFinalObject;

      onFieldChange(screenKey, componentJsonpath, "props.documents[" + key + "].selector.value", event.target.value);
      prepareFinalObject("noc.documents[" + key + "].selector.value", event.target.value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DocumentList, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          classes = _props.classes,
          documents = _props.documents,
          description = _props.description;
      var uploadedIndex = this.state.uploadedIndex;

      return _react2.default.createElement(
        "div",
        { style: { paddingTop: 10 } },
        documents && documents.map(function (document, key) {
          return _react2.default.createElement(
            "div",
            {
              key: key,
              id: "document-upload-" + key,
              className: classes.documentContainer
            },
            _react2.default.createElement(
              _Grid2.default,
              { container: true },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 2, sm: 1, className: classes.iconDiv },
                uploadedIndex.indexOf(key) > -1 ? _react2.default.createElement(
                  "div",
                  { className: classes.documentSuccess },
                  _react2.default.createElement(
                    _Icon2.default,
                    null,
                    _react2.default.createElement(
                      "i",
                      { "class": "material-icons" },
                      "done"
                    )
                  )
                ) : _react2.default.createElement(
                  "div",
                  { className: classes.documentIcon },
                  _react2.default.createElement(
                    "span",
                    null,
                    key + 1
                  )
                )
              ),
              _react2.default.createElement(
                _Grid2.default,
                {
                  item: true,
                  xs: 10,
                  sm: 5,
                  md: 4,
                  align: "left",
                  className: classes.descriptionDiv
                },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelName: document.name,
                  labelKey: document.name,
                  style: documentTitle
                }),
                document.required && requiredIcon,
                _react2.default.createElement(
                  _Typography2.default,
                  { variant: "caption" },
                  document.statement
                ),
                _react2.default.createElement(
                  _Typography2.default,
                  { variant: "caption" },
                  description
                )
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 12, sm: 6, md: 4 },
                document.selector && _react2.default.createElement(
                  _FormControl2.default,
                  { required: true, className: classes.formControl },
                  _react2.default.createElement(
                    _InputLabel2.default,
                    { shrink: true, htmlFor: "age-label-placeholder" },
                    document.selector.inputLabel
                  ),
                  _react2.default.createElement(
                    _Select2.default,
                    {
                      value: document.selector.value || document.selector.initialValue,
                      onChange: function onChange(event) {
                        return _this3.handleChange(key, event);
                      },
                      name: "selected-document"
                    },
                    document.selector.menuItems && document.selector.menuItems.map(function (item) {
                      return _react2.default.createElement(
                        _MenuItem2.default,
                        { value: item.value },
                        item.label
                      );
                    })
                  )
                )
              ),
              _react2.default.createElement(
                _Grid2.default,
                {
                  item: true,
                  xs: 12,
                  sm: 12,
                  md: 3,
                  className: classes.fileUploadDiv
                },
                _react2.default.createElement(_uiMoleculesLocal.UploadSingleFile, {
                  classes: _this3.props.classes,
                  handleFileUpload: function handleFileUpload(e) {
                    return (0, _commons.handleFileUpload)(e, _this3.handleDocument, _this3.props);
                  },
                  uploaded: uploadedIndex.indexOf(key) > -1,
                  removeDocument: function removeDocument() {
                    return _this3.removeDocument(key);
                  },
                  documents: _this3.state.uploadedDocuments[key],
                  onButtonClick: function onButtonClick() {
                    return _this3.onUploadClick(key);
                  },
                  inputProps: _this3.props.inputProps,
                  buttonLabel: _this3.props.buttonLabel
                })
              )
            )
          );
        })
      );
    }
  }]);
  return DocumentList;
}(_react.Component);

DocumentList.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

// const mapStateToProps = state => {
//   const { screenConfiguration } = state;
//   const documents = get(
//     screenConfiguration.preparedFinalObject,
//     "LicensesTemp[0].applicationDocuments",
//     []
//   );
//   const tenantId = get(
//     screenConfiguration.preparedFinalObject,
//     "LicensesTemp[0].tenantId",
//     ""
//   );
//   return { documents, tenantId };
// };

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(null, mapDispatchToProps)(DocumentList));
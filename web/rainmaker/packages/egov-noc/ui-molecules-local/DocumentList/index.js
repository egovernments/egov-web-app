"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require("babel-runtime/helpers/extends");

var _extends5 = _interopRequireDefault(_extends4);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiMoleculesLocal = require("../../ui-molecules-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themeStyles = function themeStyles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentSubCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "10px",
      border: "#d6d6d6",
      borderStyle: "solid",
      borderWidth: "1px"
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
      minWidth: 250,
      padding: "0px"
    },
    fileUploadDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingTop: "5px"
    }
  };
};

var styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  documentName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  },
  dropdownLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px"
  }
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
      uploadedDocIndex: 0
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          documentsList = _this$props.documentsList,
          _this$props$documents = _this$props.documentsUploadRedux,
          documentsUploadRedux = _this$props$documents === undefined ? {} : _this$props$documents,
          prepareFinalObject = _this$props.prepareFinalObject;

      var index = 0;
      documentsList.forEach(function (docType) {
        docType.cards && docType.cards.forEach(function (card) {
          if (card.subCards) {
            card.subCards.forEach(function (subCard) {
              var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
              var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
              var oldDocSubCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentSubCode");
              if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
                documentsUploadRedux[index] = {
                  documentType: docType.code,
                  documentCode: card.name,
                  documentSubCode: subCard.name
                };
              }
              index++;
            });
          } else {
            var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
            var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
            if (oldDocType != docType.code || oldDocCode != card.name) {
              documentsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name
              };
            }
            index++;
          }
        });
      });
      prepareFinalObject("documentsUploadRedux", documentsUploadRedux);
    }, _this.onUploadClick = function (uploadedDocIndex) {
      _this.setState({ uploadedDocIndex: uploadedDocIndex });
    }, _this.handleDocument = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, fileStoreId) {
        var uploadedDocIndex, _this$props2, prepareFinalObject, documentsUploadRedux, fileUrl;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uploadedDocIndex = _this.state.uploadedDocIndex;
                _this$props2 = _this.props, prepareFinalObject = _this$props2.prepareFinalObject, documentsUploadRedux = _this$props2.documentsUploadRedux;
                _context.next = 4;
                return (0, _commons.getFileUrlFromAPI)(fileStoreId);

              case 4:
                fileUrl = _context.sent;


                prepareFinalObject("documentsUploadRedux", (0, _extends5.default)({}, documentsUploadRedux, (0, _defineProperty3.default)({}, uploadedDocIndex, (0, _extends5.default)({}, documentsUploadRedux[uploadedDocIndex], {
                  documents: [{
                    fileName: file.name,
                    fileStoreId: fileStoreId,
                    fileUrl: Object.values(fileUrl)[0]
                  }]
                }))));

              case 6:
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
      var prepareFinalObject = _this.props.prepareFinalObject;

      prepareFinalObject("documentsUploadRedux." + remDocIndex + ".documents", undefined);
      _this.forceUpdate();
    }, _this.handleChange = function (key, event) {
      var _this$props3 = _this.props,
          documentsUploadRedux = _this$props3.documentsUploadRedux,
          prepareFinalObject = _this$props3.prepareFinalObject;

      prepareFinalObject("documentsUploadRedux", (0, _extends5.default)({}, documentsUploadRedux, (0, _defineProperty3.default)({}, key, (0, _extends5.default)({}, documentsUploadRedux[key], {
        dropdown: { value: event.target.value }
      }))));
    }, _this.getUploadCard = function (card, key) {
      var _this$props4 = _this.props,
          classes = _this$props4.classes,
          documentsUploadRedux = _this$props4.documentsUploadRedux;

      var jsonPath = "documentsUploadRedux[" + key + "].dropdown.value";
      return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 2, sm: 1, className: classes.iconDiv },
          documentsUploadRedux[key] && documentsUploadRedux[key].documents ? _react2.default.createElement(
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
          { item: true, xs: 10, sm: 5, md: 4, align: "left", className: classes.descriptionDiv },
          _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: (0, _commons.getTransformedLocale)(card.name), style: styles.documentName }),
          card.required && requiredIcon
        ),
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 12, sm: 6, md: 4 },
          card.dropdown && _react2.default.createElement(_uiContainers.TextFieldContainer, {
            select: true,
            label: { labelKey: (0, _commons.getTransformedLocale)(card.dropdown.label) },
            placeholder: { labelKey: card.dropdown.label },
            data: card.dropdown.menu,
            optionValue: "code",
            optionLabel: "label",
            required: true,
            onChange: function onChange(event) {
              return _this.handleChange(key, event);
            },
            jsonPath: jsonPath
          })
        ),
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 12, sm: 12, md: 3, className: classes.fileUploadDiv },
          _react2.default.createElement(_uiMoleculesLocal.UploadSingleFile, {
            classes: _this.props.classes,
            handleFileUpload: function handleFileUpload(e) {
              return (0, _commons.handleFileUpload)(e, _this.handleDocument, _this.props);
            },
            uploaded: documentsUploadRedux[key] && documentsUploadRedux[key].documents ? true : false,
            removeDocument: function removeDocument() {
              return _this.removeDocument(key);
            },
            documents: documentsUploadRedux[key] && documentsUploadRedux[key].documents,
            onButtonClick: function onButtonClick() {
              return _this.onUploadClick(key);
            },
            inputProps: _this.props.inputProps,
            buttonLabel: _this.props.buttonLabel
          })
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DocumentList, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          classes = _props.classes,
          documentsList = _props.documentsList;

      var index = 0;
      return _react2.default.createElement(
        "div",
        null,
        documentsList && documentsList.map(function (container) {
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: (0, _commons.getTransformedLocale)(container.title), style: styles.documentTitle }),
            container.cards.map(function (card) {
              return _react2.default.createElement(
                "div",
                { className: classes.documentContainer },
                card.hasSubCards && _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: (0, _commons.getTransformedLocale)(card.name), style: styles.documentTitle }),
                card.hasSubCards && card.subCards.map(function (subCard) {
                  return _react2.default.createElement(
                    "div",
                    { className: classes.documentSubCard },
                    _this3.getUploadCard(subCard, index++)
                  );
                }),
                !card.hasSubCards && _react2.default.createElement(
                  "div",
                  null,
                  _this3.getUploadCard(card, index++)
                )
              );
            })
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

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var moduleName = screenConfiguration.moduleName;

  var documentsUploadRedux = (0, _get2.default)(screenConfiguration.preparedFinalObject, "documentsUploadRedux", {});
  return { documentsUploadRedux: documentsUploadRedux, moduleName: moduleName };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(themeStyles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DocumentList));
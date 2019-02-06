"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtomsLocal = require("ui-atoms-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadSingleFile = function UploadSingleFile(_ref) {
  var uploaded = _ref.uploaded,
      classes = _ref.classes,
      handleFileUpload = _ref.handleFileUpload,
      documents = _ref.documents,
      removeDocument = _ref.removeDocument,
      onButtonClick = _ref.onButtonClick,
      inputProps = _ref.inputProps,
      buttonLabel = _ref.buttonLabel;

  return _react2.default.createElement(
    "div",
    null,
    !uploaded && _react2.default.createElement(_uiAtomsLocal.UploadFile, {
      buttonProps: {
        variant: "outlined",
        color: "primary",
        onClick: onButtonClick
      },
      handleFileUpload: handleFileUpload,
      inputProps: (0, _extends3.default)({ multiple: false }, inputProps),
      classes: classes,
      buttonLabel: buttonLabel
    }),
    uploaded && _react2.default.createElement(
      "div",
      null,
      documents && documents.map(function (document, documentIndex) {
        return _react2.default.createElement(
          "div",
          { key: documentIndex },
          _react2.default.createElement(_uiAtomsLocal.UploadedDocument, {
            document: document,
            removeDocument: removeDocument
          })
        );
      })
    )
  );
};

exports.default = UploadSingleFile;
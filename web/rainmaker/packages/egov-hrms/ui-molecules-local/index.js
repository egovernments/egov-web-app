"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionDialog = exports.DividerWithLabel = exports.SwitchWithLabel = exports.UploadSingleFile = exports.UploadMultipleFiles = exports.Tooltip = exports.Table = exports.TestMolecules = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LinearSpinner = require("egov-ui-framework//ui-atoms/LinearSpinner");

var _LinearSpinner2 = _interopRequireDefault(_LinearSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement(_LinearSpinner2.default, null);
};
var TestMolecules = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TestMolecules");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Table = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Table");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Tooltip = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Tooltip");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadMultipleFiles = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadMultipleFiles");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadSingleFile = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadSingleFile");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var SwitchWithLabel = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./SwitchWithLabel");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var DividerWithLabel = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DividerWithLabel");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ActionDialog = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ActionDialog");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestMolecules = TestMolecules;
exports.Table = Table;
exports.Tooltip = Tooltip;
exports.UploadMultipleFiles = UploadMultipleFiles;
exports.UploadSingleFile = UploadSingleFile;
exports.SwitchWithLabel = SwitchWithLabel;
exports.DividerWithLabel = DividerWithLabel;
exports.ActionDialog = ActionDialog;
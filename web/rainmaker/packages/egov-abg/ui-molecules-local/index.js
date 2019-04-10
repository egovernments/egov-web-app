"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DividerWithLabel = exports.FeesEstimateCard = exports.MapLocator = exports.DocumentList = exports.UploadSingleFile = exports.CustomTab = exports.Tooltip = exports.RadioButtonsGroup = exports.TestMolecules = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LinearSpinner = require("egov-ui-framework/ui-atoms/LinearSpinner");

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
var RadioButtonsGroup = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./RadioGroup");
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

var CustomTab = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CustomTab");
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

var DocumentList = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DocumentList");
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

var MapLocator = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MapLocator");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var FeesEstimateCard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./FeesEstimateCard");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestMolecules = TestMolecules;
exports.RadioButtonsGroup = RadioButtonsGroup;
exports.Tooltip = Tooltip;
exports.CustomTab = CustomTab;
exports.UploadSingleFile = UploadSingleFile;
exports.DocumentList = DocumentList;
exports.MapLocator = MapLocator;
exports.FeesEstimateCard = FeesEstimateCard;
exports.DividerWithLabel = DividerWithLabel;
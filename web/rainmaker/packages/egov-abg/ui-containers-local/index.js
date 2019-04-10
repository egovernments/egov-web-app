"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogContainer = exports.ViewBreakupContainer = exports.PaymentRedirectPage = exports.DocumentListContainer = exports.AutosuggestContainer = exports.EstimateCardContainer = exports.DownloadFileContainer = exports.CheckboxContainer = exports.LabelContainer = exports.CustomTabContainer = undefined;

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

var CustomTabContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CustomTabContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var LabelContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./LabelContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var CheckboxContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./CheckboxContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DownloadFileContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DownloadFileContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var EstimateCardContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./EstimateCardContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var AutosuggestContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./AutosuggestContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var DocumentListContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DocumentListContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});
var PaymentRedirectPage = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./PaymentRedirectPage");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var DialogContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./DialogContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ViewBreakupContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ViewbreakupDialogContainer");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.CustomTabContainer = CustomTabContainer;
exports.LabelContainer = LabelContainer;
exports.CheckboxContainer = CheckboxContainer;
exports.DownloadFileContainer = DownloadFileContainer;
exports.EstimateCardContainer = EstimateCardContainer;
exports.AutosuggestContainer = AutosuggestContainer;
exports.DocumentListContainer = DocumentListContainer;
exports.PaymentRedirectPage = PaymentRedirectPage;
exports.ViewBreakupContainer = ViewBreakupContainer;
exports.DialogContainer = DialogContainer;
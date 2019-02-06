"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSuggest = exports.Switch = exports.MenuButton = exports.Asteric = exports.MapLocation = exports.UploadedDocument = exports.Checkbox = exports.UploadFile = exports.ApplicationNoContainer = exports.TestAtoms = undefined;

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
var TestAtoms = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./TestAtoms");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var ApplicationNoContainer = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./ApplicationNo");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Checkbox = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Checkbox");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadFile = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadFile");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var UploadedDocument = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./UploadedDocument");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MapLocation = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MapLocation");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Asteric = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./Asteric");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var MenuButton = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MenuButton");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var Switch = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./MenuButton");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

var AutoSuggest = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("./AutoSuggest");
  },
  loading: function loading() {
    return _react2.default.createElement(Loading, null);
  }
});

exports.TestAtoms = TestAtoms;
exports.ApplicationNoContainer = ApplicationNoContainer;
exports.UploadFile = UploadFile;
exports.Checkbox = Checkbox;
exports.UploadedDocument = UploadedDocument;
exports.MapLocation = MapLocation;
exports.Asteric = Asteric;
exports.MenuButton = MenuButton;
exports.Switch = Switch;
exports.AutoSuggest = AutoSuggest;
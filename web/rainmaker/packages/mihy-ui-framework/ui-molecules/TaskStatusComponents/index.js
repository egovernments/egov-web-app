"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@material-ui/core");

var _uiContainers = require("mihy-ui-framework/ui-containers");

var _utils = require("mihy-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = [{
  name: "Aadharcarg.pdf",
  title: "Proof of identity",
  linkText: "View",
  link: ""
}, {
  name: "Pan.pdf",
  title: "Proof of identity",
  linkText: "View",
  link: ""
}];

var TaskStatusComponents = function TaskStatusComponents(_ref) {
  var currentStatus = _ref.currentStatus;

  return _react2.default.createElement(
    _core.Grid,
    { container: true, sm: 12, style: { marginLeft: 10 } },
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 2 },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Date" })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: (0, _utils.convertEpochToDate)((0, _get2.default)(currentStatus, "auditDetails.lastModifiedTime"))
        })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 2 },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Updated By" })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentStatus, "assigner.name") })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 2 },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Status" })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentStatus, "state.state") })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 3 },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Current Owner" })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentStatus, "assignee.name") })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 3 },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Comments" })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentStatus, "comment") })
      )
    ),
    (0, _get2.default)(currentStatus, "comment") && _react2.default.createElement(_uiContainers.DownloadFileContainer, {
      documentData: data,
      className: "review-documents",
      backgroundGrey: true
    })
  );
};

exports.default = TaskStatusComponents;
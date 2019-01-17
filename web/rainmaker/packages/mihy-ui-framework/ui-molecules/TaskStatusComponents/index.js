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
  var currentObj = _ref.currentObj;

  console.log("currentObj is....", currentObj);
  return _react2.default.createElement(
    _core.Grid,
    { container: true, sm: 12 },
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 2, style: { paddingRight: 20 } },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Date", labelKey: "TL_DATE_LABEL" })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: (0, _utils.convertEpochToDate)((0, _get2.default)(currentObj, "auditDetails.lastModifiedTime"))
        })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 2, style: { paddingRight: 20 } },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Updated By",
          labelKey: "TL_UPDATED_BY_LABEL"
        })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentObj, "assigner.name") })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 2, style: { paddingRight: 20 } },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Status",
          labelKey: "TL_COMMON_TABLE_COL_STATUS"
        })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentObj, "state.state") })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 3, style: { paddingRight: 20 } },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Current Owner",
          labelKey: "TL_CURRENT_OWNER_LABEL"
        })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentObj, "assignee.name") })
      )
    ),
    _react2.default.createElement(
      _core.Grid,
      { item: true, sm: 3, style: { paddingRight: 20 } },
      _react2.default.createElement(
        _core.Typography,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Comments",
          labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
        })
      ),
      _react2.default.createElement(
        _core.Typography,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentObj, "comment") })
      )
    ),
    (0, _get2.default)(currentObj, "documents") && _react2.default.createElement(_uiContainers.DownloadFileContainer, {
      documentData: data,
      className: "review-documents",
      backgroundGrey: true
    })
  );
};

exports.default = TaskStatusComponents;
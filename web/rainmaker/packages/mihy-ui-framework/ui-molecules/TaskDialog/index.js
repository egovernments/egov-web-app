"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@material-ui/core");

var _uiAtoms = require("mihy-ui-framework/ui-atoms");

var _uiContainers = require("mihy-ui-framework/ui-containers");

var _TaskStatusComponents = require("../TaskStatusComponents");

var _TaskStatusComponents2 = _interopRequireDefault(_TaskStatusComponents);

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      marginTop: 24,
      width: "100%"
    }
  };
};

var TaskDialog = function TaskDialog(props) {
  var open = props.open,
      onClose = props.onClose,
      classes = props.classes,
      history = props.history;

  return _react2.default.createElement(
    _core.Dialog,
    { open: open, onClose: onClose, maxWidth: "lg" },
    _react2.default.createElement(_core.DialogContent, {
      children: _react2.default.createElement(_uiAtoms.Container, {
        children: _react2.default.createElement(
          _core.Grid,
          { container: "true", sm: "12", spacing: 16, marginTop: 16 },
          _react2.default.createElement(
            _core.Grid,
            {
              style: { alignItems: "center", display: "flex" },
              item: true,
              sm: 10
            },
            _react2.default.createElement(
              _core.Typography,
              { component: "h2", variant: "subheading" },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelName: "Task Status",
                labelKey: "TL_TASK_STATUS"
              })
            )
          ),
          _react2.default.createElement(
            _core.Grid,
            {
              item: true,
              sm: 2,
              style: { textAlign: "right", cursor: "pointer" },
              onClick: onClose
            },
            _react2.default.createElement(_Close2.default, null)
          ),
          _react2.default.createElement(
            _core.Grid,
            { item: true, sm: 12, style: { margin: "10px 0 0 10px" } },
            history && history.map(function (item, index) {
              return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_TaskStatusComponents2.default, { currentStatus: item }),
                _react2.default.createElement(_core.Divider, { className: classes.root })
              );
            })
          )
        )
      })
    })
  );
};

exports.default = (0, _styles.withStyles)(styles)(TaskDialog);
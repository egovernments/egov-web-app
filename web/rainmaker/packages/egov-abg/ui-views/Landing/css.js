"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawerWidth = 240;

var styles = function styles(theme) {
  var _appBar;

  return {
    root: {
      flexGrow: 1,
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    },
    appBar: (_appBar = {
      position: "absolute"
    }, (0, _defineProperty3.default)(_appBar, theme.breakpoints.up("md"), {
      // marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      zIndex: 10000
    }), (0, _defineProperty3.default)(_appBar, "background", "#ffffff"), (0, _defineProperty3.default)(_appBar, "color", "rgba(0, 0, 0, 0.8700000047683716)"), _appBar),
    navIconHide: (0, _defineProperty3.default)({}, theme.breakpoints.up("md"), {
      display: "none"
    }),
    toolbar: theme.mixins.toolbar,
    drawerPaper: (0, _defineProperty3.default)({
      width: drawerWidth
    }, theme.breakpoints.up("md"), {
      position: "relative"
    }),
    content: (0, _defineProperty3.default)({
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit
    }, theme.breakpoints.up("md"), {
      paddingLeft: drawerWidth + 10
    })
  };
};

exports.default = styles;
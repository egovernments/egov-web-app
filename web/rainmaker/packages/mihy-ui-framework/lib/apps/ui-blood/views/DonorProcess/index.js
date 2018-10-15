"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("ui-atoms");

var _reactRouterDom = require("react-router-dom");

var _Dashboard = require("./Dashboard");

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _ProcessOverview = require("./ProcessOverview");

var _ProcessOverview2 = _interopRequireDefault(_ProcessOverview);

var _WhatToDoBefore = require("./WhatToDoBefore");

var _WhatToDoBefore2 = _interopRequireDefault(_WhatToDoBefore);

var _WhatHappens = require("./WhatHappens");

var _WhatHappens2 = _interopRequireDefault(_WhatHappens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DonorProcess = function DonorProcess(props) {
  var match = props.match;

  return _react2.default.createElement(
    _uiAtoms.Div,
    null,
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "" + match.path, component: _Dashboard2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: match.path + "/process-overview", component: _ProcessOverview2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: match.path + "/what-to-do-before", component: _WhatToDoBefore2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: match.path + "/what-happens", component: _WhatHappens2.default })
  );
};

exports.default = DonorProcess;
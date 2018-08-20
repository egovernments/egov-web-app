"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("material-ui/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublicToilet = function PublicToilet(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 24 24", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M19.864 13.404H15.43v-.499c0-.413.398-.748.887-.748h2.66c.49 0 .887.335.887.748v.499zm-4.434 3.24h4.434v.749H15.43v-.748zm0-.996h4.434v.747H15.43v-.747zm0 1.994h4.434v.748H15.43v-.748zm0 .997h4.434v.25c0 .413-.397.747-.887.747h-2.66c-.49 0-.887-.334-.887-.748v-.249zm0-3.989h4.434v.748H15.43v-.748zm0-.997h4.434v.748H15.43v-.748zm-10.64-.25H.357v-.498c0-.413.397-.748.886-.748h2.66c.49 0 .887.335.887.748v.499zM.357 16.646H4.79v.748H.357v-.748zm0-.997H4.79v.747H.357v-.747zm0 1.994H4.79v.748H.357v-.748zm0 .997H4.79v.25c0 .413-.397.747-.886.747h-2.66c-.49 0-.887-.334-.887-.748v-.249zm0-3.989H4.79v.748H.357v-.748zm0-.997H4.79v.748H.357v-.748zM10.11.69c-4.197 0-7.6 2.87-7.6 6.41 0 1.666.757 3.18 1.994 4.318.692.637 1 .922 1 1.727v6.58c0 2.146 2.063 3.886 4.606 3.886 2.544 0 4.606-1.74 4.606-3.885v-6.581c0-.805.309-1.09 1-1.727C16.954 10.28 17.71 8.765 17.71 7.1c0-3.54-3.402-6.41-7.6-6.41zm0 7.23c-1.142 0-2.069-.781-2.069-1.745 0-.964.927-1.745 2.07-1.745 1.142 0 2.068.781 2.068 1.745 0 .964-.926 1.745-2.069 1.745z",
      id: "a"
    })
  );
};

exports.default = PublicToilet;
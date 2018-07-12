"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var items = {
  citizen: {
    sections: {
      one: {
        items: [{
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HOMEHEADER" }),
          route: "",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "action", name: "home" }),
          style: {
            paddingBottom: "1px",
            paddingTop: "1px",
            borderLeft: "3px solid #00bbd3"
          },
          id: "header-home"
        }, {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HEADER_PROFILE" }),
          route: "/user/profile",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "social", name: "person" }),
          style: {
            paddingBottom: "3px",
            paddingTop: "3px"
          },
          id: "header-profile"
        }]
      },
      two: {
        items: [{
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HEADER_CONTACT_US" }),
          route: "/contact-us",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "communication", name: "call" }),
          style: {
            paddingBottom: "8px",
            paddingTop: "8px"
          },
          id: "header-contact-us"
        }, {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HEADER_HOW_IT_WORKS" }),
          route: "/how-it-works",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "custom", name: "help-circle" }),
          style: {
            paddingBottom: "2px",
            paddingTop: "2px"
          },
          id: "header-how-it-works"
        }, {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CORE_COMMON_LOGOUT" }),
          route: "/logout",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "action", name: "power-settings-new" }),
          style: {
            borderBottom: "none",
            borderLeft: "red"
          },
          id: "header-logout"
        }]
      }
    }
  },
  employee: {
    sections: {
      one: {
        items: [{
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HOMEHEADER" }),
          route: "/all-complaints",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "action", name: "home" }),
          style: {
            paddingBottom: "1px",
            paddingTop: "1px",
            borderLeft: "3px solid #00bbd3"
          },
          id: "header-home",
          renderforcsr: true,
          renderforadmin: true
        }, {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "ES_CLOSED_COMPLAINTS_HEADER" }),
          route: "/closed-complaints",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "custom", name: "file-check" }),
          id: "header-closed-complaint",
          renderforcsr: false,
          renderforadmin: false
        }, {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "ES_EMPLOYEE_DIRECTORY_HEADER" }),
          route: "/employee-directory",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "communication", name: "call" }),
          style: {
            paddingBottom: "2px",
            paddingTop: "2px"
          },
          id: "header-contact-us",
          renderforcsr: true,
          renderforadmin: true
        }, {
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HEADER_PROFILE" }),
          route: "/user/profile",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "social", name: "person" }),
          style: {
            paddingBottom: "3px",
            paddingTop: "3px"
          },
          id: "header-profile",
          renderforcsr: true,
          renderforadmin: true
        }]
      },
      two: {
        items: [{
          primaryText: _react2.default.createElement(_translationNode2.default, { label: "CORE_COMMON_LOGOUT" }),
          route: "/logout",
          leftIcon: _react2.default.createElement(_components.Icon, { action: "action", name: "power-settings-new" }),
          style: {
            borderBottom: "none",
            borderLeft: "red"
          },
          id: "header-logout",
          renderforcsr: true,
          renderforadmin: true
        }]
      }
    }
  }
};

var renderMenuForCSR = function renderMenuForCSR(role, section) {
  var menuForCSR = items[role].sections[section].items.filter(function (item) {
    return item.renderforcsr === true;
  });
  return menuForCSR;
};
var renderMenuForADMIN = function renderMenuForADMIN(role, section) {
  var menuForADMIN = items[role].sections[section].items.filter(function (item) {
    return item.renderforadmin === true;
  });
  return menuForADMIN;
};

var menuItems = function menuItems() {
  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "citizen";
  var section = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "one";
  var isCSR = arguments[2];
  var isADMIN = arguments[3];

  return isCSR ? renderMenuForCSR(role, section) : isADMIN ? renderMenuForADMIN(role, section) : items[role].sections[section].items;
};

exports.default = menuItems;
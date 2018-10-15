"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ComponentInterface = require("../ComponentInterface");

var _ComponentInterface2 = _interopRequireDefault(_ComponentInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderScreen = function RenderScreen(_ref) {
  var components = _ref.components,
      rootFramework = _ref.uiFramework,
      onFieldChange = _ref.onFieldChange,
      onComponentClick = _ref.onComponentClick;

  return components ? Object.keys(components).map(function (componentKey) {
    var _components$component = components[componentKey],
        uiFramework = _components$component.uiFramework,
        componentPath = _components$component.componentPath,
        componentJsonpath = _components$component.componentJsonpath,
        jsonPath = _components$component.jsonPath,
        props = _components$component.props,
        onClickDefination = _components$component.onClickDefination,
        gridDefination = _components$component.gridDefination;

    var extraProps = jsonPath ? {
      onChange: function onChange(e) {
        onFieldChange("", componentJsonpath, jsonPath, e.target.value);
      }
    } : {};
    if (onClickDefination) {
      extraProps = (0, _extends3.default)({}, extraProps, {
        onClick: function onClick(e) {
          onComponentClick(onClickDefination);
        }
      });
    }
    if (!(0, _isEmpty2.default)(components[componentKey].children)) {
      return _react2.default.createElement(
        _ComponentInterface2.default,
        {
          key: componentKey,
          id: componentKey,
          uiFramework: uiFramework || rootFramework,
          componentPath: componentPath,
          props: (0, _extends3.default)({}, props, extraProps),
          gridDefination: gridDefination
        },
        _react2.default.createElement(RenderScreen, { components: components[componentKey].children, onFieldChange: onFieldChange, onComponentClick: onComponentClick, uiFramework: rootFramework })
      );
    } else {
      return _react2.default.createElement(_ComponentInterface2.default, {
        key: componentKey,
        id: componentKey,
        uiFramework: uiFramework || rootFramework,
        componentPath: componentPath,
        props: (0, _extends3.default)({}, props, extraProps),
        gridDefination: gridDefination
      });
    }
  }) : null;
};

exports.default = RenderScreen;
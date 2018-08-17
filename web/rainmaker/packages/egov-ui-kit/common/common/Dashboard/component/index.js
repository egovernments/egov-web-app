"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import React from "react";
// import { Card, Icon, Button } from "components";
// import Label from "egov-ui-kit/utils/translationNode";
// import "./index.css";

// const moduleCardButtons = {
//   width: "93%",
// };
// const moduleCardButtonsContainer = {
//   padding: "0px 0px 12px 0px",
// };
// const moduleIconStyle = {
//   width: "75px",
//   height: "75px",
//   paddingTop: "10px",
// };

// const ModuleCard = ({ items, onButton1Click, onButton2Click }) => {
//   return (
//     <div>
//       {items &&
//         items.map((item, key) => {
//           return (
//             <div className="col-sm-6">
//               <Card
//                 id="home-complaint-card"
//                 className="clearfix landingPageCard"
//                 style={item.borderLeftColor}
//                 textChildren={
//                   <div className="clearfix">
//                     <div className="col-sm-2">
//                       <Icon action={item.iconAction} name={item.iconName} style={moduleIconStyle} />
//                     </div>
//                     <div className="col-sm-10">
//                       <Label className="moduleCardTitle" label={item.moduleTitle} />
//                       {item.moduleDescription && <Label className="moduleCardDescription" label={item.moduleDescription} />}
//                       <div class="col-sm-6" style={moduleCardButtonsContainer}>
//                         <Button
//                           onClick={() => onButton1Click(item)}
//                           label={<Label label={item.button1} color="#fff" />}
//                           primary="true"
//                           style={{ align: "left" }}
//                           style={moduleCardButtons}
//                           buttonStyle={{ border: "1px solid #fe7a51" }}
//                           labelStyle={{
//                             padding: "0 12px 0 12px ",
//                             letterSpacing: "0.6px",
//                             display: "inline-block",
//                             height: "22px",
//                             lineHeight: "22px",
//                             fontSize: "14px",
//                           }}
//                         />
//                       </div>
//                       {item.button2 && (
//                         <div class="col-sm-6" style={moduleCardButtonsContainer}>
//                           <Button
//                             onClick={() => onButton2Click(item)}
//                             label={<Label label={item.moduleDescription} color="#fe7a51" />}
//                             style={{ align: "right" }}
//                             style={moduleCardButtons}
//                             buttonStyle={{ border: "1px solid #fe7a51" }}
//                             className="moduleSecondButton"
//                             labelStyle={{
//                               padding: "0 12px 0 12px ",
//                               letterSpacing: "0.6px",
//                               display: "inline-block",
//                               height: "22px",
//                               lineHeight: "22px",
//                               fontSize: "14px",
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 }
//               />
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default ModuleCard;

var moduleCardButtons = {
  width: "93%"
};
var moduleCardButtonsContainer = {
  padding: "0px",
  margin: "0px"
};
var ModuleCard = function ModuleCard(_ref) {
  var items = _ref.items,
      onButton1Click = _ref.onButton1Click,
      onButton2Click = _ref.onButton2Click,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    null,
    items && items.map(function (item, key) {
      var _React$createElement, _React$createElement2;

      return _react2.default.createElement(
        "div",
        { className: "col-sm-6" },
        _react2.default.createElement(_components.Card, {
          id: "home-complaint-card",
          className: "clearfix landingPageCard",
          style: item.borderLeftColor,
          textChildren: _react2.default.createElement(
            "div",
            { className: "clearfix" },
            _react2.default.createElement(
              "div",
              { className: "col-sm-12", style: { padding: "0", margin: "0", minHeight: "190px" } },
              _react2.default.createElement(
                "div",
                { className: "col-sm-2", style: { padding: "0", margin: "0" } },
                _react2.default.createElement(_components.Icon, { action: item.iconAction, name: item.iconName, style: item.iconStyle })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-10" },
                _react2.default.createElement(_translationNode2.default, { className: "moduleCardTitle", label: item.moduleTitle }),
                item.moduleDescription && _react2.default.createElement(_translationNode2.default, { className: "moduleCardDescription", label: item.moduleDescription })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12", style: { padding: "0", margin: "0" } },
              _react2.default.createElement(
                "div",
                { className: "col-sm-2" },
                "\xA0"
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-10", style: { padding: "0", margin: "0" } },
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-6", style: moduleCardButtonsContainer },
                  _react2.default.createElement(_components.Button, (_React$createElement = {
                    onClick: function onClick() {
                      onButton1Click(item, history);
                    },
                    label: _react2.default.createElement(_translationNode2.default, { label: item.button1, color: "#fff" }),
                    primary: "true",
                    style: { align: "left" }
                  }, (0, _defineProperty3.default)(_React$createElement, "style", moduleCardButtons), (0, _defineProperty3.default)(_React$createElement, "buttonStyle", { border: "1px solid #fe7a51" }), (0, _defineProperty3.default)(_React$createElement, "labelStyle", {
                    padding: "0 12px 0 12px ",
                    letterSpacing: "0.6px",
                    display: "inline-block",
                    height: "22px",
                    lineHeight: "22px",
                    fontSize: "14px"
                  }), _React$createElement))
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-6", style: moduleCardButtonsContainer },
                  _react2.default.createElement(_components.Button, (_React$createElement2 = {
                    onClick: function onClick() {
                      onButton2Click(item, history);
                    },
                    label: _react2.default.createElement(_translationNode2.default, { label: item.button2, color: "#fe7a51" }),
                    style: { align: "right" }
                  }, (0, _defineProperty3.default)(_React$createElement2, "style", moduleCardButtons), (0, _defineProperty3.default)(_React$createElement2, "buttonStyle", { border: "1px solid #fe7a51" }), (0, _defineProperty3.default)(_React$createElement2, "className", "moduleSecondButton"), (0, _defineProperty3.default)(_React$createElement2, "labelStyle", {
                    padding: "0 12px 0 12px ",
                    letterSpacing: "0.6px",
                    display: "inline-block",
                    height: "22px",
                    lineHeight: "22px",
                    fontSize: "14px"
                  }), _React$createElement2))
                )
              )
            )
          )
        })
      );
    })
  );
};

exports.default = ModuleCard;
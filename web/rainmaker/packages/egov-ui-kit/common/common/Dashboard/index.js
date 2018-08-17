"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import ModuleCard from "./component";
// import Label from "egov-ui-kit/utils/translationNode";
// import "./index.css";

// class Dashboard extends Component {
//   moduleData = [
//     {
//       moduleTitle: "Complaints",
//       moduleDescription:
//         "mSeva Complaints offers an easy to use interface which enables you to lodge civic works related complaints. It also lets you track the status of your complaint and facilitates direct interaction with your municipality till its resolution.",
//       button1: "COMPLAINTS HOME",
//       button2: "How do i do?",
//       borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
//       iconAction: "custom",
//       iconName: "file-send",
//     },
//     {
//       moduleTitle: "Property Tax",
//       moduleDescription: "Assess, pay and track your Property Taxes online with mSeva Property Tax.",
//       button1: "PT HOME",
//       button2: "How do i do?",
//       borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
//       iconAction: "custom",
//       iconName: "file-send",
//       route: "property-tax",
//     },
//   ];

//   onButton1Click = (item) => {
//     const { history } = this.props;
//     const { route } = item;
//     if (item.moduleTitle === "Property Tax") {
//       history && history.push(route);
//     }
//   };
//   onButton2Click = (item) => {
//     const { history } = this.props;
//     let userType = JSON.parse(localStorage.getItem("user-info")).type;

//     if (userType === "CITIZEN") {
//       if (item.moduleTitle === "Property Tax") {
//         history && history.push("property-tax/how-it-works");
//       }
//     }
//   };

//   render() {
//     const { name, history } = this.props;
//     const { onButton1Click, onButton2Click } = this;
//     return (
//       <div class="col-sm-12">
//         <Label className="landingPageUser" label={` Welcome ${name}, `} />
//         <ModuleCard items={this.moduleData} onButton1Click={onButton1Click} onButton2Click={onButton2Click} />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const { auth } = state;
//   const { userInfo } = auth;
//   const name = userInfo && userInfo.name;

//   return { name };
// };
// export default connect(
//   mapStateToProps,
//   null
// )(Dashboard);

var onButton1Click = function onButton1Click(item, history) {
  var route = item.route;

  if (item.moduleTitle === "Property Tax") {
    history && history.push(route);
  }
};
var onButton2Click = function onButton2Click(item, history) {
  var userType = JSON.parse(localStorage.getItem("user-info")).type;

  if (userType === "CITIZEN") {
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    }
  }
};

var Dashboard = function Dashboard(_ref) {
  var moduleItems = _ref.moduleItems,
      userName = _ref.userName,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    { "class": "col-sm-12" },
    _react2.default.createElement(_translationNode2.default, { className: "landingPageUser", label: " Welcome " + userName + ", " }),
    _react2.default.createElement(_component2.default, { items: moduleItems, onButton2Click: onButton2Click, onButton1Click: onButton1Click })
  );
};
exports.default = Dashboard;
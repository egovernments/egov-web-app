"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var progressStatus = exports.progressStatus = {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
        style: { display: "flex", justifyContent: "center" }
    },
    visible: false,
    children: {
        progress: {
            uiFramework: "material-ui",
            componentPath: "CircularProgress"
        }
    }
};
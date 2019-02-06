"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var style = {
  bodyBox: {
    marginLeft: 16,
    flex: 2
  },
  tailText: {
    color: "rgba(0, 0, 0, 0.6000000238418579)",
    fontSize: 16,
    fontWeight: 400
  },
  tailNumber: {
    fontSize: 24,
    fontWeight: 500
  },
  tailBox: {
    textAlign: "right",
    justifyContent: "center",
    flex: 1
  },
  bodySub: {
    marginTop: "8px",
    marginBottom: "0px",
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto"
  },
  container: {
    display: "flex",
    minHeight: "106px",
    justifyContent: "center",
    alignItems: "center"
  }
};

var acknowledgementCard = function acknowledgementCard() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$icon = _ref.icon,
      icon = _ref$icon === undefined ? "done" : _ref$icon,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? "#39CB74" : _ref$backgroundColor,
      header = _ref.header,
      body = _ref.body,
      tailText = _ref.tailText,
      number = _ref.number;

  var tail = tailText ? {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      text: (0, _utils.getCommonHeader)(tailText, { style: style.tailText }),
      paragraph: (0, _utils.getCommonHeader)({
        labelName: number
      }, { style: style.tailNumber })
    },
    props: {
      style: style.tailBox
    }
  } : {};

  return (0, _utils.getCommonCard)({
    applicationSuccessContainer: (0, _utils.getCommonContainer)({
      avatar: {
        componentPath: "Avatar",
        props: {
          style: {
            width: "72px",
            height: "72px",
            backgroundColor: backgroundColor
          }
        },
        children: {
          Icon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: icon,
              style: {
                fontSize: "50px"
              }
            }
          }
        }
      },
      body: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          header: (0, _utils.getCommonHeader)(header),
          paragraph: (0, _utils.getCommonParagraph)(body, {
            style: style.bodySub
          })
        },
        props: {
          style: style.bodyBox
        }
      },
      tail: tail
    }, {
      style: style.container
    })
  });
};

exports.default = acknowledgementCard;
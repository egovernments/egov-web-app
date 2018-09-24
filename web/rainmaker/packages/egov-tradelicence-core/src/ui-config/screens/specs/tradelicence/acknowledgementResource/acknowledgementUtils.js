import {
  getCommonHeader,
  getCommonCard,
  getCommonParagraph,
  getBreak,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const style = {
  bodyBox: {
    marginLeft: 16,
    flex: 1
  },
  tailText: {
    color: "rgba(0, 0, 0, 0.6000000238418579)",
    fontSize: 16,
    fontWeight: 400
  },
  tailNumber: {
    fontSize: 34,
    fontWeight: 500
  },
  tailBox: {
    textAlign: "right",
    justifyContent: "center",
    flex: 1
  }
};

const acknowledgementCard = ({
  icon = "done",
  backgroundColor = "#39CB74",
  header,
  body,
  tailText,
  number
} = {}) => {
  const tail = tailText
    ? {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          text: getCommonHeader(tailText, { style: style.tailText }),
          paragraph: getCommonHeader(number, { style: style.tailNumber })
        },
        props: {
          style: style.tailBox
        }
      }
    : {};

  return getCommonCard({
    applicationSuccessContainer: getCommonContainer({
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
          header: getCommonHeader(header),
          paragraph: getCommonParagraph(body)
        },
        props: {
          style: style.bodyBox
        }
      },
      tail: tail
    })
  });
};

export default acknowledgementCard;

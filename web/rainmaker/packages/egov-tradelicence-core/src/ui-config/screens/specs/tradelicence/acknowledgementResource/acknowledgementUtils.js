import {
  getCommonHeader,
  getCommonCard,
  getCommonParagraph,
  getBreak,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const getAcknowledgementCard = (purpose, status, number) => {
  if (purpose === "apply" && status === "success") {
    return acknowledgementCard({
      icon: "done",
      backgroundColor: "#39CB74",
      header: "Application Submitted Successfully",
      body:
        "A copy of application confirmation has been sent to trade owner at registered Mobile No.",
      tailText: "Application No.",
      number: number
    });
  } else if (purpose === "pay" && status === "success") {
    return acknowledgementCard({
      icon: "done",
      backgroundColor: "#39CB74",
      header: "Payment has been collected successfully!",
      body:
        "A copy of receipt has been sent to trade owner at registered Mobile No.",
      tailText: "Payment Receipt No.",
      number: number
    });
  } else if (purpose === "approve" && status === "success") {
    return acknowledgementCard({
      icon: "done",
      backgroundColor: "#39CB74",
      header: "Trade License Approved Successfully",
      body:
        "Copy of trade License has been sent to trade owner at registered Mobile No.",
      tailText: "Payment Receipt No.",
      number: number
    });
  } else if (purpose === "application" && status === "rejected") {
    return acknowledgementCard({
      icon: "close",
      backgroundColor: "#E54D42",
      header: "Trade License Application Rejected",
      body:
        "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No."
    });
  } else if (purpose === "application" && status === "cancelled") {
    return acknowledgementCard({
      icon: "close",
      backgroundColor: "#E54D42",
      header: "Trade License Cancelled",
      body:
        "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
      tailText: "Trade License No.",
      number: number
    });
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
          text: getCommonParagraph(tailText),
          paragraph: getCommonHeader(number)
        },
        props: {
          style: {
            marginTop: "20px",
            "text-align": "right",
            flex: 1
          }
        }
      }
    : {};

  return getCommonCard({
    applicationSuccessContainer: getCommonContainer({
      avatar: {
        componentPath: "Avatar",
        props: {
          style: {
            width: "80px",
            height: "80px",
            margin: "10px",
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
      successText: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          header: getCommonHeader(header),
          break: getBreak(),
          paragraph: getCommonParagraph(body)
        },
        props: {
          style: {
            marginTop: "15px",
            marginLeft: "10px",
            flex: 1
          }
        }
      },
      tail: tail
    })
  });
};

export default getAcknowledgementCard;
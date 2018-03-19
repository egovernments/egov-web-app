import React, { Component } from "react";
import { Card, TimeLine, Label, Icon, Image } from "../../../../components";
import {withRouter} from "react-router-dom";
import garbageOne from "../../../../assets/images/Garbage_3.jpg";
import "./index.css";

const timelineIconCommonStyle = {
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "7px",
  marginLeft: "-7px",
};

const statusCommonIconStyle = {
  ...timelineIconCommonStyle,
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
  border: "solid 1px #f89a3f",
};

const statusResolvedIconStyle = {
  ...timelineIconCommonStyle,
  backgroundColor: "#22b25f",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.22)",
  border: "solid 1px #22b25f",
};

const callIconStyle = {
  marginRight: "7px",
  height: "9px",
  width: "9px",
  borderRadius: "50%",
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "SUBMITTED":
      return <Icon action="custom" name="file-send" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "ASSIGNED":
      return <Icon action="custom" name="file-plus" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "REJECTED":
      return <Icon action="content" name="clear" style={statusCommonIconStyle} color={"#f5a623"} />;
    default:
      return <Icon action="action" name="done" style={statusResolvedIconStyle} color={"#FFFFFF"} />;
  }
};

const StatusContent = ({ status, currentStatus, content,history }) => {
  var { date, name, designation, department, resolveImage, resolveFeedback } = content;
  switch (status) {
    case "SUBMITTED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "11-Mar-18"} />
          <Label labelClassName="dark-color" label="Complaint Filed" />
          {currentStatus === "Submitted" && (
            <div
              className="complaint-details-timline-button"
              onClick={(e) => {
                console.log("clicked");
              }}
            >
              <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
              CALL
            </div>
          )}
        </div>
      );
    case "ASSIGNED":
      var { status } = content;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "12-Mar-18"} />
          <Label labelClassName="dark-color" label={`Assigned to ${name || "Satpal Singh"}`} />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
          />
        </div>
      );

    case "REASSIGNED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "15-Mar-18"} />
          <Label labelClassName="dark-color" label={`Re-Assigned to ${name || "Satpal Singh"}`} />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
          />
        </div>
      );
    case "REJECTED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "12-Mar-18"} />
          <Label labelClassName="dark-color" label="Complaint Rejected" />
          <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={department || "Amritsar Municipal Corporation"} />
          <div
            className="complaint-details-timline-button"
            onClick={(e) => {
              history.push("/reopen-complaint")
            }}
          >
            RE-OPEN
          </div>
        </div>
      );
    default:
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "18-Mar-18"} />
          <Label labelClassName="dark-color" label="Complaint Resolved" />
          <Image
            style={{
              width: "97px",
              height: "93px",
              margin: "8px 0",
            }}
            source={garbageOne || resolveImage}
          />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={resolveFeedback || "Sweepers will clean this area on mondays & thursdays"}
          />
          <div className="rainmaker-displayInline">
            <div
              className="complaint-details-timline-button"
              onClick={(e) => {
                history.push("/feedback")
              }}
            >
              RATE
            </div>
            <div
              className="complaint-details-timline-button"
              onClick={(e) => {
                history.push("/reopen-complaint")
              }}
            >
              RE-OPEN
            </div>
          </div>
        </div>
      );
  }
};

class ComplaintTimeLine extends Component {
  render() {
    let { status,history } = this.props;
    let steps = [
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="RESOLVED" />,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: <StatusContent status="RESOLVED" content={{}} history={history}/>,
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="ASSIGNED" />,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: <StatusContent status="REASSIGNED" content={{}} />,
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="ASSIGNED" />,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: <StatusContent status="ASSIGNED" content={{}} />,
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="SUBMITTED" />,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: <StatusContent status="SUBMITTED" content={{}} />,
      },
    ];
    if (status === "Submitted") {
      steps = [
        {
          props: {
            active: true,
          },
          labelProps: {
            icon: <StatusIcon status="SUBMITTED" />,
          },
          contentProps: {
            style: {
              marginTop: "-50px",
            },
          },
          contentChildren: <StatusContent currentStatus={status} status="SUBMITTED" content={{}} />,
        },
      ];
    } else if (status === "Rejected") {
      steps = [
        {
          props: {
            active: true,
          },
          labelProps: {
            icon: <StatusIcon status="REJECTED" />,
          },
          contentProps: {
            style: {
              marginTop: "-50px",
            },
          },
          contentChildren: <StatusContent status="REJECTED" content={{}} history={history} />,
        },
        {
          props: {
            active: true,
          },
          labelProps: {
            icon: <StatusIcon status="SUBMITTED" />,
          },
          contentProps: {
            style: {
              marginTop: "-50px",
            },
          },
          contentChildren: <StatusContent status="SUBMITTED" content={{}} />,
        },
      ];
    }
    return (
      <div>
        <Card
          style={{
            paddingBottom: "0px",
          }}
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon action="action" name="timeline" color="#969696" />{" "}
                <Label label="Complaint Timeline" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
              </div>
              <div className="complaintTimeLineContainer">
                <TimeLine
                  stepperProps={{
                    orientation: "vertical",
                  }}
                  steps={steps}
                />
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withRouter(ComplaintTimeLine);

//props types check yet to add

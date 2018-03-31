import React, { Component } from "react";
import { Card, TimeLine, Icon, Image } from "../../../../../components";
import { withRouter } from "react-router-dom";
import Label from "utils/translationNode";
import garbageOne from "../../../../../assets/images/Garbage_3.jpg";
import "./index.css";

const timelineButtonLabelStyle = {
  height: 12,
  lineHeight: 1,
  color: "#ffffff",
};
const timelineButtonContainerStyle = {
  lineHeight: 1,
  height: 12,
};

const statusContainerStyle = {
  display: "inline-block",
};

const nameContainerStyle = {
  display: "inline-block",
  marginLeft: "3px",
};

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
  height: "12px",
  width: "12px",
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
  StatusContent;
};

const StatusContent = ({ status, currentStatus, content, history, handleFeedbackOpen, role, complaintNo }) => {
  var { date, name, designation, department, resolveImage, resolveFeedback, reason } = content;
  switch (status) {
    case "SUBMITTED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "11-Mar-18"} />
          <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_FILED" />
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
          <Label labelClassName="dark-color" containerStyle={statusContainerStyle} label="CS_COMMON_ASSIGNED_TO" />
          <Label labelClassName="dark-color" containerStyle={nameContainerStyle} label={`${name || "Satpal Singh"}`} />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
          />
          {role === "AO" && (
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

    case "REASSIGNED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "15-Mar-18"} />
          <Label labelClassName="dark-color" containerStyle={statusContainerStyle} label="CS_COMMON_REASSIGNED_TO" />
          <Label labelClassName="dark-color" containerStyle={nameContainerStyle} label={`${name || "Satpal Singh"}`} />
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
          <Label labelClassName="dark-color" label="CS_MYCOMPLAINTS_REJECTED" />
          <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={department || "Amritsar Municipal Corporation"} />
          <div
            className="complaint-details-timline-button"
            onClick={(e) => {
              history.push(`/citizen/reopen-complaint/${encodeURIComponent(complaintNo)}`);
            }}
          >
            <Label
              label="CS_COMPLAINT_DETAILS_REOPEN"
              fontSize="12px"
              labelStyle={timelineButtonLabelStyle}
              containerStyle={timelineButtonContainerStyle}
            />
          </div>
        </div>
      );
    case "UNASSIGNED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "11-Mar-18"} />
          <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_FILED" />
          <Label labelClassName="rainmaker-small-font" label={name || "Amrinder Singh"} />
          <div
            className="complaint-details-timline-button"
            onClick={(e) => {
              console.log("clicked");
            }}
          >
            <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
            CALL
          </div>
        </div>
      );
    case "REASSIGN-REQUESTED":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "12-Mar-18"} />
          <Label labelClassName="dark-color" label={"CS_COMPLAINT_DETAILS_REASSIGN_REQUESTED"} />
          <Label labelClassName="rainmaker-small-font" label={`Reason - ${reason || "Not my responsibility"}`} />
        </div>
      );
    default:
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={date || "18-Mar-18"} />
          <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED" />
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
                history.push(`/citizen/feedback/${encodeURIComponent(complaintNo)}`);
              }}
            >
              <Label
                label="CS_COMPLAINT_DETAILS_RATE"
                fontSize="12px"
                labelStyle={timelineButtonLabelStyle}
                containerStyle={timelineButtonContainerStyle}
              />
            </div>
            <div
              className="complaint-details-timline-button"
              onClick={(e) => {
                history.push(`/citizen/reopen-complaint/${encodeURIComponent(complaintNo)}`);
              }}
            >
              <Label
                label="CS_COMPLAINT_DETAILS_REOPEN"
                fontSize="12px"
                labelStyle={timelineButtonLabelStyle}
                containerStyle={timelineButtonContainerStyle}
              />
            </div>
          </div>
        </div>
      );
  }
};

const DueDate = ({ status, role, duedateText }) => {
  return <div className="Complaint-details-duedate">{duedateText}</div>;
};

class ComplaintTimeLine extends Component {
  render() {
    let { status, history, handleFeedbackOpen, role, complaintNo } = this.props;
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
        contentChildren: (
          <StatusContent status="RESOLVED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} complaintNo={complaintNo} />
        ),
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
        contentChildren: <StatusContent status="REASSIGNED" content={{}} handleFeedbackOpen={handleFeedbackOpen} role={role} />,
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
        contentChildren: <StatusContent status="ASSIGNED" content={{}} handleFeedbackOpen={handleFeedbackOpen} />,
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
        contentChildren: <StatusContent status="SUBMITTED" content={{}} handleFeedbackOpen={handleFeedbackOpen} />,
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="UNASSIGNED" />,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: <StatusContent status="UNASSIGNED" content={{}} handleFeedbackOpen={handleFeedbackOpen} />,
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
          contentChildren: <StatusContent currentStatus={status} status="SUBMITTED" content={{}} handleFeedbackOpen={handleFeedbackOpen} />,
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
          contentChildren: (
            <StatusContent status="REJECTED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} complaintNo={complaintNo} />
          ),
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
          contentChildren: <StatusContent status="SUBMITTED" content={{}} handleFeedbackOpen={handleFeedbackOpen} />,
        },
      ];
    } else if (status === "Unassigned") {
      steps = [
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
          contentChildren: <StatusContent status="UNASSIGNED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} />,
        },
      ];
    } else if (status === "Reassign") {
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
          contentChildren: <StatusContent status="REASSIGN-REQUESTED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} />,
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
          contentChildren: <StatusContent status="ASSIGNED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} role={role} />,
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
          contentChildren: <StatusContent status="UNASSIGNED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} />,
        },
      ];
    } else if (status === "Assign") {
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
          contentChildren: <StatusContent status="ASSIGNED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} role={role} />,
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
          contentChildren: <StatusContent status="UNASSIGNED" content={{}} history={history} handleFeedbackOpen={handleFeedbackOpen} />,
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
                <Label label="CS_COMPLAINT_DETAILS_COMPLAINT_TIMELINE" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
                {this.props.role === "AO" && <DueDate status="UnAssigned" duedateText={"Overdue by 1 day"} role="AO" />}
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

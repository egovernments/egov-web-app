import React, { Component } from "react";
import { Card, TimeLine, Icon, Image } from "components/";
import { withRouter } from "react-router-dom";
import Label from "utils/translationNode";
import "./index.css";
import { getDateFromEpoch } from "utils/commons";
import filter from "lodash/filter";

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
    case "open":
      return <Icon action="custom" name="file-send" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "assigned":
      return <Icon action="custom" name="file-plus" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "re-assign":
      return <Icon action="custom" name="file-plus" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "rejected":
      return <Icon action="content" name="clear" style={statusCommonIconStyle} color={"#f5a623"} />;
    default:
      return <Icon action="action" name="done" style={statusResolvedIconStyle} color={"#FFFFFF"} />;
    // default:
    //   return <div></div>
  }
};

//prventing number of times showing button for duplicate status
var openStatusCount = 0;
var openStatusCountForStatement = 0;
var rejectStatusCount = 0;
var resolveStatusCount = 0;
var assigneeStatusCount = 0;

const StatusContent = ({ stepData, currentStatus, changeRoute }) => {
  var {
    when: date,
    media,
    status,
    comments,
    name,
    designation,
    department,
    role,
    resolveImage,
    resolveFeedback,
    reason,
    businessKey: complaintNo,
  } = stepData;
  let employeephonenumber = 8940028343;
  switch (status) {
    case "open":
      openStatusCount++;
      openStatusCountForStatement--;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label
            labelClassName="dark-color"
            label={`${openStatusCountForStatement ? "Complaint Re-opened" : "CS_COMPLAINT_DETAILS_COMPLAINT_FILED"}`}
          />
          {currentStatus === "open" &&
            openStatusCount === 1 && (
              <div
                className="complaint-details-timline-button"
                onClick={(e) => {
                  console.log("clicked");
                }}
              >
                <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none" }} s>
                  <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
                  <span className="timeline-call-text">CALL</span>
                </a>
              </div>
            )}
        </div>
      );
    case "assigned":
      assigneeStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" containerStyle={statusContainerStyle} label="CS_COMMON_ASSIGNED_TO" />
          <Label labelClassName="dark-color" containerStyle={nameContainerStyle} label={`${name || "Satpal Singh"}`} />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
          />
          {(role === "AO" || currentStatus === "assigned") &&
            assigneeStatusCount === 1 && (
              <div
                className="complaint-details-timline-button"
                onClick={(e) => {
                  console.log("clicked");
                }}
              >
                <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none" }} s>
                  <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
                  <span className="timeline-call-text">CALL</span>
                </a>
              </div>
            )}
        </div>
      );

    case "re-assign":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" containerStyle={statusContainerStyle} label="CS_COMMON_REASSIGNED_TO" />
          <Label labelClassName="dark-color" containerStyle={nameContainerStyle} label={`${name || "Satpal Singh"}`} />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
          />
        </div>
      );
    case "rejected":
      rejectStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" label="CS_MYCOMPLAINTS_REJECTED" />
          <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={department || "Amritsar Municipal Corporation"} />
          {currentStatus === "Rejected" &&
            rejectStatusCount === 1 && (
              <div
                className="complaint-details-timline-button"
                onClick={(e) => {
                  changeRoute.push(`/citizen/reopen-complaint/${encodeURIComponent(complaintNo)}`);
                }}
              >
                <Label
                  label="CS_COMPLAINT_DETAILS_REOPEN"
                  fontSize="12px"
                  labelStyle={timelineButtonLabelStyle}
                  containerStyle={timelineButtonContainerStyle}
                />
              </div>
            )}
        </div>
      );
    // case "UNASSIGNED":
    //   return (
    //     <div className="complaint-timeline-content-section">
    //       <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
    //       <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_FILED" />
    //       <Label labelClassName="rainmaker-small-font" label={name || "Amrinder Singh"} />
    //       <div
    //         className="complaint-details-timline-button"
    //         onClick={(e) => {
    //         }}
    //       >
    //         <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
    //         CALL
    //       </div>
    //     </div>
    //   );
    // case "REASSIGN-REQUESTED":
    //   return (
    //     <div className="complaint-timeline-content-section">
    //       <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
    //       <Label labelClassName="dark-color" label={"CS_COMPLAINT_DETAILS_REASSIGN_REQUESTED"} />
    //       <Label labelClassName="rainmaker-small-font" label={`Reason - ${reason || "Not my responsibility"}`} />
    //     </div>
    //   );
    default:
      resolveStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED" />
          {media &&
            media.map((image, index) => {
              return (
                <div className="col-xs-4 complaint-detail-detail-section-padding-zero" key={index}>
                  <Image
                    style={{
                      width: "97px",
                      height: "93px",
                    }}
                    source={image}
                  />
                </div>
              );
            })}
          <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={comments} />
          {currentStatus === "Resolved" &&
            resolveStatusCount === 1 && (
              <div className="rainmaker-displayInline">
                <div
                  className="complaint-details-timline-button"
                  onClick={(e) => {
                    changeRoute.push(`/citizen/feedback/${encodeURIComponent(complaintNo)}`);
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
                    changeRoute.push(`/citizen/reopen-complaint/${encodeURIComponent(complaintNo)}`);
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
            )}
        </div>
      );

    // default:
    //   return <div></div>
  }
};

const DueDate = ({ status, role, duedateText }) => {
  return <div className="Complaint-details-duedate">{duedateText}</div>;
};

class ComplaintTimeLine extends Component {
  render() {
    openStatusCount = 0;
    rejectStatusCount = 0;
    resolveStatusCount = 0;
    assigneeStatusCount = 0;
    let { status, history, role, timeLine } = this.props;
    openStatusCountForStatement = filter(timeLine, { status: "open" }).length;

    // console.log(timeLine);

    let steps = timeLine.map((step, key) => {
      return {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status={step.status} />,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: <StatusContent stepData={step} currentStatus={status} changeRoute={history} />,
      };
    });

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

// [
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: <StatusIcon status="RESOLVED" />,
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     contentChildren: (
//       <StatusContent status="RESOLVED" content={{}} history={history}  complaintNo={complaintNo} />
//     ),
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: <StatusIcon status="ASSIGNED" />,
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     contentChildren: <StatusContent status="REASSIGNED" content={{}}  role={role} />,
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: <StatusIcon status="ASSIGNED" />,
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     contentChildren: <StatusContent status="ASSIGNED" content={{}}  />,
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: <StatusIcon status="SUBMITTED" />,
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     contentChildren: <StatusContent status="SUBMITTED" content={{}}  />,
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: <StatusIcon status="UNASSIGNED" />,
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     contentChildren: <StatusContent status="UNASSIGNED" content={{}}  />,
//   },
// ];
// if (status === "Submitted") {
//   steps = [
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="SUBMITTED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent currentStatus={status} status="SUBMITTED" content={{}}  />,
//     },
//   ];
// } else if (status === "Rejected") {
//   steps = [
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="REJECTED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: (
//         <StatusContent status="REJECTED" content={{}} history={history}  complaintNo={complaintNo} />
//       ),
//     },
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="SUBMITTED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="SUBMITTED" content={{}}  />,
//     },
//   ];
// } else if (status === "Unassigned") {
//   steps = [
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="ASSIGNED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="UNASSIGNED" content={{}} history={history}  />,
//     },
//   ];
// } else if (status === "Reassign") {
//   steps = [
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="SUBMITTED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="REASSIGN-REQUESTED" content={{}} history={history}  />,
//     },
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="SUBMITTED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="ASSIGNED" content={{}} history={history}  role={role} />,
//     },
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="ASSIGNED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="UNASSIGNED" content={{}} history={history}  />,
//     },
//   ];
// } else if (status === "Assign") {
//   steps = [
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="SUBMITTED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="ASSIGNED" content={{}} history={history}  role={role} />,
//     },
//     {
//       props: {
//         active: true,
//       },
//       labelProps: {
//         icon: <StatusIcon status="ASSIGNED" />,
//       },
//       contentProps: {
//         style: {
//           marginTop: "-50px",
//         },
//       },
//       contentChildren: <StatusContent status="UNASSIGNED" content={{}} history={history}  />,
//     },
//   ];
// }

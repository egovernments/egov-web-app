import React, { Component } from "react";
import { Card, TimeLine, Icon, Image } from "components/";
import { withRouter } from "react-router-dom";
import Label from "utils/translationNode";
import "./index.css";
import { getDateFromEpoch, isImage } from "utils/commons";

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

const statusRejectedIconStyle = {
  ...timelineIconCommonStyle,
  backgroundColor: "#e74c3c",
  // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.22)",
  border: "solid 1px #e74c3c",
};

const callIconStyle = {
  marginLeft: "17px",
  height: "17px",
  width: "17px",
  borderRadius: "50%",
  position: "absolute",
  top: "0px",
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "open":
      return <Icon action="custom" name="file-send" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "assigned":
    case "reassignrequested":
    case "re-assign":
      return <Icon action="custom" name="file-plus" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "rejected":
      return <Icon action="content" name="clear" style={statusRejectedIconStyle} color={"#FFFFFF"} />;
    case "resolved":
      return <Icon action="action" name="done" style={statusResolvedIconStyle} color={"#FFFFFF"} />;
    case "closed":
      return <Icon action="action" name="stars" style={statusResolvedIconStyle} color={"#FFFFFF"} />;
  }
};

//prventing number of times showing button for duplicate status
var openStatusCount = 0;
var rejectStatusCount = 0;
var resolveStatusCount = 0;
var assigneeStatusCount = 0;
var reassignRequestedCount = 0;

const StatusContent = ({ stepData, currentStatus, changeRoute, feedback, rating, role, filedBy }) => {
  var { action, when: date, media, status, comments, name, designation, department, businessKey: complaintNo } = stepData;
  let employeephonenumber = 9090909091;

  switch (status) {
    case "open":
      openStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label
            labelClassName="dark-color"
            containerStyle={statusContainerStyle}
            label={`${action === "reopen" ? "CS_COMMON_COMPLAINT_REOPENED" : role ? `Filed By ${filedBy}` : `CS_COMPLAINT_DETAILS_COMPLAINT_FILED`}`}
          />
          {((role && action !== "reopen" && currentStatus === "open") || (!role && action === "reopen" && currentStatus === "open")) &&
            openStatusCount === 1 && (
              <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none", position: "relative" }}>
                <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
              </a>
            )}
          {action === "reopen" && (
            <div>
              <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={comments ? comments.split(";")[0] : ""} />
              {media && (
                <div style={{ display: "flex" }}>
                  {media.map((image, index) => {
                    return (
                      isImage(image) && (
                        <div style={{ marginRight: 8 }} className="complaint-detail-detail-section-padding-zero" key={index}>
                          <Image
                            style={{
                              width: "97px",
                              height: "93px",
                            }}
                            source={image}
                          />
                        </div>
                      )
                    );
                  })}
                </div>
              )}
              <Label
                labelClassName="rainmaker-small-font"
                containerStyle={{ width: "192px" }}
                label={comments && comments.split(";")[1] ? `" ${comments.split(";")[1]} "` : ""}
              />
            </div>
          )}
          {/* {currentStatus === "open" &&
            openStatusCount === 1 && (
              <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none" }} >
                <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
              </a>
              //// <div
              //   className="complaint-details-timline-button"
              //   onClick={(e) => {
              //     console.log("clicked");
              //   }}
              // >
              //   <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none" }} s>
              //     <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
              //   </a>
              // </div>
           // )}*/}
        </div>
      );
    case "assigned":
      assigneeStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label
            labelClassName="dark-color"
            containerStyle={statusContainerStyle}
            label={`${action == "assign" ? "CS_COMMON_ASSIGNED_TO" : "CS_COMMON_REASSIGNED_TO"}`}
          />
          <Label labelClassName="dark-color" containerStyle={nameContainerStyle} label={`${name || "Satpal Singh"}`} />
          {(role === "AO" || currentStatus === "assigned") &&
            assigneeStatusCount === 1 && (
              <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none", position: "relative" }}>
                <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
              </a>
            )}
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
          />

          {/* // <div
              //   className="complaint-details-timline-button"
              //   onClick={(e) => {
              //     console.log("clicked");
              //   }}
              // >
              //   <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none" }} s>
              //     <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
              //   </a>
              // </div> */}
        </div>
      );
    case "reassignrequested":
      reassignRequestedCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          {!role && (
            <div>
              <Label
                labelClassName="dark-color"
                containerStyle={statusContainerStyle}
                label={`${"Complaint is being re-assigned by Chiranjeet Anand"}`}
              />
              {currentStatus === "reassignrequested" &&
                reassignRequestedCount === 1 && (
                  <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none", position: "relative" }}>
                    <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
                  </a>
                )}
            </div>
          )}
          {role && (
            <div>
              <Label labelClassName="dark-color" containerStyle={statusContainerStyle} label={`${"Re-Assign requested"}`} />
              {currentStatus === "reassignrequested" &&
                reassignRequestedCount === 1 && (
                  <a href={`tel:+91${employeephonenumber}`} style={{ textDecoration: "none", position: "relative" }}>
                    <Icon action="communication" name="call" style={callIconStyle} color={"#22b25f"} />
                  </a>
                )}

              <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={comments ? comments.split(";")[0] : ""} />
              <Label
                labelClassName="rainmaker-small-font"
                containerStyle={{ width: "192px" }}
                label={comments && comments.split(";")[1] ? `" ${comments.split(";")[1]} "` : ""}
              />
            </div>
          )}
        </div>
      );

    // case "re-assign":
    //   return (
    //     <div className="complaint-timeline-content-section">
    //       <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
    //       <Label labelClassName="dark-color" containerStyle={statusContainerStyle} label="CS_COMMON_REASSIGNED_TO" />
    //       <Label labelClassName="dark-color" containerStyle={nameContainerStyle} label={`${name || "Satpal Singh"}`} />
    //       <Label
    //         labelClassName="rainmaker-small-font"
    //         containerStyle={{ width: "192px" }}
    //         label={`${designation || "Jr.Inspector"} - ${department || "Health & Sanitation"}`}
    //       />
    //     </div>
    //   );
    case "rejected":
      rejectStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" label="CS_MYCOMPLAINTS_REJECTED" />
          <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={comments ? comments.split(";")[0] : ""} />
          <Label
            labelClassName="rainmaker-small-font"
            containerStyle={{ width: "192px" }}
            label={comments && comments.split(";")[1] ? `" ${comments.split(";")[1]} "` : ""}
          />
          {currentStatus === "rejected" &&
            !role &&
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
    case "resolved":
      resolveStatusCount++;
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED" />
          {media && (
            <div style={{ display: "flex" }}>
              {media.map((image, index) => {
                return (
                  isImage(image) && (
                    <div style={{ marginRight: 8 }} className="complaint-detail-detail-section-padding-zero" key={index}>
                      <Image
                        style={{
                          width: "97px",
                          height: "93px",
                        }}
                        source={image}
                      />
                    </div>
                  )
                );
              })}
            </div>
          )}

          <Label labelClassName="rainmaker-small-font" containerStyle={{ width: "192px" }} label={comments} />
          {currentStatus === "resolved" &&
            !role &&
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

    case "closed":
      return (
        <div className="complaint-timeline-content-section">
          <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
          <Label labelClassName="dark-color" label="CS_COMMON_CITIZEN_FEEDBACK" />
          <div style={{ display: "flex" }}>
            {" "}
            <Label labelClassName="rainmaker-small-font" labelStyle={{ color: "#22b25f" }} label={`${rating}/5 `} />{" "}
            <Label labelClassName="rainmaker-small-font" label={` ( ${feedback})`} />
          </div>
          <Label labelClassName="rainmaker-small-font" label={`" ${comments} "`} />
        </div>
      );
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
    reassignRequestedCount = 0;
    let { status, history, role, timeLine, feedback, rating, filedBy } = this.props;

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
            paddingRight: 0,
          },
        },
        contentChildren: (
          <StatusContent
            stepData={step}
            currentStatus={status.toLowerCase()}
            changeRoute={history}
            feedback={feedback}
            rating={rating}
            role={role}
            filedBy={filedBy}
          />
        ),
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
                <Icon action="action" name="timeline" color="#767676" />{" "}
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

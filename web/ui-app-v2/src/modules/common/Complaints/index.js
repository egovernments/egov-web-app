import React from "react";
import { Image, Card, Icon, Button, Label } from "../../../components";
import { withRouter } from "react-router-dom";
import "./index.css";

const status = { OPEN: "filed", CLOSED: "resolved", REJECTED: "rejected" };

const imageStyles = {
  minHeight: "87px",
};

const bottomInfoTemplate = (item, role) => {
  return role !== "citizen" ? (
    <div>
      {item.complaintStatus === "ASSIGNED" && (
        <div className="employee-bottom-info-cont">
          <div className="submitted-by-text">
            {role === "ao" ? (
              <div>
                <span>Assigned To : </span>
                <span style={{ color: "#464646" }}>{item.assignedTo}</span>
              </div>
            ) : (
              <div>
                <span>Submitted By : </span>
                <span style={{ color: "#464646" }}>{item.submittedBy}</span>
              </div>
            )}
          </div>
          <Button
            primary={true}
            label={"CALL"}
            style={{
              height: "auto",
              lineHeight: "auto",
              minWidth: "inherit",
            }}
            labelStyle={{
              color: "#ffffff",
              padding: "0 12px 0 0 ",
              letterSpacing: "0.6px",
              display: "inline-block",
              height: "35px",
              fontSize: "12px",
              lineHeight: "35px",
            }}
            icon={
              <Icon
                action="communication"
                name="call"
                style={{
                  height: "12px",
                  width: "12px",
                  marginRight: "7px",
                }}
                color={"#ffffff"}
              />
            }
            onClick={(e) => {
              console.log("clicked");
            }}
          />
        </div>
      )}
      {item.escalatedTo && (
        <div className="submitted-by-text">
          Escalated To: <span style={{ color: "#464646" }}>{item.escalatedTo}</span>
        </div>
      )}
      {item.reassign && (
        <div className="employee-bottom-msg">
          <Label label={role === "ao" ? "Dharmendra Pal requested for re-assign" : "You have requested for re-assign"} dark={true} />
        </div>
      )}
    </div>
  ) : (
    ""
  );
};
const getStatusAndChangeColor = (status, assignee) => {
  let statusObj = {
    style: {},
    message: "",
  };
  switch (status) {
    case "OPEN":
      statusObj.style = {
        color: "#f89a3f",
      };
      statusObj.message = `Complaint Re-assigned to ${assignee}`;
      break;
    case "CLOSED":
      statusObj.style = {
        color: "#5385a6",
      };
      statusObj.message = `Complaint resolved. Please rate`;
      break;
    case "REJECTED":
      statusObj.style = {
        color: "#5385a6",
      };
      statusObj.message = `Complaint has been rejected`;
      break;
    case "Overdue by 1 day":
      statusObj.style = {
        color: "#e74c3c",
      };
      statusObj.message = ``;
      break;
    case "2 days left":
      statusObj.style = {
        color: "#22b25f",
      };
      statusObj.message = ``;
      break;
    default:
      statusObj.style = {
        color: "#484848",
      };
      statusObj.message = `Complaint Re-assigned to ${assignee}`;
  }
  return statusObj;
};

const Complaints = ({ index, complaints, history, onClick, complaintLocation, track, role }) => {
  return complaints.map((complaint, complaintIndex) => {
    return (
      <div id={"complaint-" + index} className="complaints-card-main-cont" key={`complaint-${complaintIndex}`}>
        <Card
          className="complaint-card"
          textChildren={
            <div className="complaint-card-wrapper">
              <div className="complaint-header-cont">
                <span className="complaint-header text-bold dark-color">{complaint.header}</span>
                <span className="complaint-status-text text-bold" style={getStatusAndChangeColor(complaint.status).style}>{` ${
                  complaint.status
                }`}</span>
              </div>
              <div className="complaint-date-cont">
                <Icon action="action" name="date-range" />
                <span className="complaint-date">{complaint.date}</span>
              </div>
              <div className="complaint-number-cont">
                <span className="complaint-number complaint-date">Complaint No {complaint.complaintNo}</span>
              </div>
              {complaintLocation && (
                <div className="complaint-address-cont">
                  <Icon action="maps" name="place" style={{ height: 14, width: 14, marginRight: 5 }} color={"#767676"} />
                  <span className="complaint-address">{complaint.address}</span>
                </div>
              )}
              <div className="complaint-image-cont">
                {complaint.images.map((image, index) => {
                  return (
                    <div className="complaint-image-wrapper" key={index}>
                      <Image
                        style={imageStyles}
                        className="complaint-image"
                        width="100%"
                        height={46}
                        source={image.source}
                        onClick={() => onClick(image.source)}
                      />{" "}
                    </div>
                  );
                })}
              </div>
              {role === "citizen" && (
                <div className="complaint-status-cont">
                  <span className="complaint-status-text dark-color">{getStatusAndChangeColor(complaint.status, complaint.assignee).message}</span>
                </div>
              )}
              {track && (
                <div className="complaint-track-button-cont">
                  <Button
                    primary={true}
                    label={"TRACK"}
                    style={{
                      height: "auto",
                      lineHeight: "auto",
                      minWidth: "inherit",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                      padding: "0 16px",
                      letterSpacing: "0.6px",
                      display: "inline-block",
                      height: "35px",
                      fontSize: "12px",
                      lineHeight: "35px",
                    }}
                    onClick={(e) => {
                      history.push(`/citizen/complaint-details?status=${status[complaint.status]}`);
                    }}
                  />
                </div>
              )}
              {bottomInfoTemplate(complaint, role)}
            </div>
          }
        />
      </div>
    );
  });
};

export default withRouter(Complaints);

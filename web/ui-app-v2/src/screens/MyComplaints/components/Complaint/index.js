import React from "react";
import { Image, Card, Icon, Button } from "../../../../components";
import { withRouter } from "react-router-dom";
import "./index.css";

const status={"OPEN":"filed","CLOSED":"resolved","REJECTED":"rejected"}

const imageStyles = {
  minHeight: "87px",
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
    default:
      statusObj.style = {
        color: "#484848",
      };
      statusObj.message = `Complaint Re-assigned to ${assignee}`;
  }
  return statusObj;
};


const Complaint = ({ index, item, history, onClick }) => {
  return (
    <div id={"complaint-" + index} className="complaints-card-main-cont">
      <Card
        className="complaint-card"
        textChildren={
          <div className="complaint-card-wrapper">
            <div className="complaint-header-cont">
              <span className="complaint-header text-bold dark-color">{item.header}</span>
              <span className="complaint-status-text text-bold" style={getStatusAndChangeColor(item.status).style}>{` ${item.status}`}</span>
            </div>
            <div className="complaint-date-cont">
              <Icon action="action" name="date-range" />
              <span className="complaint-date">{item.date}</span>
            </div>
            <div className="complaint-number-cont">
              <span className="complaint-number complaint-date">Complaint No {item.complaintNo}</span>
            </div>
            <div className="complaint-image-cont">
              {item.images.map((image, index) => {
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
            <div className="complaint-status-cont">
              <span className="complaint-status-text dark-color">{getStatusAndChangeColor(item.status, item.assignee).message}</span>
            </div>
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
                  height: "14px",
                  fontSize: "12px",
                  lineHeight: "14px",
                }}
                onClick={(e)=>{
                  history.push(`/complaint-details?status=${status[item.status]}`)
                }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default withRouter(Complaint);

import React from "react";
import { Image, Card, Icon, Button } from "../../../../components";
import FlatButton from "material-ui/FlatButton";
import { withRouter } from "react-router-dom";
import "./index.css";

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
              {/* <FlatButton
                onClick={(e) => {
                  if (item.status == "ASSIGNED") {
                    history.push("/complaint-details?status=assigned");
                  } else if (item.status == "REJECTED") {
                    history.push("/complaint-details?status=rejected");
                  }
                }}
                className="complaint-track-button"
                backgroundColor="transparent"
                label={"Track"}
                style={{
                  border: "1px solid #f5a623",
                  height: "auto",
                  lineHeight: "auto",
                  padding: "4px 8px",
                  minWidth: "inherit",
                }}
                labelStyle={{
                  color: "#f5a623",
                  padding: 0,
                  letterSpacing: "0.3px",
                  display: "inline-block",
                  height: "14px",
                  lineHeight: "14px",
                }}
                hoverColor="none"
              /> */}
              {<span className="complaint-status-text text-bold" style={getStatusAndChangeColor(item.status).style}>{` ${item.status}`}</span>}
            </div>
            <div className="complaint-date-cont">
              <Icon action="action" name="date-range" />
              <span className="complaint-date">{item.date}</span>
            </div>
            <div className="complaint-number-cont">
              <span className="complaint-number cpmplaint-date">Complaint No {item.complaintNo}</span>
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
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default withRouter(Complaint);

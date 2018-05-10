import React from "react";
import { Card, Icon } from "components";
import Label from "utils/translationNode";
import "./index.css";

const Updates = ({ notifications = [] }) => {
  const renderUpdate = (notification, index) => {
    const { title, date, status, amountDue, dueDate } = notification;
    return (
      <Card
        className="col-xs-12"
        style={{ margin: "8px 0px" }}
        key={index}
        id={`home-notification${index}`}
        textChildren={
          <div className="update">
            <div className="notification-top-content">
              <Label
                leftWrapperStyle
                fontSize={16}
                dark={true}
                bold={true}
                label={title}
                containerStyle={{ width: "80%" }}
                labelStyle={{ width: "100%", wordWrap: "break-word" }}
              />
              <Icon style={{ color: "#5385a6" }} action="custom" name="notifications" />
            </div>
            <div className="notification-top-content" style={{ justifyContent: "flex-start" }}>
              <Icon style={{ width: "16px", height: "16px" }} action="custom" name="calendar" />
              <Label fontSize={12} label={date} labelStyle={{ paddingLeft: "5px" }} containerStyle={{ display: "inline-block" }} />
            </div>
            <div className="complaint-status" style={{ marginTop: "16px" }}>
              <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} dark={true} label={status} />
            </div>
          </div>
        }
      />
    );
  };

  return <div>{notifications.map((notification, index) => renderUpdate(notification, index))}</div>;
};

export default Updates;

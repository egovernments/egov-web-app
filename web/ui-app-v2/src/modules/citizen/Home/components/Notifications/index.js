import React from "react";
import { Card, Icon, Button } from "components";
import Label from "utils/translationNode";
import "./index.css";

const Updates = ({ notifications = [] }) => {
  const renderUpdate = (notification, index) => {
    const { title, date, status, amountDue, dueDate } = notification;
    return (
      <Card
        className="col-xs-12 home-notification"
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
            <div>
              <Label fontSize={12} label="Amount due : " containerStyle={{ display: "inline-block" }} />
              <Label fontSize={12} label={amountDue} containerStyle={{ display: "inline-block" }} />
            </div>
            <div className="notification-top-content" style={{ justifyContent: "flex-start" }}>
              <Label fontSize={12} label="Due Date : " containerStyle={{ display: "inline-block" }} />
              <Label fontSize={12} label={dueDate} labelStyle={{ paddingLeft: "5px" }} containerStyle={{ display: "inline-block" }} />
            </div>
            <div className="pay-button-cont">
              <Button
                id="home-notification-pay-button"
                primary={true}
                style={{
                  height: "22px",
                  lineHeight: "auto",
                  minWidth: "inherit",
                  width: "72px",
                }}
                label={<Label buttonLabel={true} fontSize="12px" label="PAY" />}
                fullWidth={true}
                onClick={this.continueComplaintSubmit}
              />
            </div>
          </div>
        }
      />
    );
  };

  return <div>{notifications.map((notification, index) => renderUpdate(notification, index))}</div>;
};

export default Updates;

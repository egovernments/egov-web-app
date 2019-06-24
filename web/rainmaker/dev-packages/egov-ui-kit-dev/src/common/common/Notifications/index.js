import React from "react";
import { Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const Notifications = ({ notifications = [], history }) => {
  const renderUpdate = (notification, index) => {
    const { title, dueTime, buttons } = notification;
    return (
      <Card
        className="home-notification"
        style={{ margin: "8px 0px" }}
        key={index}
        id={`home-notification${index}`}
        style={{ padding: "12px 8px" }}
        textChildren={
          <div className="update">
            <Label leftWrapperStyle fontSize={14} color="rgba(0, 0, 0, 0.60)" label={title} labelStyle={{ width: "100%", wordWrap: "break-word" }} />
            <div style={{ marginTop: 5, display: "flex" }}>
              {buttons.map((button, index) => {
                return (
                  <div
                    onClick={() => {
                      history.push(button.route);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Label
                      label={button.label}
                      color="#fe7a51"
                      fontSize={14}
                      containerStyle={index != buttons.length - 1 ? { marginRight: 30 } : {}}
                    />
                  </div>
                );
              })}
            </div>

            <Label label={dueTime} containerStyle={{ marginTop: 10 }} color="rgba(0, 0, 0, 0.60)" />
          </div>
        }
      />
    );
  };

  return <div>{notifications.map((notification, index) => renderUpdate(notification, index))}</div>;
};

export default Notifications;

import React from "react";
import { Card, Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const Notifications = ({ notifications = [], history }) => {
  const renderUpdate = (notification, index) => {
    const { title, dueTime, buttons, address, name, SLA } = notification;
    return (
      <Card
        className="home-notification"
        style={{ margin: "8px 0px" }}
        key={index}
        id={`home-notification${index}`}
        style={{ padding: "12px 8px" }}
        textChildren={
          <div className="update">
            <Label
              leftWrapperStyle
              fontSize={16}
              color="rgba(0, 0, 0, 0.87)"
              label={name}
              labelStyle={{ width: "100%", wordWrap: "break-word" }}
              containerStyle={{ marginBottom: 5 }}
            />
            <Label
              leftWrapperStyle
              fontSize={14}
              color="rgba(0, 0, 0, 0.60)"
              label={title}
              labelStyle={{ width: "100%", wordWrap: "break-word" }}
              containerStyle={{ marginBottom: 5 }}
            />
            {address && (
              <div className="rainmaker-displayInline">
                <Icon name="place" action="maps" style={{ height: "20px", width: "35px", marginRight: 5 }} />
                <Label
                  leftWrapperStyle
                  fontSize={14}
                  color="rgba(0, 0, 0, 0.60)"
                  label={address}
                  labelStyle={{ width: "100%", wordWrap: "break-word" }}
                  containerStyle={{ marginBottom: 5 }}
                />
              </div>
            )}

            {buttons && (
              <div style={{ marginTop: 5, display: "flex" }}>
                {buttons.map((button, index) => {
                  return (
                    <div
                      onClick={() => {
                        history.push(button.route);
                      }}
                      style={{ cursor: "pointer", marginBottom: 10 }}
                    >
                      <Label
                        label={`CS_COMMON_${button.label}`}
                        color="primary"
                        fontSize={14}
                        containerStyle={index != buttons.length - 1 ? { marginRight: 30 } : {}}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            { SLA }
          </div>
        }
      />
    );
  };

  return <div>{notifications.map((notification, index) => renderUpdate(notification, index))}</div>;
};

export default Notifications;

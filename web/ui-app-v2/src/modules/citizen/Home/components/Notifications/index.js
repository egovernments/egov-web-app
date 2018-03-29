import React from "react";
import { Card, Icon } from "../../../../../components";
import VerticalCenterWrapper from "../../../../common/VerticalCenterWrapper";
import Label from "utils/translationNode";
import "./index.css";

const Updates = ({ updates }) => {
  const renderUpdate = (update, index) => {
    const { title, date, status } = update;
    return (
      <Card
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
              <Label containerStyle={{ display: "inline-block" }} label="CS_HOME_STATUS_PREFIX" />
              <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} dark={true} label={`${status}`} />
            </div>
          </div>
        }
      />
    );
  };

  return <div>{updates.map((update, index) => renderUpdate(update, index))}</div>;
};

export default Updates;

import React from "react";
import { Card, Icon } from "components";
import Label from "utils/translationNode";
import "./index.css";

const Updates = ({ updates, history }) => {
  const renderUpdate = (update, index) => {
    const { title, date, status } = update;
    let transformedstatus = "";
    const titleKey =
      "COMMON_" +
      title
        .match(/\w+/g)
        .join("_")
        .toUpperCase();
    if (status.toLowerCase() == "opened") {
      transformedstatus = `CS_COMMON_SUBMITTED`;
    } else {
      transformedstatus = `CS_COMMON_${status.toUpperCase()}`;
    }
    return (
      <Card
        style={{ margin: "8px 0px" }}
        key={index}
        id={`home-notification${index}`}
        textChildren={
          <div
            className="update"
            onClick={() => {
              history.push(`/citizen/complaint-details/${encodeURIComponent(update.number)}`);
            }}
          >
            <div className="notification-top-content">
              <Label
                leftWrapperStyle
                fontSize={16}
                dark={true}
                bold={true}
                label={titleKey}
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
              <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} dark={true} label={`${transformedstatus}`} />
            </div>
          </div>
        }
      />
    );
  };

  return <div>{updates.map((update, index) => renderUpdate(update, index))}</div>;
};

export default Updates;

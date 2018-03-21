import React from "react";
import { Card, Icon, Label } from "../../../../components";
import VerticalCenterWrapper from "../../../common/VerticalCenterWrapper";
import "./index.css";

const Updates = ({ updates }) => {
  const renderUpdate = (update, index) => {
    const { title, date, status } = update;
    return (
      <Card
        style={{ margin: "8px 0px" }}
        key={index}
        textChildren={
          <div className="update">
            <VerticalCenterWrapper
              leftWrapperStyle={{ width: "100%" }}
              leftChildren={<Label leftWrapperStyle fontSize={16} dark={true} bold={true} label={title} />}
              rightChildren={<Icon style={{ color: "#5385a6" }} action="custom" name="notifications" />}
            />
            <VerticalCenterWrapper
              leftChildren={<Icon style={{ width: "16px", height: "16px" }} action="custom" name="calendar" />}
              rightChildren={<Label fontSize={12} label={date} />}
              rightWrapperStyle={{ paddingLeft: "5px", width: "100%" }}
            />
            <div className="complaint-status" style={{ marginTop: "16px" }}>
              <Label containerStyle={{ display: "inline-block" }} label="Your complaint has been" />
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

import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import VerticalCenterWrapper from "../../../common/VerticalCenterWrapper";
import "./index.css";

// currently the card is hardcoded, ideally should be driven by data
class Updates extends Component {
  updates = [
    {
      title: "Contamination of water",
      date: "10-Mar-18",
      status: "Re-Assigned",
    },
    {
      title: "Dog menace",
      date: "10-Mar-18",
      status: "Rejected",
    },
  ];

  renderUpdate = (update, index) => {
    const { title, date, status } = update;
    return (
      <Card
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
              <Label containerStyle={{ display: "inline-block", marginLeft:"4px" }} dark={true} label={`${status}`} />
            </div>
          </div>
        }
      />
    );
  };

  render() {
    return <div>{this.updates.map((update, index) => this.renderUpdate(update, index))}</div>;
  }
}

export default Updates;

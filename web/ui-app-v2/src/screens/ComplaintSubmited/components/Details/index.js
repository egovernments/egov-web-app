import React, { Component } from "react";
import { List, Card, Label, Image } from "../../../../components";

import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ActionInfo from "material-ui/svg-icons/action/info";
import Location from "material-ui/svg-icons/maps/place";
import Avatar from "material-ui/Avatar";

import NewComplaint from "material-ui/svg-icons/notification/sms-failed";
import "./index.css";

import garbageOne from "../../../../assets/images/Garbage_3.jpg";
import garbageTwo from "../../../../assets/images/Garbage_4.jpg";
import garbageThree from "../../../../assets/images/Garbage_6.jpg";

const iconStyle = {
  marginRight: "10px",
  height: "18px",
  width: "18px",
};

const items = [
  {
    primaryText: <div className="dark-heading">COMPLAINT DETAILS</div>,
    leftIcon: <NewComplaint color="#969696"/>,
    initiallyOpen: false,
    primaryTogglesNestedList: true
  },
];

class Details extends Component {
  render() {
    return (
      <div>
        <Card
          card={{
            style: {
              backgroundColor: "#fff",
              padding: "12px 7px 18px 7px",
            },
          }}
          textChildren={<div>
            <div key={10} className="container complaint-detail-full-width">
            <div className="complaint-detail-detail-section-status row">
              <Label className="col-xs-7 status-color" label="APPLICATION NO" />
              <Label
                labelStyle={{ color: "inherit" }}
                className="col-xs-5 status-result-color"
                label="25467895"
              />
            </div>
            <br />
              <div className="complaint-detail-detail-section-status row">
                <Label className="col-xs-7 status-color" label="COMPLAINT" />
                <Label
                  className="col-xs-5 status-result-color textWrap complaint-detail-detail-section-collapse-status-padding"
                  label="Overflowing of bins"
                  labelStyle={{ color: "inherit" }}
                />
              </div>
            <br/>
              <div className="complaint-detail-detail-section-status row">
                <Label className="col-xs-7 status-color" label="LOCATION" />
                <Label className="col-xs-5 status-result-color" labelStyle={{ color: "inherit" }} label="Ward No.6" />
              </div>
              <br />
              <div className="complaint-detail-detail-section-status row">
                <Label className="col-xs-7 status-color" label="DATE OF APPLICATION" />
                <Label
                  labelStyle={{ color: "inherit" }}
                  className="col-xs-5 status-result-color"
                  label="01-03-2017"
                />
              </div>
              <br />
            </div>
          </div>}
        />
      </div>
    );
  }
}

export default Details;

import React, { Component } from "react";
import { List, Card, Label, Image } from "../../../../components";
import NewComplaint from "material-ui/svg-icons/notification/sms-failed";
import "./index.css";

class Details extends Component {
  render() {
    return (
      <div>
        <Card
          card={{
            style: {
              backgroundColor: "#fff",
              padding: "0px 0px 25px 0px",
            },
          }}
          textChildren={
            <div>
              <div key={10} className="container complaint-detail-full-width">
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-7 status-color" label="STATUS" />
                  <Label className="col-xs-5 status-result-color" labelStyle={{ color: "inherit" }} label="Assigned" />
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
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-7 status-color" label="APPLICATION NO" />
                  <Label labelStyle={{ color: "inherit" }} className="col-xs-5 status-result-color" label="25467895" />
                </div>
                <br />
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-7 status-color" label="DATE OF APPLICATION" />
                  <Label labelStyle={{ color: "inherit" }} className="col-xs-5 status-result-color" label="01-03-2017" />
                </div>
                <br />
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default Details;

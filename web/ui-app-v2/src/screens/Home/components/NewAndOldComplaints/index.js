import React from "react";
import { Card, Icon, Label } from "../../../../components";
import "./index.css";

const cardStyle = {
  padding: "32px 16px",
};

const iconStyle = {
  padding: "12px",
  width: "48px",
  height: "48px",
  color: "#fff",
  borderRadius: "50%",
};

const NewAndOldComplaints = ({ history }) => {
  return (
    <Card
      style={cardStyle}
      textChildren={
        <div className="row newAndOldComplaints-content-section">
          <div
            id="home-new-complaint"
            className="col-xs-6"
            onClick={(e) => {
              history.push("/add-complaint");
            }}
          >
            <Icon style={{ ...iconStyle, background: "#f5a623" }} action="content" name="add" />
            <Label containerStyle={{ marginTop: "10px" }} color="#484848" bold={true} fontSize={16} label="File Complaint" />
          </div>
          <div
            id="home-old-complaint"
            className="col-xs-6"
            onClick={(e) => {
              history.push("/my-complaints");
            }}
          >
            <Icon style={{ height: "48px", color: "#fff", width: "48px" }} action="custom" name="my-complaint" />

            <Label containerStyle={{ marginTop: "10px" }} color="#484848" bold={true} fontSize={16} label="My Complaints" />
          </div>
        </div>
      }
    />
  );
};

export default NewAndOldComplaints;

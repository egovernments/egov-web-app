import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import { withRouter } from "react-router-dom";
import "./index.css";

const cardStyle = {
  style: {
    padding: "50px 16px 16px 16px",
  },
};

const iconStyle = {
  padding: "12px",
  width: "48px",
  height: "48px",
  color: "#fff",
  borderRadius: "50%",
};

class NewAndOldComplaints extends Component {
  render() {
    let { history } = this.props;
    return (
      <Card
        textChildren={
          <div className="row newAndOldComplaints-content-section">
            <div id="home-new-complaint" className="col-xs-6">
              <Icon style={{ ...iconStyle, background: "#f5a623" }} action="content" name="add" />
              <Label containerStyle={{ marginTop: "10px" }} color="#484848" bold={true} label="File Complaint" />
            </div>
            <div
              id="home-old-complaint"
              className="col-xs-6"
              onClick={e => {
                history.push("/my-complaints");
              }}
            >
              <Icon style={{ ...iconStyle, background: "#73aacc" }} action="file" name="folder" />
              <Label containerStyle={{ marginTop: "10px" }} color="#484848" bold={true} label="My Complaints" />
            </div>
          </div>
        }
      />
    );
  }
}

export default withRouter(NewAndOldComplaints);

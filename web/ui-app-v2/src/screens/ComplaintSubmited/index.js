import React, { Component } from "react";
import { Card, Label, Icon } from "../../components";
import "./index.css";

class ComplaintDetails extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("");
    }, 6000);
  }
  render() {
    let complaintnumber = 25436789;
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 zeropadding complaint-submitted-card">
        <Card
          textChildren={
            <div>
              <div className="complaint-submitted-boldlabel">
                <Label label={"Complaint Registerd Successfully"} />
                <Icon name={"check"} action={"navigation"} style={{ fill: "#ffffff", background: "#73b332", marginBottom: "20px" }} />
                <Label label={"Thank You!"} />
                <Label label={`Complaint Number. ${complaintnumber}`} />
              </div>
              <div className="complaint-submitted-label">
                <Label label={`You can track the status of your complaint on this app anytime!`} />
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default ComplaintDetails;

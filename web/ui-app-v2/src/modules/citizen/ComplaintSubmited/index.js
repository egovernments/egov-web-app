import React, { Component } from "react";
import { Icon, Button } from "../../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { connect } from "react-redux";
import Screen from "../../common/Screen";
import Label from "utils/translationNode";
import "./index.css";

class ComplaintDetails extends Component {
  continueComplaintSubmit = () => {
    this.props.history.push("/citizen");
  };
  render() {
    let complaintnumber = this.props.form.redirectionRoute.split("=")[1];
    return (
      <div>
        <Screen className="complaint-submitted-card">
          <div className="complaint-submitted-boldlabel">
            <Label label="CS_COMPLAINT_SUBMITTED_LABEL1" fontSize="16px" />
            <FloatingActionButton backgroundColor="#22b25f" style={{ marginBottom: "16px" }}>
              <Icon name={"check"} action={"navigation"} />
            </FloatingActionButton>
            <Label id="thank-you-text" label="CS_COMPLAINT_SUBMITTED_THANKYOU" fontSize="16px" />
            <div className="complaint-submitted-complaintNo-cont">
              <Label label="CS_COMMON_COMPLAINT_NO" fontSize="16px" />
              <Label className="complaint-number-value" label={complaintnumber} containerStyle={{ marginLeft: 5 }} labelStyle={{ lineHeight: 1.5 }} />
            </div>
          </div>
          <div className="complaint-submitted-label">
            <Label id="complaint-submitted-success-message" label="CS_COMPLAINT_SUBMITTED_LABEL2" />
          </div>
          <div className="complaintsubmit-button col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6">
            <Button id="complaint-submitted-continue" primary={true} label="CONTINUE" fullWidth={true} onClick={this.continueComplaintSubmit} />
          </div>
        </Screen>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "complaint";
  return {
    form: state.form[formKey],
  };
};

export default connect(mapStateToProps, null)(ComplaintDetails);

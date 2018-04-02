import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button } from "components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Screen from "modules/common/Screen";
import Label from "utils/translationNode";
import { setRoute } from "redux/app/actions";
import { resetForm } from "redux/form/actions";
import "./index.css";

class ComplaintSubmitted extends Component {
  continueComplaintSubmit = () => {
    const { formKey } = this.props;
    this.props.setRoute("/citizen");
    this.props.resetForm(formKey);
  };

  // the retrival logic to be changed!
  getComplaintNumber = () => {
    const { search } = this.props.location;
    return (search && search.length && search.split("=").length && search.split("=")[1]) || null;
  };

  render() {
    const complaintnumber = this.getComplaintNumber();
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
    formKey,
    form: state.form[formKey],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: (route) => dispatch(setRoute(route)),
    resetForm: (form) => dispatch(resetForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintSubmitted);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button } from "components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Screen from "modules/common/Screen";
import Label from "utils/translationNode";
import { setRoute } from "redux/app/actions";
import SuccessMessage from "modules/common/SuccessMessage/components/successmessage";
import "./index.css";

class FeedbackAcknowledge extends Component {
  continueComplaintSubmit = () => {
    this.props.setRoute("/citizen");
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
        <div className="feedback-main-screen">
          <SuccessMessage successmessage={"Thank you for you feedback"} />
        </div>
        <div className="feedback-popup-button-cont ">
          <Button id="feedback-acknowledgement" primary={true} label="CONTINUE" fullWidth={true} />
        </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackAcknowledge);

import React, { Component } from "react";
import { connect } from "react-redux";
import RatingsComponent from "./components/Ratings";
import TextAreaComponent from "./components/TextArea";
import "./index.css";
import CheckBoxGroup from "./components/CheckBoxGroup";
import { Button, Icon } from "../../../components";
import Label from "utils/translationNode";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Screen from "../../common/Screen";
import { withRouter } from "react-router-dom";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/feedback").default;
  }
  state = {
    value: [],
    ratingValue: 0,

    submitted: false,
  };

  componentDidMount = () => {
    console.log(this.formConfig);
    this.props.initForm(this.formConfig);
  };

  navigateToLogin = () => {
    this.props.history.push("/citizen/complaint-details?status=resolved");
  };

  onCheck = (value) => {
    var valueArray = this.state.value.slice(0);
    if (valueArray.indexOf(value) > -1) {
      valueArray.splice(valueArray.indexOf(value), 1);
    } else {
      valueArray.push(value);
    }
    this.setState({ value: valueArray });
    this.props.handleFieldChange(this.props.formKey, "selectedSevice", valueArray);
  };

  onClick = (value) => {
    this.props.handleFieldChange(this.props.formKey, "rating", value);
    //
  };

  handleChange = (e) => {
    this.props.handleFieldChange(this.props.formKey, "comments", e.target.value);
  };

  onSubmit = (history) => {
    if (this.props.formKey === "feedback") {
      this.props.form.fields.selectedSevice.value = this.props.form.fields.selectedSevice.value.toString();
    }
    if (this.state.submitted === false) {
      this.setState({ submitted: true });
      this.props.submitForm(this.props.formKey);
    } else {
      history.push("/citizen/complaint-details?status=resolved");
    }
  };

  render() {
    let { history } = this.props;
    let { value, submitted } = this.state;
    const { formConfig, navigateToLogin } = this;
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = formConfig;

    return (
      <Screen className="feedback-main-screen">
        {!submitted ? (
          <div className="feedback-main-container">
            <div className="feedback-form">
              <RatingsComponent onChange={this.onClick} />
              <CheckBoxGroup selected={value} onCheck={this.onCheck} />
              <TextAreaComponent onChange={this.handleChange} />
            </div>
          </div>
        ) : (
          // <div className="feedback-submitted-main-cont">
          //   <div className="feedback-submitted-icon-cont">
          //     <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor={"#22b25f"}>
          //       <Icon action="navigation" name="check" />
          //     </FloatingActionButton>
          //   </div>
          //   <Label
          //     id="feedback-success-message"
          //     label="CS_FEEDBACK_SUCCESS"
          //     className="feedback-thankyou-text"
          //     dark={true}
          //     bold={true}
          //     fontSize={"16px"}
          //   />
          // </div>
          <SuccessMessage successmessage={"Thank you for you feedback"} />
        )}
        <div className="feedback-popup-button-cont">
          <Button
            id={submitted ? "feedback-continue" : "feedback-submit"}
            label={submitted ? "CONTINUE" : "SUBMIT"}
            primary={true}
            fullWidth={true}
            onClick={(e) => {
              this.onSubmit(history);
            }}
          />
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "feedback";
  const form = state.form[formKey] || {};
  return { form, formKey };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

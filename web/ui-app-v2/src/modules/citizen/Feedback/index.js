import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "components";
import RatingsComponent from "./components/Ratings";
import TextAreaComponent from "./components/TextArea";
import CheckBoxGroup from "./components/CheckBoxGroup";
import Label from "utils/translationNode";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Screen from "modules/common/Screen";
import { withRouter } from "react-router-dom";
import SuccessMessage from "modules/common/SuccessMessage/components/successmessage";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { setRoute } from "redux/app/actions";
import "./index.css";

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
    this.props.initForm(this.formConfig);
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
  };

  handleChange = (e) => {
    this.props.handleFieldChange(this.props.formKey, "comments", e.target.value);
  };

  onSubmit = () => {
    if (this.props.formKey === "feedback") {
      this.props.form.fields.selectedSevice.value = this.props.form.fields.selectedSevice.value.toString();
    }
    this.props.submitForm(this.props.formKey);
    setRoute("/citizen/feedback-acknowledgement");
    // if (this.state.submitted === false) {
    //   this.setState({ submitted: true });
    // this.props.submitForm(this.props.formKey);
    //} else {
    //setRoute("/citizen/complaint-details?status=resolved");
  };

  render() {
    let { value, submitted } = this.state;
    const { formConfig } = this;
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = formConfig;

    return (
      <Screen className="feedback-main-screen">
        {
          <div className="feedback-main-container">
            <div className="feedback-form">
              <RatingsComponent onChange={this.onClick} />
              <CheckBoxGroup selected={value} onCheck={this.onCheck} />
              <TextAreaComponent onChange={this.handleChange} />
            </div>
          </div>
        }
        <div className="feedback-popup-button-cont">
          <Button
            id={submitted ? "feedback-continue" : "feedback-submit"}
            label={submitted ? "CONTINUE" : "SUBMIT"}
            primary={true}
            fullWidth={true}
            onClick={this.onSubmit}
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
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

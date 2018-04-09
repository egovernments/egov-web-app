import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import RatingsComponent from "./components/Ratings";
import TextAreaComponent from "./components/TextArea";
import CheckBoxGroup from "./components/CheckBoxGroup";
import Screen from "modules/common/Screen";
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
    this.props.handleFieldChange(this.props.formKey, "selectedSevice", valueArray.toString());
  };

  onClick = (value) => {
    this.props.handleFieldChange(this.props.formKey, "rating", value);
  };

  handleChange = (e) => {
    this.props.handleFieldChange(this.props.formKey, "comments", e.target.value);
  };

  onSubmit = () => {
    this.props.submitForm(this.props.formKey);
  };

  render() {
    let { value } = this.state;
    const { form } = this.props;
    const { fields, submit } = form;
    let textArea;
    if (fields) {
      textArea = fields.textarea;
    }

    return (
      <Screen className="feedback-main-screen">
        {
          <div className="feedback-main-container">
            <div className="feedback-form">
              <RatingsComponent onChange={this.onClick} />
              <CheckBoxGroup selected={value} onCheck={this.onCheck} />
              <TextAreaComponent onChange={this.handleChange} {...textArea} />
            </div>
          </div>
        }
        <div className="feedback-popup-button-cont">
          <Button {...submit} primary={true} fullWidth={true} onClick={this.onSubmit} />
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

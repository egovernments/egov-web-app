import React, { Component } from "react";
import { connect } from "react-redux";
import formHoc from "hocs/form";
import Screen from "modules/common/common/Screen";
import { fetchComplaints } from "redux/complaints/actions";
import FeedbackForm from "./components/FeedbackForm";
import "./index.css";

const FeedbackFormHOC = formHoc(FeedbackForm, "feedback");

class Feedback extends Component {
  state = {
    value: [],
    ratingValue: 0,
    submitted: false,
  };

  componentDidMount = () => {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  };

  onCheck = (value) => {
    var valueArray = this.state.value.slice(0);
    if (valueArray.indexOf(value) > -1) {
      valueArray.splice(valueArray.indexOf(value), 1);
    } else {
      valueArray.push(value);
    }
    this.setState({ value: valueArray });
    // this.props.handleFieldChange(this.props.formKey, "selectedSevice", valueArray.toString());
  };

  // onClick = (value) => {
  //   this.props.handleFieldChange(this.props.formKey, "rating", value);
  // };

  // handleChange = (e, value) => {
  //   this.props.handleFieldChange(this.props.formKey, "comments", value);
  // };

  render() {
    let { value } = this.state;
    return (
      <Screen className="feedback-main-screen">
        <FeedbackFormHOC onCheck={this.onCheck} value={value} />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(null, mapDispatchToProps)(Feedback);

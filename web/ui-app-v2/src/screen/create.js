import React, { Component } from "react";
import { connect } from "react-redux";
import { submitFormData } from "../actions/framework";
import renderGroups from "./render-groups";

class Create extends Component {
  submitFormData = () => {
    const { submitFormData } = this.props;
    submitFormData();
  };

  render() {
    const { groups, actionName } = this.props;
    const { submitFormData } = this;
    return (
      <div className="row">
        {renderGroups(groups)}
        {actionName !== "view" ? (
          <button onClick={submitFormData}>Save</button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitFormData: () => dispatch(submitFormData())
});

export default connect(null, mapDispatchToProps)(Create);

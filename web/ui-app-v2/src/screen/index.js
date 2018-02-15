import React, { Component } from "react";
import { connect } from "react-redux";
import {
  submitFormData,
  resetFormData,
  search,
  addRequiredFields
} from "../actions/framework";
import { prepareSearchUrl } from "../utils/commons";
import { withRouter } from "react-router";
import CreateHoC from "../hocs/create";
import Create from "./create";
import Search from "./search";

class Screen extends Component {
  componentWillReceiveProps(nextProps) {
    const { specs } = nextProps;

    if (Object.keys(specs).length && !Object.keys(this.props.specs).length) {
      const requiredFields = [];
      const groups = specs.hasOwnProperty("groups") ? specs.groups : [];

      groups.forEach(group => {
        group.fields.forEach(field => {
          if (field.isRequired) {
            requiredFields.push(field.target);
          }
        });
      });
      this.props.addRequiredFields(requiredFields);
    }
  }

  renderScreen = () => {
    const {
      specs,
      moduleAction,
      resetFormData,
      submitFormData,
      search,
      isFormValid
    } = this.props;

    const groups = specs.hasOwnProperty("groups") ? specs.groups : [];

    switch (moduleAction) {
      case "create":
        return (
          <Create
            isFormValid={isFormValid}
            submitFormData={submitFormData}
            resetFormData={resetFormData}
            moduleAction={moduleAction}
            groups={groups}
          />
        );
      case "update":
      case "view":
        const { id } = this.props.match.params;
        const searchUrl = prepareSearchUrl(specs.search, id);
        const CreateWrapper = CreateHoC(Create, search, searchUrl);
        return (
          <CreateWrapper
            isFormValid={isFormValid}
            submitFormData={submitFormData}
            moduleAction={moduleAction}
            groups={groups}
          />
        );
      case "search":
        return <Search groups={groups} />;
      default:
        break;
    }
  };

  render() {
    return <div>{this.renderScreen()}</div>;
  }
}

const mapStateToProps = state => ({
  specs: state.framework.specs,
  isFormValid: state.framework.isFormValid
});

const mapDispatchToProps = dispatch => ({
  addRequiredFields: requiredFields =>
    dispatch(addRequiredFields(requiredFields)),
  resetFormData: () => dispatch(resetFormData()),
  submitFormData: () => dispatch(submitFormData()),
  search: url => dispatch(search(url))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Screen));

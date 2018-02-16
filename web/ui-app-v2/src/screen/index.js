import React, { Component } from "react";
import { connect } from "react-redux";
import { submitFormData, resetFormData, search } from "../actions/framework";
import { prepareSearchUrl } from "../utils/commons";
import { withRouter } from "react-router";
import Create from "./create";
import Update from "./update";
import View from "./view";
import Search from "./search";

class Screen extends Component {
  searchUrl = (moduleAction, specs) => {
    const { id } = this.props.match.params;
    return moduleAction === "create"
      ? null
      : prepareSearchUrl(specs.search, id);
  };

  renderScreen = () => {
    const {
      resetFormData,
      submitFormData,
      search,
      specs,
      isFormValid
    } = this.props;
    const { actionName: moduleAction } = this.props.match.params;
    const groups = specs.hasOwnProperty("groups") ? specs.groups : [];
    const searchUrl = this.searchUrl(moduleAction, specs);

    switch (moduleAction) {
      case "create":
        return (
          <Create
            isFormValid={isFormValid}
            submitFormData={submitFormData}
            resetFormData={resetFormData}
            groups={groups}
          />
        );
      case "update":
        return (
          <Update
            searchUrl={searchUrl}
            search={search}
            isFormValid={isFormValid}
            submitFormData={submitFormData}
            groups={groups}
          />
        );
      case "view":
        return <View search={search} searchUrl={searchUrl} groups={groups} />;
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
  isFormValid: state.framework.isFormValid
});

const mapDispatchToProps = dispatch => ({
  resetFormData: () => dispatch(resetFormData()),
  submitFormData: () => dispatch(submitFormData()),
  search: url => dispatch(search(url))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Screen));

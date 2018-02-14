import React from "react";
import { connect } from "react-redux";
import {
  submitFormData,
  resetFormData,
  searchEntity
} from "../actions/framework";
import CreateHoC from "../hocs/create";
import Create from "./create";
import Search from "./search";

const Screen = ({
  specs,
  moduleAction,
  resetFormData,
  submitFormData,
  searchEntity,
  isFormValid
}) => {
  const renderScreen = () => {
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
        const CreateWrapper = CreateHoC(Create, searchEntity);
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

  return <div>{renderScreen()}</div>;
};

const mapStateToProps = state => ({
  isFormValid: state.framework.isFormValid
});

const mapDispatchToProps = dispatch => ({
  resetFormData: () => dispatch(resetFormData()),
  submitFormData: () => dispatch(submitFormData()),
  searchEntity: () => dispatch(searchEntity())
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

import React from "react";
import { connect } from "react-redux";
import TaskStatusContainer from "../TaskStatusContainer";
import { Footer, ActionDialog } from "../../ui-molecules-local";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import { httpRequest } from "ui-utils/api";
import get from "lodash/get";

class WorkFlowContainer extends React.Component {
  state = {
    open: false,
    action: ""
  };

  onForwardClick = label => {
    this.setState({
      open: true,
      action: label
    });
  };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  getActionsFromWorkFlow = actions => {
    const workFLowActions =
      actions &&
      actions.reduce((result, item) => {
        result.push(item.action);
        return result;
      }, []);
    return workFLowActions;
  };

  getEmployeeRoles = actions => {
    const roles =
      actions &&
      actions.reduce((result, item) => {
        result.push(item.roles.join(","));
        return result;
      }, []);
    return roles.join(",");
  };

  createWorkFLow = async () => {
    const { WorkFlowObject } = this.props;
    const { action } = this.state;
    const approveComment = get(WorkFlowObject, "TradeLicense.approve.comment");
    const document = get(WorkFlowObject, "TradeLicense.approve.document");
    const workFlowRequest = {
      processInstances: {
        tenantId: "pb",
        businessService: "NewTL",
        businessId: "PB-TL-2018-12-04-001196",
        action: action,
        comment: approveComment,
        moduleName: "TL",
        documents: document
      }
    };
    try {
      await httpRequest(
        "post",
        "egov-workflow-v2/egov-wf/process/_transition",
        "_create",
        [],
        workFlowRequest
      );
      this.setState({
        open: false
      });
    } catch (e) {
      toggleSnackbarAndSetText(true, e.message, "warning");
    }
  };

  render() {
    const { open, action } = this.state;
    const {
      onForwardClick,
      onClose,
      getActionsFromWorkFlow,
      getEmployeeRoles,
      createWorkFLow
    } = this;
    const { ProcessInstances, prepareFinalObject } = this.props;
    const currentStatus = ProcessInstances && ProcessInstances[0];
    const actions = getActionsFromWorkFlow(get(currentStatus, "state.actions"));
    return (
      <div>
        <TaskStatusContainer />
        <Footer
          // activeStep={activeStep}
          // disabled={activeStep === 0}
          //onPreviousClick={handleBack}
          //onNextClick={handleNext}
          onClick={onForwardClick}
          variant={"contained"}
          color={"primary"}
          buttons={actions}
        />
        <ActionDialog
          open={open}
          action={action}
          getEmployeeRoles={getEmployeeRoles}
          onClose={onClose}
          handleFieldChange={prepareFinalObject}
          onButtonClick={createWorkFLow}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { workflow, screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { WorkFlowObject } = preparedFinalObject;
  //const { TradeLicense } = WorkFlow;
  const { ProcessInstances } = workflow;

  return { ProcessInstances, WorkFlowObject };
};

const mapDispacthToProps = dispatch => {
  return {
    prepareFinalObject: (path, value) => {
      dispatch(prepareFinalObject(path, value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(WorkFlowContainer);

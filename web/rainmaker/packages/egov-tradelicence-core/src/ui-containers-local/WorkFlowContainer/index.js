import React from "react";
import { connect } from "react-redux";
import TaskStatusContainer from "../TaskStatusContainer";
import { Footer, ActionDialog } from "../../ui-molecules-local";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import { httpRequest } from "ui-utils/api";
import { get, set, orderBy } from "lodash";
import { ifUserRoleExists } from "../../ui-config/screens/specs/utils";

let workflowContract = [
  {
    buttonLabel: "PAY",
    isLast: true,
    buttonUrl: "some pay url",
    dialogHeader: "Payment",
    showEmployeeList: false
  },
  {
    buttonLabel: "MARK",
    isLast: false,
    dialogHeader: "Mark it",
    showEmployeeList: false
  },
  {
    buttonLabel: "FORWARD",
    isLast: false,
    dialogHeader: "Forward it",
    showEmployeeList: true
  }
];

class WorkFlowContainer extends React.Component {
  state = {
    open: false,
    action: ""
  };

  onForwardClick = label => {
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const tenant = getQueryArg(window.location.href, "tenantId");
    switch (label) {
      case "PAY":
        window.location.href = `/mihy-ui-framework/tradelicence/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`;
        break;
      default:
        this.setState({
          open: true,
          action: label
        });
    }
  };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  userRolesMatch = userRolesArray => {
    return userRolesArray.find(element => {
      return ifUserRoleExists(element) || element === "*";
    });
  };

  getActionsFromWorkFlow = actions => {
    //modify according to the roles
    const workFLowActions =
      actions &&
      actions.reduce((result, item) => {
        if (this.userRolesMatch(item.roles)) {
          result.push(item.action);
        }
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
    const { WorkFlowObject, Licenses } = this.props;
    const { action } = this.state;
    const approveComment = get(WorkFlowObject, "TradeLicense.approve.comment");
    const document = get(WorkFlowObject, "TradeLicense.approve.document");
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    set(Licenses[0], "action", action);
    try {
      await httpRequest("post", "/tl-services/v1/_update", "", [], {
        Licenses: Licenses
      });
      this.setState({
        open: false
      });
    } catch (e) {
      toggleSnackbarAndSetText(true, e.message, "warning");
    }
  };

  prepareWorkflowContract = data => {
    let sortedData = orderBy(data, "auditDetails.lastModifiedTime", "desc");
    let actions = get(sortedData[0], "nextActions", []);
    return actions.map(item => {
      item.action;
      return {
        buttonLabel: item.action,
        isLast: item.action === "PAY" ? true : false,
        buttonUrl: "some pay url",
        dialogHeader: "Payment",
        showEmployeeList: item.action === "FORWARD" ? true : false
      };
    });
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
    const workflowContract = this.prepareWorkflowContract(ProcessInstances);
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
          contractData={workflowContract}
        />
        {/* <ActionDialog
          open={open}
          action={action}
          getEmployeeRoles={getEmployeeRoles}
          onClose={onClose}
          handleFieldChange={prepareFinalObject}
          onButtonClick={createWorkFLow}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { workflow, screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { WorkFlowObject, Licenses } = preparedFinalObject;
  //const { TradeLicense } = WorkFlow;
  const { ProcessInstances } = workflow;

  return { ProcessInstances, WorkFlowObject, Licenses };
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

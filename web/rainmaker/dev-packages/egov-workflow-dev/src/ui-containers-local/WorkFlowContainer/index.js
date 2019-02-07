import React from "react";
import { connect } from "react-redux";
import TaskStatusContainer from "../TaskStatusContainer";
import { Footer } from "../../ui-molecules-local";
import {
  getQueryArg,
  addWflowFileUrl
} from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";
import find from "lodash/find";
import orderBy from "lodash/orderBy";

const tenant = getQueryArg(window.location.href, "tenantId");

class WorkFlowContainer extends React.Component {
  state = {
    open: false,
    action: ""
  };

  componentDidMount = async () => {
    const { prepareFinalObject, toggleSnackbar } = this.props;
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const queryObject = [
      { key: "businessIds", value: applicationNumber },
      { key: "history", value: true },
      { key: "tenantId", value: tenantId }
    ];
    try {
      const payload = await httpRequest(
        "post",
        "egov-workflow-v2/egov-wf/process/_search",
        "",
        queryObject
      );
      if (payload && payload.ProcessInstances.length > 0) {
        const processInstances = orderBy(
          payload.ProcessInstances,
          "auditDetails.lastModifiedTime",
          "asc"
        );
        addWflowFileUrl(processInstances, prepareFinalObject);
      } else {
        toggleSnackbar(true, "Workflow returned empty object !", "error");
      }
    } catch (e) {
      toggleSnackbar(true, "Workflow returned empty object !", "error");
    }
  };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  getPurposeString = action => {
    switch (action) {
      case "FORWARD":
        return "purpose=forward&status=success";
      case "MARK":
        return "purpose=mark&status=success";
      case "REJECT":
        return "purpose=application&status=rejected";
      case "CANCEL":
        return "purpose=application&status=cancelled";
      case "APPROVE":
        return "purpose=approve&status=success";
    }
  };

  createWorkFLow = async label => {
    const { Licenses, toggleSnackbar } = this.props;
    set(Licenses[0], "action", label);
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    try {
      const payload = await httpRequest(
        "post",
        "/tl-services/v1/_update",
        "",
        [],
        {
          Licenses: Licenses
        }
      );
      this.setState({
        open: false
      });
      if (payload) {
        const licenseNumber = get(payload, "Licenses[0].licenseNumber");
        window.location.href = `acknowledgement?${this.getPurposeString(
          label
        )}&applicationNumber=${applicationNumber}&tenantId=${tenant}&secondNumber=${licenseNumber}`;
      }
    } catch (e) {
      toggleSnackbar(true, "TL update error!", "error");
    }
  };

  getRedirectUrl = (action, businessId) => {
    switch (action) {
      case "PAY":
        return `/tradelicence/pay?applicationNumber=${businessId}&tenantId=${tenant}&businessService=TL`;
    }
  };

  getHeaderName = action => {
    switch (action) {
      case "FORWARD":
        return {
          labelName: "Forward Application",
          labelKey: "TL_FORWARD_APPLICATION"
        };
      case "MARK":
        return {
          labelName: "Mark Application",
          labelKey: "TL_MARK_APPLICATION"
        };
      case "APPROVE":
        return {
          labelName: "Approve Application",
          labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_APPL"
        };
      case "CANCEL":
        return {
          labelName: "Cancel Workflow",
          labelKey: "TL_WORKFLOW_CANCEL"
        };
      default:
        return {
          labelName: "Reject Application",
          labelKey: "TL_REJECTION_CHECKLIST_BUTTON_REJ_APPL"
        };
    }
  };

  getEmployeeRoles = (nextAction, currentAction) => {
    const businessServiceData = JSON.parse(
      localStorage.getItem("businessServiceData")
    );
    const data = find(businessServiceData, { businessService: "NewTL" });
    let roles = [];
    if (nextAction === currentAction) {
      data.states &&
        data.states.forEach(state => {
          state.actions &&
            state.actions.forEach(action => {
              roles = [...roles, ...action.roles];
            });
        });
    } else {
      const states = find(data.states, { uuid: nextAction });
      states &&
        states.actions &&
        states.actions.forEach(action => {
          roles = [...roles, ...action.roles];
        });
    }
    roles = [...new Set(roles)];
    roles.indexOf("*") > -1 && roles.splice(roles.indexOf("*"), 1);
    //return [...new Set(roles)];
    return roles.toString();
  };

  checkIfTerminatedState = nextStateUUID => {
    const businessServiceData = JSON.parse(
      localStorage.getItem("businessServiceData")
    );
    const data = find(businessServiceData, { businessService: "NewTL" });
    const nextState = find(data.states, { uuid: nextStateUUID });
    return nextState.isTerminateState;
  };

  prepareWorkflowContract = data => {
    const {
      getRedirectUrl,
      getHeaderName,
      checkIfTerminatedState,
      getEmployeeRoles
    } = this;
    let businessId = get(data[data.length - 1], "businessId");
    let actions = get(data[data.length - 1], "nextActions", []);
    return actions.map(item => {
      return {
        buttonLabel: item.action,
        moduleName: data[data.length - 1].businessService,
        isLast: item.action === "PAY" ? true : false,
        buttonUrl: getRedirectUrl(item.action, businessId),
        dialogHeader: getHeaderName(item.action),
        showEmployeeList: !checkIfTerminatedState(item.nextState),
        roles: getEmployeeRoles(item.nextState, item.currentState)
      };
    });
  };

  render() {
    const { createWorkFLow } = this;
    const { ProcessInstances, prepareFinalObject } = this.props;
    const workflowContract =
      ProcessInstances &&
      ProcessInstances.length > 0 &&
      this.prepareWorkflowContract(ProcessInstances);
    return (
      <div>
        {ProcessInstances && ProcessInstances.length > 0 && (
          <TaskStatusContainer ProcessInstances={ProcessInstances} />
        )}
        <Footer
          handleFieldChange={prepareFinalObject}
          variant={"contained"}
          color={"primary"}
          onDialogButtonClick={createWorkFLow}
          contractData={workflowContract}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { Licenses, workflow } = preparedFinalObject;
  const { ProcessInstances } = workflow || [];
  return { ProcessInstances, Licenses };
};

const mapDispacthToProps = dispatch => {
  return {
    prepareFinalObject: (path, value) =>
      dispatch(prepareFinalObject(path, value)),
    toggleSnackbar: (open, message, variant) =>
      dispatch(toggleSnackbar(open, message, variant))
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(WorkFlowContainer);

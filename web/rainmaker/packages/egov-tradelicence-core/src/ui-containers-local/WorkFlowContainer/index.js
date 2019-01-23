import React from "react";
import { connect } from "react-redux";
import TaskStatusContainer from "../TaskStatusContainer";
import { Footer, ActionDialog } from "../../ui-molecules-local";
import {
  getQueryArg,
  addWflowFileUrl
} from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbarAndSetText } from "egov-ui-framework/ui-redux/app/actions";
import { httpRequest } from "ui-utils/api";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import set from "lodash/set";
import orderBy from "lodash/orderBy";
import find from "lodash/find";
// import { getFileUrlFromAPI } from "ui-utils/commons";
// import { setProcessInstances } from "ui-redux/workflow/actions";

const tenant = getQueryArg(window.location.href, "tenantId");

class WorkFlowContainer extends React.Component {
  state = {
    open: false,
    action: ""
  };

  // getAllFileStoreIds = async ProcessInstances => {
  //   return (
  //     ProcessInstances &&
  //     ProcessInstances.reduce((result, eachInstance) => {
  //       if (eachInstance.documents) {
  //         let fileStoreIdArr = eachInstance.documents.map(item => {
  //           return item.fileStoreId;
  //         });
  //         result[eachInstance.id] = fileStoreIdArr.join(",");
  //       }
  //       return result;
  //     }, {})
  //   );
  // };

  // addWflowFileUrl = async ProcessInstances => {
  //   const { setProcessInstances } = this.props;
  //   const fileStoreIdByAction = await this.getAllFileStoreIds(ProcessInstances);
  //   const fileUrlPayload = await getFileUrlFromAPI(
  //     Object.values(fileStoreIdByAction).join(",")
  //   );
  //   const processInstances = cloneDeep(ProcessInstances);
  //   processInstances.map(item => {
  //     if (item.documents && item.documents.length > 0) {
  //       item.documents.forEach(i => {
  //         i.link = fileUrlPayload[i.fileStoreId];
  //         i.title = i.documentType;
  //         i.name = decodeURIComponent(
  //           fileUrlPayload[i.fileStoreId]
  //             .split(",")[0]
  //             .split("?")[0]
  //             .split("/")
  //             .pop()
  //             .slice(13)
  //         );
  //         i.linkText = "View";
  //       });
  //     }
  //   });
  //   setProcessInstances(processInstances);
  // };

  componentDidMount = () => {
    //const { ProcessInstances } = this.props;
    //addWflowFileUrl(ProcessInstances);
  };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  // userRolesMatch = userRolesArray => {
  //   return userRolesArray.find(element => {
  //     return ifUserRoleExists(element) || element === "*";
  //   });
  // };

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
    const { Licenses } = this.props;
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
        window.location.href = `acknowledgement?${this.getPurposeString(
          label
        )}&applicationNumber=${applicationNumber}&tenantId=${tenant}&secondNumber=${
          Licenses[0].licenseNumber
        }`;
      }
    } catch (e) {
      toggleSnackbarAndSetText(true, "TL update error!", "error");
    }
  };

  getRedirectUrl = (action, businessId) => {
    switch (action) {
      case "PAY":
        return `/employee-tradelicence/egov-ui-framework/tradelicence/pay?applicationNumber=${businessId}&tenantId=${tenant}&businessService=TL`;
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
    //let sortedData = orderBy(data, "auditDetails.lastModifiedTime", "desc");
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
    const { prepareFinalObject } = this.props;
    const ProcessInstances = JSON.parse(
      localStorage.getItem("ProcessInstances")
    );
    const workflowContract = this.prepareWorkflowContract(ProcessInstances);
    return (
      <div>
        <TaskStatusContainer ProcessInstances={ProcessInstances} />
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

const mapStateToProps = (state, ownprops) => {
  const { workflow, screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { Licenses } = preparedFinalObject;
  const { ProcessInstances } = workflow;
  return { ProcessInstances, Licenses };
};

const mapDispacthToProps = dispatch => {
  return {
    prepareFinalObject: (path, value) =>
      dispatch(prepareFinalObject(path, value))
    //setProcessInstances: payload => dispatch(setProcessInstances(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(WorkFlowContainer);

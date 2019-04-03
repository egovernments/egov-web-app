import React from "react";
import { Button } from "@material-ui/core";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { ActionDialog } from "../";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import "./index.css";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";

class Footer extends React.Component {
  state = {
    open: false,
    data: {},
    employeeList: []
  };

  openActionDialog = async item => {
    const { handleFieldChange } = this.props;
    let employeeList = [];
    handleFieldChange("Licenses[0].comment", "");
    handleFieldChange("Licenses[0].assignee", "");
    if (item.isLast) {
      window.location.href = window.origin + item.buttonUrl;
      return;
    }
    if (item.showEmployeeList) {
      const tenantId = getTenantId();
      const queryObj = [
        {
          key: "roles",
          value: item.roles
        },
        {
          key: "tenantId",
          value: tenantId
        }
      ];
      const payload = await httpRequest(
        "post",
        "/egov-hrms/employees/_search",
        "",
        queryObj
      );
      employeeList =
        payload &&
        payload.Employees.map((item, index) => {
          const name = get(item, "user.name");
          return {
            value: item.uuid,
            label: name
          };
        });
    }

    this.setState({ open: true, data: item, employeeList });
  };

  // getButtonLabelName = label => {
  //   switch (label) {
  //     case "FORWARD":
  //       return "Verify and Forward";
  //     case "MARK":
  //       return "Mark";
  //     case "REJECT":
  //       return "Reject";
  //     case "CANCEL":
  //       return "Cancel";
  //     case "APPROVE":
  //       return "APPROVE";
  //     case "PAY":
  //       return "Pay";
  //     case "SENDBACK":
  //       return "Send Back";
  //     default:
  //       return label;
  //   }
  // };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      color,
      variant,
      contractData,
      handleFieldChange,
      onDialogButtonClick
    } = this.props;
    const { open, data, employeeList } = this.state;
    const { getButtonLabelName } = this;
    return (
      <div className="stepper-footer" style={{ textAlign: "right" }}>
        <div
          className="stepper-footer-buttons-container"
          style={{ float: "right", padding: 0, width: "100%" }}
        >
          {contractData &&
            contractData.map(item => {
              const { buttonLabel, moduleName } = item;
              return (
                <Button
                  color={color}
                  variant={variant}
                  onClick={() => this.openActionDialog(item)}
                >
                  <LabelContainer
                    labelName={buttonLabel}
                    labelKey={`WF_${moduleName.toUpperCase()}_${buttonLabel}`}
                  />
                </Button>
              );
            })}
        </div>
        <ActionDialog
          open={open}
          onClose={this.onClose}
          dialogData={data}
          dropDownData={employeeList}
          handleFieldChange={handleFieldChange}
          onButtonClick={onDialogButtonClick}
        />
      </div>
    );
  }
}

export default Footer;

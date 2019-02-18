import React from "react";
import { Button } from "@material-ui/core";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { ActionDialog } from "../";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import "./index.css";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const buttonStyle = {
  minWidth: "200px",
  height: "48px",
  marginRight: "45px"
};

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
          key: "roleCodes",
          value: item.roles
        },
        {
          key: "tenantId",
          value: tenantId
        }
      ];
      const payload = await httpRequest(
        "post",
        "/hr-employee-v2/employees/_search",
        "",
        queryObj
      );
      employeeList =
        payload &&
        payload.Employee.map((item, index) => {
          return {
            value: item.uuid,
            label: item.name
          };
        });
    }

    this.setState({ open: true, data: item, employeeList });
  };

  getButtonLabelName = label => {
    switch (label) {
      case "FORWARD":
        return "Verify and Forward";
      case "MARK":
        return "Mark";
      case "REJECT":
        return "Reject";
      case "CANCEL":
        return "purpose=application&status=cancelled";
      case "APPROVE":
        return "APPROVE";
      case "PAY":
        return "Pay";
    }
  };

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
      <div className="col-xs-12 stepper-footer" style={{ textAlign: "right" }}>
        <div
          className="col-xs-6"
          style={{ float: "right", padding: 0, width: "100%" }}
        >
          {contractData &&
            contractData.map(item => {
              const { buttonLabel, moduleName } = item;
              return (
                <Button
                  color={color}
                  variant={variant}
                  style={buttonStyle}
                  onClick={() => this.openActionDialog(item)}
                >
                  <LabelContainer
                    labelName={getButtonLabelName(buttonLabel)}
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

import React from "react";
import { Button } from "@material-ui/core";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { ActionDialog } from "../";
import { httpRequest } from "ui-utils/api";
import "./index.css";

const buttonStyle = {
  minWidth: "200px",
  height: "48px",
  marginRight: "45px"
};

const getButtonLabelKey = item => {
  switch (item) {
    case "APPROVE":
      return "TL_APPROVER_TRADE_APP_BUTTON_APPROVE";
    case "FORWARD":
      return "TL_FORWARD_BUTTON";
    case "REJECT":
      return "TL_APPROVER_TRADE_APP_BUTTON_REJECT";
    case "CANCEL":
      return "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL";
    case "MARK":
      return "TL_MARK_BUTTON";
  }
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
      const tenantId = localStorage.getItem("tenant-id");
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
    return (
      <div className="col-xs-12 stepper-footer" style={{ textAlign: "right" }}>
        <div className="col-xs-6" style={{ float: "right", padding: 0 }}>
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
